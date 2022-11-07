import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  checkHousholdUnique,
  createHouseholdAction,
  getCurrentHouseholdAction,
  updateHouseholdAction,
} from "../redux/actions/householdsAction";

import { states } from "../assets/states";

export function getHouseholdById({ params }) {
  return params.householdId;
}

const schema = yup.object().shape({
  name: yup.string().required("Please enter household name").min(3).max(50),
  addressLine1: yup.string("Please enter address").required().min(5).max(40),
  addressLine2: yup.string("Please enter address").required().min(5).max(40),
  area: yup.string().required("Please enter area name").min(3).max(30),
  city: yup.string().required("Please enter city name").min(3).max(30),
  state: yup.string().required("Please select your state").min(3).max(40),
  zipcode: yup.string().required("Please enter zipcode").min(6).max(6),
});

const HouseholdForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const householdId = useLoaderData();

  const currentHousehold = useSelector(
    (state) => state.householdReducer.currentHousehold
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (householdId) dispatch(getCurrentHouseholdAction(householdId));
  }, []);

  useEffect(() => {
    if (!householdId) return;
    setValue("name", currentHousehold.name);
    setValue("addressLine1", currentHousehold.addressLine1);
    setValue("addressLine2", currentHousehold.addressLine2);
    setValue("area", currentHousehold.area);
    setValue("city", currentHousehold.city);
    setValue("state", currentHousehold.state);
    setValue("zipcode", currentHousehold.zipcode);
    setValue("_id", currentHousehold._id);
  }, [currentHousehold]);

  const handleUserFormSubmit = (data) => {
    if (data._id) {
      dispatch(updateHouseholdAction(data));
    } else {
      dispatch(createHouseholdAction(data));
    }
    navigate("/primaryuser/household");
  };

  return (
    <div className="h-full w-full  flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleUserFormSubmit)}
        className="h-[90%] w-[60%] "
      >
        <span className="text-xl block text-center text-sky-600 font-semibold">
          {householdId ? "Edit Household" : "Add New Household"}
        </span>
        <hr className="mt-2 border-b-2 border-sky-600" />

        <div className="my-2 flex grow items-center">
          <div className="mb-3 w-full">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Household Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Everlasting Bungalow"
            />
            <p className="text-red-400 text-xs pt-1">{errors.name?.message}</p>
          </div>
        </div>
        <div className="my-2 flex justify-between items-center">
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="Address Line 1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Address Line 1
            </label>
            <input
              type="text"
              id="Address Line 1"
              {...register("addressLine1")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="4 Privet Drive"
            />
            <p className="text-red-400 text-xs pt-1">
              {errors.addressLine1?.message}
            </p>
          </div>
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="Address Line 2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Address Line 2
            </label>
            <input
              type="text"
              id="Address Line 2"
              {...register("addressLine2")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Little Whinging"
            />
            <p className="text-red-400 text-xs pt-1">
              {errors.addressLine2?.message}
            </p>
          </div>
        </div>
        <div className="my-2 flex justify-between items-center">
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="area"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Area
            </label>
            <input
              type="text"
              id="area"
              {...register("area")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Pashan"
            />
            <p className="text-red-400 text-xs pt-1">{errors.area?.message}</p>
          </div>
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Mumbai"
            />
            <p className="text-red-400 text-xs pt-1">{errors.city?.message}</p>
          </div>
        </div>
        <div className="my-2 flex justify-between items-center">
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="State"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              State
            </label>

            <select
              name="state"
              id="state"
              {...register("state")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select Your State</option>
              {states.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
            <p className="text-red-400 text-xs pt-1">{errors.state?.message}</p>
          </div>
          <div className="mb-3 w-[48%]">
            <label
              htmlFor="Zipcode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Zipcode
            </label>
            <input
              type="text"
              id="Zipcode"
              {...register("zipcode")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="456789"
              minLength={6}
              maxLength={6}
            />
            <p className="text-red-400 text-xs pt-1">
              {errors.zipcode?.message}
            </p>
          </div>
        </div>

        <div className="flex justify-between-items-center">
          <input
            type="submit"
            value={householdId ? "Update Household Details" : "Add Household"}
            className="bg-sky-500 border border-gray-300 text-white text-md rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default HouseholdForm;
