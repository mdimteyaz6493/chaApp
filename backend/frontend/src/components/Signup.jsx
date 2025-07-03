import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/signup.css";
import { IoMdChatboxes } from "react-icons/io";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) =>
    value === password || "Passwords do not match";

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h1 className="login-header">
                 <IoMdChatboxes className="login-icon" />
                 Let's Chat
               </h1>
        <h2 className="signup-subheading">
          Create a new <span>Account</span>
        </h2>

        {/* Fullname */}
        <label className="input-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="input-icon"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="input-field"
            placeholder="Fullname"
            {...register("fullname", { required: true })}
            style={{background:"none"}}
          />
        </label>
        {errors.fullname && (
          <span className="error-message">This field is required</span>
        )}

        {/* Email */}
        <label className="input-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="input-icon"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            {...register("email", { required: true })}
            style={{background:"none"}}
          />
        </label>
        {errors.email && (
          <span className="error-message">This field is required</span>
        )}

        {/* Password */}
        <label className="input-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="input-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            {...register("password", { required: true })}
            style={{background:"none"}}
          />
        </label>
        {errors.password && (
          <span className="error-message">This field is required</span>
        )}

        {/* Confirm Password */}
        <label className="input-group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="input-icon"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="input-field"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: validatePasswordMatch,
              
            })}
            style={{background:"none"}}
          />
        </label>
        {errors.confirmPassword && (
          <span className="error-message">
            {errors.confirmPassword.message}
          </span>
        )}

        <div>
          <input type="submit" value="Signup" className="signup-button" />
        </div>
   
        <p className="login-text">
          Have an account?
          <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
