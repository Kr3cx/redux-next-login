"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, selectUserStatus } from "@/redux/slices/userSlice";
import Link from "next/link";
import "./register.css";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = useSelector((state: any) => state.user.users);
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name && email && password) {

      dispatch(
        register({
          name,
          email,
          password,
        })
      );

      setName("");
      setEmail("");
      setPassword("");
    }
  };

  console.log(useSelector((state: any) => state.user.users))

  return (
    <div className="login">
      <form className="login_form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="submit_button">
          Register
        </button>
      </form>

      <p>
        Already have an account? <Link style={{ color: 'blue' }} href="/login">Login</Link>
      </p>

      <h2>Registered Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user: any, index: number) => (
            <li key={index}>
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No registered users yet.</p>
      )}
    </div>
  );
};

export default Register;

