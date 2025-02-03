"use server"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const secretKey = process.env.SECRET_JWT_TEXT
const key = new TextEncoder().encode(secretKey) // ubah key string menjadi unit8array, untuk memenuhi params sign dari jose dengan uint8array.

export async function encrypt(data:any){
  return await new SignJWT(data)
  .setProtectedHeader({alg: "HS256"})
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(key)
}

export async function decrypt(token:string){
  try {
    const {payload,protectedHeader} = await jwtVerify(token,key,{
      algorithms: ["HS256"]
    })
    
    return {payload,protectedHeader}
  } catch (error) {
    return null
  }
}

export async function createCookies(data:any){
  const token = await encrypt(data);

  (await cookies()).set('token',token,{
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60, //1hr
    path: '/' // cookiesnya tersedia di semua page
  })

  redirect('/dashboard')
}

export async function deleteCookies() {
  (await cookies()).delete('token')
  
  redirect('/login')
}