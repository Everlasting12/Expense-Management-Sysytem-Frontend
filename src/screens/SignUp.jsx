import React from "react";

//svgs
import LoginImage from "../assets/login-image-blue.svg";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from "react-redux";

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required("Please enter your firstname")
      .min(5)
      .max(50),
    lastName: yup
      .string()
      .required("Please enter your lastname")
      .min(2)
      .max(50),
    email: yup.string().required("Please enter your Email id").email(),
    phone: yup
      .string()
      .required("Please enter your Phone Number")
      .min(7)
      .max(10),
    userName: yup
      .string()
      .required("Please enter your Username")
      .min(5)
      .max(100),
    password: yup.string().required("Please enter your Password"),
  })
  .required();

const SignUp = () => {
  // const dispatch = useDispatch();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function submitSignUp(data) {
    console.log("object");
    console.log(data);
  }
  return (
    <div className="h-[calc(100vh-72px)] w-full flex justify-around items-center bg-slate-200">
      <div className="text-center">
        <img src={LoginImage} alt="login_image" width={400} />
        <h4 className="mt-4 text-xl font-semibold">
          Let us help you, <br /> Manage your{" "}
          <span className="font-bold text-sky-600">Expense</span>
        </h4>
      </div>
      <div className="w-1/3 min-h-[544px] h-[544px]  bg-slate-50 rounded-md p-5 shadow-md flex flex-col justify-between">
        <h2 className="text-center font-semibold text-xl">Register</h2>
        <hr className="my-2 border-2 border-sky-500 rounded-md" />
        <form onSubmit={handleSubmit(submitSignUp)}>
          <div className="flex">
            <div className="mr-[2px] h-24">
              <label htmlFor="firstname">
                Firstname
                <input
                  type="text"
                  id="firstname"
                  {...register("firstName")}
                  className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                />
              </label>
              <p className="text-red-400">{errors.firstName?.message}</p>
            </div>
            <div className="ml-[2px] h-24">
              <label htmlFor="lastname">
                Lastname
                <input
                  type="text"
                  id="lastname"
                  {...register("lastName")}
                  className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                />
              </label>
              <p className="text-red-400">{errors.lastName?.message}</p>
            </div>
          </div>
          <div className="h-24">
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                {...register("email")}
                className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
              />
            </label>
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
          <div className="h-24">
            <label htmlFor="phone">
              Phone Number
              <input
                type="text"
                id="phone"
                {...register("phone")}
                className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
              />
            </label>
            <p className="text-red-400">{errors.phone?.message}</p>
          </div>
          <div className="h-24">
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                {...register("password")}
                className="outline-none w-full p-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
              />
            </label>
            <p className="text-red-400">{errors.password?.message}</p>
          </div>

          <div className="flex">
            <button
              type=""
              className=" mr-1 px-4 py-3 flex-1 bg-sky-600 text-white rounded hover:bg-sky-700"
            >
              Create Account
            </button>
            <button
              className=" ml-1 px-4 py-3 flex-1 shadow text-black rounded hover:bg-sky-600 hover:text-white"
              type="reset"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </form>
        <div className="text-end">
          <a
            href="#"
            className="px-2 py-1 text-sky-500 hover:bg-slate-100 rounded"
          >
            forget password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
