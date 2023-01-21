// @ts-nocheck
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { gql, useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "../ui/LoadingSpinner";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

const schema = yup
  .object({
    username: yup.string().trim().required("Username is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required("Invalid Submission");

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setError(err.message),
    onCompleted(data) {
      reset();
      login(data.login);
    },
  });

  const onSubmit = (data) => {
    setError("");
    loginUser({
      variables: {
        username: data.username,
        password: data.password,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full rounded-lg bg-white p-6 shadow-2xl md:w-1/2 ${
        error ? "border-red-500" : ""
      }`}
    >
      <h2 className="mb-4 text-center text-lg font-medium">Login</h2>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-2 block font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className={`w-full rounded-lg border border-gray-400 p-2 ${
            errors.username?.message ? "border-red-500" : ""
          }`}
          {...register("username")}
        />
        {errors.username?.message && (
          <p className="text-xs italic text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`w-full rounded-lg border border-gray-400 p-2 ${
            errors.password?.message ? "border-red-500" : ""
          }`}
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-xs italic text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 sm:w-full md:w-1/2"
          >
            Login
          </button>
        </div>
      )}
      {error && (
        <p className="text-center text-xs italic text-red-500">{error}</p>
      )}
      <div className="mb-4 text-center">
        Don't Have an Acount?{"   "}
        <Link to={`/register`} className="text-blue-800">
          Register
        </Link>
      </div>
    </form>
  );
}
