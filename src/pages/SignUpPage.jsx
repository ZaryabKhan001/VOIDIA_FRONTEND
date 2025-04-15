import React, { useState } from "react";
import { signUpSchema } from "../schemas/signUp.schema.js";
import { Input } from "../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authThunks.js";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(signUpSchema), mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const handleRegister = async (data) => {
    try {
      const result = await dispatch(signup(data));
      if (!signup.fulfilled.match(result)) {
        console.log("Error in registering user");
        return;
      }
      toast("User Registerd Successfully");
      navigate("/login");
    } catch (error) {
      console.log("Error in registering User", error);
    }
  };

  return (
    <div className="min-w-full min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="p-4 rounded-md border border-slate-200 w-full sm:w-fit"
      >
        <h1 className="my-4 text-xl font-bold">SignUp</h1>
        <div className="w-full sm:w-[25rem]">
          <Input placeholder="Enter Name" {...register("name")} type={"text"} />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors?.name?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[25rem] my-5">
          <Input
            placeholder="Enter Email"
            {...register("email")}
            type={"email"}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors?.email?.message}</p>
          )}
        </div>
        <div className="w-full sm:w-[25rem]">
          <Input
            placeholder="Enter Password"
            {...register("password")}
            type={"password"}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>
        {error && <p className="my-3 text-sm text-red-500">{error}</p>}
        <Button
          className={"cursor-pointer my-5"}
          type="submit"
          disabled={!isValid || loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Register"}
        </Button>
        <p className="tet-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-black underline">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
