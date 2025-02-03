"use client";
import Link from "next/link";
import React, { useActionState } from "react";

type FormTypeProps = {
  type: "login" | "register";
  actionHandler: any;
};

const Form = ({ type = "login", actionHandler }: FormTypeProps) => {
  const [state, action, isPending] = useActionState(actionHandler, null);

  return (
    <form className="space-y-4 md:space-y-6" action={action}>
      {type === "register" && (
        <>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          {state?.errors?.name && <p className="text-red-400 font-medium">{state.errors.name}</p>}
        </>
      )}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      {state?.errors?.email && <p className="text-red-400 font-medium">{state.errors.email}</p>}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {state?.errors?.password && <p className="text-red-400 font-medium">{state.errors.password}</p>}
      {state?.message && <p className="text-red-400 font-medium">{state.message}</p>}
      <div className="py-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full text-white  bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          {isPending ? "Submitting" : type === "register" ? "Sign Up" : "Sign In"}
        </button>
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link href={type === "register" ? "/login" : "/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
          {type === "register" ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </form>
  );
};

export default Form;
