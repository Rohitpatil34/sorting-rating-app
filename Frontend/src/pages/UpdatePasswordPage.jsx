import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updatePassword, clearAuthState } from "../features/auth/authSlice.js";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePasswordPage = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(
      updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
    )
      .unwrap()
      .then(() => {
        reset();
      })
      .catch(() => {});
  };

  const isSuccess = !isError && message;
  const getDashboardLink = () => {
    switch (user?.role) {
      case "SYSTEM_ADMIN":
        return "/admin";
      case "STORE_OWNER":
        return "/owner/dashboard";
      case "NORMAL_USER":
        return "/dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Update Password 
        </h2>

        {/* Error */}
        {isError && message && (
          <div className="mb-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
            <MdErrorOutline className="text-lg" />
            {message}
          </div>
        )}

        {/* Success */}
        {isSuccess && (
          <div className="mb-4 p-4 rounded-md bg-green-100 text-green-700 text-sm flex flex-col items-center gap-3 text-center">
            <p className="flex items-center gap-2 font-medium">
              <MdCheckCircleOutline className="text-lg" /> {message}
            </p>
            <Link
              to={getDashboardLink()}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Return to your Dashboard
            </Link>
          </div>
        )}

        {/* Form */}
        {!isSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div className="relative">
              <input
                type={visibility.current ? "text" : "password"}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                placeholder="Current Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("current")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {visibility.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currentPassword.message}
              </p>
            )}

            {/* New Password */}
            <div className="relative">
              <input
                type={visibility.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/,
                    message: "8-16 chars, one uppercase, one special char",
                  },
                })}
                placeholder="New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("new")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {visibility.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}

            {/* Confirm New Password */}
            <div className="relative">
              <input
                type={visibility.confirm ? "text" : "password"}
                {...register("confirmNewPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                placeholder="Confirm New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {visibility.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmNewPassword.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
