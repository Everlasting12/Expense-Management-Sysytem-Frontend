import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../redux/actions/notificationsAction";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your firstname")
    .min(2)
    .max(50),
  lastName: yup.string().required("Please enter your lastname").min(2).max(50),
  emailid: yup.string().required("Please enter your Email id").email(),
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
  message: yup.string().required("Please enter your message").min(5).max(2000),
});

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleNotification = (data) => {
 
    dispatch(createNotification(data));
    reset();
  };
  return (
    <div className="h-[calc(100vh-72px)] w-full flex flex-col justify-center items-center">
      <div className="w-[80%] sm:w-1/2 md:w-1/2 lg:w-1/3  p-4  shadow-lg rounded-md">
        <form onSubmit={handleSubmit(handleNotification)}>
          <div className="w-full min-h-20 my-1 flex items-start justify-between">
            <label htmlFor="firstname" className="w-[48%] flex flex-col">
              Firstname
              <input
                type="text"
                name="firstname"
                id="firstname"
                {...register("firstName")}
                className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                placeholder="Micheal"
              />
              <p className="text-red-500 text-xs">
                {errors.firstName?.message}
              </p>
            </label>
            <label htmlFor="lastname" className="w-[48%] flex flex-col">
              Lastname
              <input
                type="text"
                name="lastname"
                id="lastname"
                {...register("lastName")}
                className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                placeholder="Jordan"
              />
              <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
            </label>
          </div>
          <div className="w-full h-20 my-1 flex items-start justify-between">
            <label htmlFor="email" className="w-full flex flex-col">
              Email
              <input
                type="text"
                name="email"
                id="email"
                {...register("emailid")}
                className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                placeholder="eg:michealj@abc.com"
              />
              <p className="text-red-500 text-xs">{errors.emailid?.message}</p>
            </label>
          </div>
          <div className="w-full h-20 my-1 flex items-start justify-between">
            <label htmlFor="phone" className="w-full flex flex-col">
              Phone Number
              <input
                type="text"
                name="phone"
                id="phone"
                {...register("phone")}
                className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                placeholder="eg:3456789987"
              />
              <p className="text-red-500 text-xs">{errors.phone?.message}</p>
            </label>
          </div>
          <div className="w-full h-30 my-1 flex items-start justify-between">
            <label htmlFor="message" className="w-full flex flex-col">
              Message
              <textarea
                type="text"
                name="message"
                id="message"
                {...register("message")}
                rows="3"
                className="outline-none w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500"
                placeholder="eg:type your messsage here..."
              ></textarea>
              <p className="text-red-500 text-xs">{errors.message?.message}</p>
            </label>
          </div>
          <div className="w-full mt-2 bg-green-200 my-1 flex items-center justify-between">
            <input
              type="submit"
              value="Contact Us"
              className="bg-sky-400 w-full py-2 px-3 rounded border-2 focus:border-2 focus:border-sky-500 cursor-pointer hover:text-white hover:bg-sky-500 transition duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
