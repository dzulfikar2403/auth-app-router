"use server";
import { query } from "../db";
import { loginSchema, registerSchema } from "./definition";
import bcrypt from "bcrypt";
import { createCookies } from "./helper/auth";

export async function handlerRegister(prevState: any, formData: FormData) {
  //  validate form-schema
  const validationForm = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationForm.success) {
    return { errors: validationForm.error.flatten().fieldErrors };
  }

  //  prepare data
  const { name, email, password } = validationForm.data;

  //  check is email already exist ?
  const checkEmailQuery = await query("select email from users where email = $1", [email]);

  if (email === checkEmailQuery.rows[0]?.email) {
    return { message: "email is already exist" };
  }

  //  hash passsword
  const hashPassword = await bcrypt.hash(password, 10);

  //  insert to db
  await query("insert into users(username,email,password) values($1,$2,$3)", [name, email, hashPassword]);
}


export async function handleLogin(prevState: any, formData: FormData) {
  // validation form
  const validationForm = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationForm.success) {
    return { errors: validationForm.error.flatten().fieldErrors };
  }

  // prepare data
  const { email, password } = validationForm.data;

  // check email is already ?
  const user = await query("select * from users where email = $1", [email]);

  if (email !== user.rows[0]?.email) {
    return { message: "Invalid creadentials" };
  }

  // compare password
  const comparePassword = await bcrypt.compare(password, user.rows[0]?.password);

  if (!comparePassword) {
    return { message: "Invalid creadentials" };
  }

  // sign token & create cookies & redirect
  await createCookies({ id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email });
}
