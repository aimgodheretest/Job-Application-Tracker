import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Card from "../ui/Card";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      login(res.data.user, res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <h2 className="text-4xl font-bold">Welcome Back</h2>

      <p className="text-gray-500 mt-3">Sign in to continue.</p>

      <form onSubmit={submitHandler} className="space-y-6 mt-8">
        <Input
          label="Email"
          name="email"
          type="email"
          onChange={changeHandler}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          onChange={changeHandler}
        />

        <Button loading={loading} type="submit">
          Login
        </Button>
      </form>

      <p className="text-center mt-8">
        Don't have an account?
        <Link className="text-blue-600 ml-2" to="/signup">
          Register
        </Link>
      </p>
    </Card>
  );
}
