import React from "react";

//svgs
import LoginImage from "../assets/login-image-blue.svg";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/loginAction";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { LOGOUT_USER } from "../redux/actions/actionTypes";

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Please enter your Email id").email(),
    password: yup.string().required("Please enter your Password"),
  })
  .required();

const Unauthorized = () =>
  toast.error(
    "You are not Authorized to login. Kindly connect with Administrator"
  );

const LoginSuccess = () => toast.success("Login Successful!");

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.loginReducer.token);

  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token);

      if (!decode.isActive) {
        Unauthorized();
        sessionStorage.setItem("token", "");
        dispatch({ type: LOGOUT_USER });
        // dispatch(logoutUser());
        navigate("/");
        return;
      }
      if (decode.role === "primary user") {
        decode.role = "primaryuser";
      }
      // LoginSuccess();
      navigate(`/${decode.role}`);
    }
  }, [token]);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const loginFormSubmit = (data) => {
    dispatch(loginAction(data));
    navigate();
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full flex justify-around items-center bg-slate-200">
      <div className="text-center hidden lg:block">
        <img
          src={LoginImage}
          alt="login_image"
          width={400}
          className="pop-up"
        />
        <h4 className="mt-4 text-xl font-semibold pop-up">
          Let us help you, <br /> Manage your
          <span className="font-bold text-sky-600"> Expense</span>
        </h4>
      </div>
      <div className="min-h-[410px] h-[410px] pop-up bg-slate-50 rounded-md p-5 shadow-md">
        <form
          onSubmit={handleSubmit(loginFormSubmit)}
          className="w-80 h-[90%] flex flex-col justify-around leading-loose "
        >
          <div className="">
            <h2 className="text-center font-semibold text-xl">Log In</h2>
            <hr className="my-2 border-2 border-sky-500 rounded-md" />
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                {...register("email")}
                className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
              />
              <p className="text-red-400">{errors.email?.message}</p>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                {...register("password")}
                className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
              />
              <p className="text-red-400">{errors.password?.message}</p>
            </div>
          </div>

          <div className="flex">
            <button
              className=" mr-1 px-4 py-2 flex-1 bg-sky-600 text-white rounded hover:bg-sky-700 "
              type="submit"
            >
              Login
            </button>
            <button
              className=" ml-1 px-4 py-2 flex-1 shadow text-black rounded hover:bg-sky-600 hover:text-white"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="text-end">
          <Link
            to="/forgetpassword"
            className="px-2 py-1 text-sky-500 hover:bg-slate-100 rounded"
          >
            forget password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
