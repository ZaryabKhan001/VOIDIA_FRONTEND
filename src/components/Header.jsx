import React from "react";
import { Button } from "./ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { selectUserStatus, logout } from "../features/user/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (!response) {
        console.log("Error in logout");
      }

      dispatch(logout());
      toast("Logout Successfully");
    } catch (error) {
      console.log("Error in logout");
    }
  };

  return (
    <div className="flex justify-between items-center h-[15vh] sm:h-[12vh]">
      <div>
        <Link className="text-3xl font-bold" to={"/"}>
          VOIDIA
        </Link>
      </div>

      {userStatus ? (
        <div className="flex justify-items-end items-center gap-1 sm:gap-4">
          <Link to={"/profile"}>
            <Button
              onClick={() => navigate("/blog/add-new")}
              className={"cursor-pointer"}
            >
              Profile
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row justify-end items-end gap-1 sm:gap-4">
            <Button
              onClick={() => navigate("/blog/add-new")}
              className={"cursor-pointer"}
            >
              Add New
            </Button>
            <Button onClick={handleLogout} className="cursor-pointer">
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-5">
          <Button className="cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
