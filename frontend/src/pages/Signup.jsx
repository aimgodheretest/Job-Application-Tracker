import { Toaster } from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  return (
    <>
      <Toaster position="top-right" />

      <AuthLayout>
        <SignupForm />
      </AuthLayout>
    </>
  );
}
