import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
const ErrorFallbackUI = ({ error }) => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col justify-center items-center gap-5 w-screen h-screen mx-auto">
      <h1 className="text-lg font-bold text-center">
        Whoops, something went wrong.
      </h1>
      <p className="text-center">
        Please either refresh the page or return home to try again.
      </p>
      <p className="text-center">
        If the issue continues, please{" "}
        <a href="#" className="text-red-500">
          get in touch.
        </a>
      </p>
      <Button onClick={() => navigate("/")} className="bg-red-500 text-white">
        Go home
      </Button>
      <p className="text-red">Error: {error}</p>
    </div>
  );
};

export default ErrorFallbackUI;
