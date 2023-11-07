import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Logout.css";
import { logout, selectUser } from "../slices/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const Logout = (e) => {
    dispatch(logout());
  };


  return (
    <form className="logout">
      <h1>
        See you soon <span className="user__name">{user.name}</span>!
      </h1>
      <button className="logout__button" onClick={(e) => Logout(e)}>
        Log out
      </button>
     
    </form>
  );
};

export default Logout;
