import Form from "@/components/Form";
import { handleLogin } from "@/lib/auth/actionAuth";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
          <Form type="login" actionHandler={handleLogin} />
        </div>
      </div>
    </div>
  );
}
