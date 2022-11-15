import React from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { activateAccount } from "../redux/actions/usersAction";

const AccountActivation = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleAccountActivation = () => {
    let token = "";
    token = searchParams.get("token");
    if (token)
      dispatch(
        activateAccount({
          action: "verifySignupLong",
          value: token,
        })
      );
  };
  return (
    <div className="h-[calc(100vh-72px)] bg-white w-full flex items-center justify-center">
      <button
        className="px-5 py-3 text-xl bg-red-500/90 text-white shadow-lg"
        onClick={handleAccountActivation}
      >
        Activate Your Account ?
      </button>
    </div>
  );
};

export default AccountActivation;
