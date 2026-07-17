import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { signupUser } from "../../services/authService";

export default function SignupForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await signupUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      login(response.user, response.token);

      toast.success("Account created successfully.");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <h2 className="text-4xl font-bold">Create Account</h2>

      <p className="mt-3 text-gray-500">
        Start tracking your applications today.
      </p>

      <form onSubmit={submitHandler} className="space-y-5 mt-8">
        <Input label="Full Name" name="name" onChange={changeHandler} />

        <Input
          label="Email"
          type="email"
          name="email"
          onChange={changeHandler}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          onChange={changeHandler}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={changeHandler}
        />

        <Button loading={loading} type="submit">
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center">
        Already have an account?
        <Link to="/login" className="text-blue-600 ml-2">
          Login
        </Link>
      </p>
    </Card>
  );
}
