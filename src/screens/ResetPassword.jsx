import React from "react";
import { useSearchParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { resetPasswordUser } from "../redux/actions/usersAction";

const passwordSchema = yup.object().shape({
  password: yup.string().required("Please enter new password").min(5).max(1024),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const dispatch = useDispatch();

  const handleResetPasswordSubmission = (data) => {
    data = {
      action: "resetPwdLong",
      value: {
        token: searchParams.get("token"),
        password: data.password,
      },
      notifierOptions: {},
    };
    dispatch(resetPasswordUser(data));
    reset()
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full flex flex-col justify-center items-center bg-slate-200">
      <div className="h-1/3 w-2/3 md:w-1/3 bg-slate-50 p-5 rounded-md shadow-lg">
        <form
          onSubmit={handleSubmit(handleResetPasswordSubmission)}
          className="h-full flex flex-col justify-around text-sm"
        >
          <h2 className="text-xl text-center"> Reset Password</h2>
          <div className="h-20">
            <label htmlFor="password" className="">
              New Password
              <input
                type="password"
                name="password"
                id="password"
                {...register("password")}
                placeholder="eg@$skjgf&345h"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </label>
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="text-md bg-sky-500 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
