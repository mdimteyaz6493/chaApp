import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdChatboxes } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../styles/login.css"

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
          localStorage.setItem("ChatApp", JSON.stringify(response.data));
          setAuthUser(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h1 className="login-header">
          <IoMdChatboxes className="login-icon" />
          Let's Chat
        </h1>

        <h2 className="login-subtitle">
          Login to start <span>chatting</span>
        </h2>

        {/* Email Field */}
        <label className="input-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="input-icon"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793l6.674 3.685a.75.75 0 0 0 .652 0L15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            style={{background:"none"}}
          />
        </label>
        {errors.email && <span className="error-text">Email is required</span>}

        {/* Password Field */}
        <label className="input-group password-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="input-icon"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true })}
            style={{background:"none"}}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-icon"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </label>
        {errors.password && (
          <span className="error-text">Password is required</span>
        )}

        {/* Submit */}
        <div className="submit-wrapper">
          <input
            type="submit"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            className={`submit-btn ${loading ? "disabled" : ""}`}
          />
        </div>

        <p className="signup-text">
          Don't have an account?
          <Link to="/signup" className="signup-link">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
