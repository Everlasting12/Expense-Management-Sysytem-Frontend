import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { forgetPasswordUser } from "../redux/actions/usersAction";

const emailSchema = yup.object().shape({
  email: yup.string().required("Please enter your email id").email(),
});
const ForgetPassword = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(emailSchema) });

  const dispatch = useDispatch();

  const handleEmailSubmission = (data) => {
    dispatch(forgetPasswordUser(data));
    reset();
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full flex flex-col justify-center items-center bg-slate-200">
      <div className="h-1/3 w-2/3 md:w-1/3 bg-slate-50 p-5 rounded-md shadow-lg">
        <form
          onSubmit={handleSubmit(handleEmailSubmission)}
          className="h-full flex flex-col justify-around text-sm"
        >
          <h2 className="text-xl text-center"> Reset Password</h2>
          <div className="h-20">
            <label htmlFor="email" className="">
              Email ID
              <input
                type="text"
                name="email"
                id="email"
                {...register("email")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="example@abc.com"
              />
            </label>
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>

          <input
            type="submit"
            value="Send Reset Password Link"
            className="text-md bg-sky-500 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
