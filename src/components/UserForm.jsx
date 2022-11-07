import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  getCurrentUserAction,
  updateUserAction,
} from "../redux/actions/usersAction";

export function getUserById({ params }) {
  return params.userId;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your firstname")
    .min(5)
    .max(50),
  lastName: yup.string().required("Please enter your lastname").min(2).max(50),
  email: yup.string().required("Please enter your Email id"),
  phone: yup.string().required("Please enter your Phone Number").min(7).max(10),
  userName: yup.string().required("Please enter your Username").min(5).max(100),
  isActive: yup.boolean().required(),
});

const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useLoaderData();
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userId) dispatch(getCurrentUserAction(userId));
  }, []);
  useEffect(() => {
    if (!userId) return;
    setValue("firstName", currentUser?.firstName);
    setValue("lastName", currentUser?.lastName);
    setValue("email", currentUser?.email);
    setValue("phone", currentUser?.phone);
    setValue("userName", currentUser?.userName);
    setValue("_id", currentUser?._id);
    setValue("isActive", currentUser?.isActive);
  }, [currentUser]);

  const handleUserFormSubmit = (data) => {
    dispatch(updateUserAction(data));
    navigate("/admin/users");
  };

  return (
    <div className="h-full w-full  flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleUserFormSubmit)}
        className="h-[90%] w-[80%] "
      >
        <span className="text-xl block text-center text-sky-600 font-semibold">
          {userId ? "Edit User Details" : "Add New User"}
        </span>
        <hr className="mt-2 border-b-2 border-sky-600" />

        <div className="my-2 flex justify-between items-center">
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="FirstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Firstname
            </label>
            <input
              type="FirstName"
              id="FirstName"
              {...register("firstName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Micheal"
              required
            />
          </div>
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Lastname
            </label>
            <input
              type="lastName"
              id="lastName"
              {...register("lastName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Jordan"
              required
            />
          </div>
        </div>
        <div className="my-2 flex justify-between items-center">
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@vast.com"
              required
            />
          </div>
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="Phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Phone
            </label>
            <input
              type="Phone"
              id="Phone"
              {...register("phone")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="eg@9856789098"
              required
            />
          </div>
        </div>
        <div className="my-2 flex justify-between items-center">
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="userName"
              id="userName"
              {...register("userName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="eg@name@341"
              required
            />
          </div>
          <div className="mb-3 w-[48%] h-10 flex items-end ">
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="w-5 h-5 cursor-pointer"
            />

            <label
              htmlFor="isActive"
              className="ml-2 w-fit text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Is Active
            </label>
          </div>
        </div>

        <div className="flex justify-between-items-center">
          <input
            type="submit"
            value="Update User"
            className="bg-sky-500 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
