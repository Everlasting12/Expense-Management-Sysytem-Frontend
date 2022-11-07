import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getAllHouseholdForCurrentPrimaryUserAction } from "../redux/actions/householdsAction";
import {
  addMemberAction,
  getCurrentMemberAction,
} from "../redux/actions/membersAction";
import { getAllUsersOfRoleMember } from "../redux/actions/usersAction";

export function getMemberById({ params }) {
  console.log(params.memberId);
  return params.memberId;
}

const schema = yup.object().shape({
  household: yup.string().required("Please select the household"),
  user: yup.string().required("Please select the user"),
});

const MemberForm = () => {
  const dispatch = useDispatch();
  const memberId = useLoaderData();
  const navigate = useNavigate();

  const households = useSelector((state) => state.householdReducer.households);
  const currentMember = useSelector(
    (state) => state.membersReducer.currentMember
  );

  const usersOfRoleMember = useSelector(
    (state) => state.usersReducer.usersOfRoleMember
  );
  const currentUser = useSelector((state) => state.loginReducer.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onMemberFormSubmit = (data) => {
    dispatch(addMemberAction(data));
    navigate("/primaryuser/allmembers");
  };

  useEffect(() => {
    dispatch(getAllHouseholdForCurrentPrimaryUserAction(currentUser._id));
    dispatch(getAllUsersOfRoleMember());
    if (memberId) dispatch(getCurrentMemberAction(memberId));
  }, []);

  useEffect(() => {
    if (!memberId) return;
    if (currentMember !== null) {
      setValue("household", currentMember.household);
      setValue("user", currentMember.user);
      setValue("_id", currentMember._id);
    }
  }, [currentMember]);

  return (
    <div className=" h-full w-full">
      <form
        onSubmit={handleSubmit(onMemberFormSubmit)}
        className="w-3/4 h-fit  mx-auto mt-20 shadow-xl p-3 flex flex-col bg-slate-50"
      >
        <h1 className="text-center text-sky-500 font-bold text-xl">
          {memberId ? "Update Member" : "Add Member"}
        </h1>
        <div className="flex items-center my-8">
          <div className="w-[48%] mr-[2%]">
            <label htmlFor="household" className="block">
              Houshold
            </label>
            <select
              name="household"
              id="household"
              {...register("household")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
            >
              <option value="">Select Houshold</option>
              {households.map((household) => {
                return (
                  <option value={household._id} key={household._id}>
                    {household.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-[48%] ml-[2%]">
            <label htmlFor="household" className="block">
              User
            </label>
            <select
              name="household"
              id="household"
              {...register("user")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
            >
              <option value="">Select User</option>
              {usersOfRoleMember.map((user) => {
                return (
                  <option value={user._id} key={user._id}>
                    {user.firstName + " " + user.lastName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <input
          type="submit"
          value={memberId ? "Update Member" : "Add Member"}
          className="px-3 py-2 bg-sky-500 hover:bg-sky-600 focus:bg-sky- cursor-pointer rounded-md shadow text-white font-bold text-center block self-end	"
        />
      </form>
    </div>
  );
};

export default MemberForm;
