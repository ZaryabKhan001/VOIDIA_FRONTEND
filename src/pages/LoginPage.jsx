import React from "react";
import { signInSchema } from "../schemas/signIn.Schema.js";
import { Input } from "../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../features/auth/authThunks.js";
import { setUser } from "../features/auth/authSlice.js";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(signInSchema), mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = async (data) => {
    try {
      const result = await dispatch(login(data));

      if (login.fulfilled.match(result)) {
        dispatch(setUser(result.payload.data));
        toast("User Login Successfully");
        navigate("/");
      } else {
        console.log("Login failed:", result.payload);
      }
    } catch (error) {
      console.log("Error in Login User", error);
    }
  };

  return (
    <div className="min-w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-5 rounded-md border border-slate-300 w-full sm:w-fit"
      >
        <h1 className="mb-5 text-2xl font-bold">SignIn</h1>
        <div className="w-full sm:w-[22rem] my-5">
          <Input
            placeholder="Enter Email"
            {...register("email")}
            type={"email"}
            className={"rounded-sm h-[2.5rem]"}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors?.email?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[22rem]">
          <Input
            placeholder="Enter Password"
            {...register("password")}
            type={"password"}
            className={"rounded-sm h-[2.5rem]"}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>
        {error && <p className="my-3 text-sm text-red-500">{error}</p>}
        <div className="w-full flex justify-center items-center my-5">
          <Button
            className={"cursor-pointer rounded-sm h-[2.5rem] min-w-full py-5"}
            type="submit"
            disabled={!isValid || loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </div>
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-green-500 underline">
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
