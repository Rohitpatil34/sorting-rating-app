import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { MdErrorOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    if (user.role === "SYSTEM_ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "STORE_OWNER") return <Navigate to="/owner/dashboard" replace />;
    if (user.role === "NORMAL_USER") return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back 
        </h2>

        {isError && (
          <div className="mb-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
            <MdErrorOutline className="text-lg" />
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

        
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

         
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
