import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/api/authApi";
import { useSelector } from "react-redux";

export function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      if (response.success) {
        navigate("/dashboard/home"); // Redirect to dashboard on success
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  useEffect(()=>{
    if (isAuthenticated) {
      navigate("/dashboard/home");
    }
  
  },[isAuthenticated])

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {error && (
            <Typography variant="small" color="red" className="mt-2 text-center">
              {error.data?.message || "Login failed. Please try again."}
            </Typography>
          )}
          <Button type="submit" className="mt-6" fullWidth disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
      <div className="w-2/5 hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;