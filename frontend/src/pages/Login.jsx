import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import { Toaster } from "react-hot-toast";

export default function Login() {
  return (
    <>
      <Toaster position="top-right" />

      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}
