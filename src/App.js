import React, { Fragment, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadLogin } from "./redux/actions/loginAction";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () =>
{

  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginReducer.token);
  let decode = null
  if (token)
  {
    decode = jwt_decode(token)
  }

  useEffect(() =>
  {
    dispatch(loadLogin())
  }, [])

  return (
    <div>

      {token ? <Outlet />
        : <Fragment>
          <Navbar />
          <Outlet />
        </Fragment>
      }
      <ToastContainer theme="colored" />
    </div>
  );
};

export default App;
