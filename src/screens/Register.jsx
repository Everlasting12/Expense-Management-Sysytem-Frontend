import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { MdClose, MdCloudUpload } from "react-icons/md";
import { registerAction } from "../redux/actions/registerAction";
import { useDispatch } from "react-redux";
import { resendVerifyAccountLink } from "../redux/actions/usersAction";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your firstname")
    .min(2)
    .max(50),
  lastName: yup.string().required("Please enter your lastname").min(2).max(50),
  email: yup.string().required("Please enter your Email id"),
  phone: yup
    .string()
    .required("Please enter your Phone Number")
    .test(
      "isNumber",
      "Phone number should be of number type",
      function (value) {
        return Number(value);
      }
    )
    .min(7)
    .max(10),
  userName: yup.string().required("Please enter your Username").min(5).max(100),
  password: yup
    .string()
    .min(5)
    .max(1024)
    .required("Please enter your Password"),

  role: yup.string().required("Please select the role"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showVerifyMePopup, setShowVerifyMePopup] = useState(false);

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitSignUp = (data) => {
    dispatch(registerAction({ ...data, avatar: data.avatar["0"] }));

    navigate("/login");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const email = document.querySelector("#emailidverify").value;
    dispatch(resendVerifyAccountLink(email));
  };

  return (
    <div className="h-[calc(100vh-72px)] overflow-y-auto scrollbar-hidden w-full flex justify-center p-5 bg-slate-200">
      <div className="bg-white h-fit w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] px-5 py-1 shadow-md rounded-md">
        <form
          onSubmit={handleSubmit(submitSignUp)}
          encType="multipart/form-data"
        >
          <div>
            <h2 className="text-center text-xl mt-2">Register</h2>
            <hr className="my-2 border-2 border-sky-500 rounded-md" />

            <div className="flex">
              <div className="mr-[2px]">
                <label htmlFor="firstname">
                  Firstname<span className="text-red-500 font-bold">*</span>
                  <input
                    type="text"
                    id="firstname"
                    {...register("firstName")}
                    className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                  />
                </label>
                <p className="text-red-400 text-sm">
                  {errors.firstName?.message}
                </p>
              </div>
              <div className="ml-[2px]">
                <label htmlFor="lastName">
                  Lastname<span className="text-red-500 font-bold">*</span>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                  />
                </label>
                <p className="text-red-400 text-sm">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>
            <div className="">
              <label htmlFor="email">
                Email<span className="text-red-500 font-bold">*</span>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                />
              </label>
              <p className="text-red-400 text-sm">{errors.email?.message}</p>
            </div>
            <div className="">
              <label htmlFor="phone">
                Phone Number<span className="text-red-500 font-bold">*</span>
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  maxLength="10"
                  className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                />
              </label>
              <p className="text-red-400 text-sm">{errors.phone?.message}</p>
            </div>
            <div className="">
              <label htmlFor="userName">
                Username<span className="text-red-500 font-bold">*</span>
                <input
                  type="userName"
                  id="userName"
                  {...register("userName")}
                  className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                />
              </label>
              <p className="text-red-400 text-sm">{errors.userName?.message}</p>
            </div>
            <div className="">
              <label htmlFor="password">
                Password<span className="text-red-500 font-bold">*</span>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                />
              </label>
              <p className="text-red-400 text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="role" className="flex flex-col w-[49%]">
                <p>
                  Role<span className="text-red-500 font-bold">*</span>
                </p>
                <select
                  name="role"
                  id="role"
                  {...register("role")}
                  className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                >
                  <option value="">select role</option>

                  {["primary user", "member"].map((role) => {
                    return (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    );
                  })}
                </select>
                <p className="text-red-400 text-sm">{errors.role?.message}</p>
              </label>

              <div className="flex flex-col w-[49%]">
                Profile Picture
                <label
                  htmlFor="avatar"
                  className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                >
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    {...register("avatar")}
                    className="hidden"
                  />
                  <MdCloudUpload
                    size={20}
                    color="rgb(2 ,132, 199)"
                    className="float-right"
                  />
                </label>
                <span className={errors.role ? "h-[20px]" : ""}></span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex">
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
        <div className="flex items-center justify-center">
          <button
            className="px-3 py-1 text-sm bg-slate-100/80 text-sky-500 my-2"
            onClick={() => setShowVerifyMePopup(true)}
          >
            Resend Verification Link ?
          </button>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 ${
          showVerifyMePopup ? "flex items-center justify-center" : "hidden"
        } h-screen w-full bg-slate-700/50`}
      >
        <div className="pop-up w-[50%] h-56 bg-sky-900/40 backdrop-blur-sm flex items-center justify-center relative shadow-2xl border border-slate-50/50">
          <MdClose
            size={30}
            className="text-white cursor-pointer absolute top-0 right-0 hover:p-[2px] hover:bg-slate-800"
            onClick={() => setShowVerifyMePopup(false)}
          />
          <label htmlFor="email" className="flex flex-col w-[70%] text-white">
            Enter your Email id:
            <form onSubmit={handleVerify} className="flex">
              <input
                type="email"
                name="emailid"
                id="emailidverify"
                placeholder="eg: example1.@john.com"
                className="outline-none px-3 py-2 text-black border-2 focus:border-2 focus:border-sky-500 w-[70%]"
                required
              />
              <button
                className="ml-2 px-3 py-2 bg-slate-50 text-sky-600 hover:bg-slate-100 focus:bg-slate-100"
                type="submit"
              >
                Verify Me
              </button>
            </form>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
