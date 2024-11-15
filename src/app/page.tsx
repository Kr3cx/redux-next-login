'use client'

import { useSelector } from "react-redux";
import { selectUserStatus } from "@/redux/slices/userSlice";
import Login from "./login/page";
import Register from "./register/page";
import Logout from "./logout/page";

export default function Home() {
  const status = useSelector(selectUserStatus);

  if (status === 'loggedOut') {
    return <Register />; 
  }

  if (status === 'loggedIn') {
    return <Logout />; 
  }

  return <Login />; 
}
