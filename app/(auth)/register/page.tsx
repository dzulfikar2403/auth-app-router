import Form from '@/components/Form'
import { handlerRegister } from '@/lib/auth/actionAuth'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign up to your account</h1>
          <Form type='register' actionHandler={handlerRegister} />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage