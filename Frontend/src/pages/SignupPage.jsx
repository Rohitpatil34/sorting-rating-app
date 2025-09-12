import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../features/auth/authSlice.js';
import { MdErrorOutline } from 'react-icons/md';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const onSubmit = (data) => {
    dispatch(signup(data));
  };

  return (
    <div className=" mt-20 container mx-auto max-w-md mt-10 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isError && <p className="text-red-500 text-sm flex items-center gap-2"><MdErrorOutline />{message}</p>}
        <div>
          <input {...register('name', { required: 'Name is required', minLength: { value: 20, message: 'Min 20 characters' }, maxLength: { value: 60, message: 'Max 60 characters' } })} placeholder="Full Name" className="w-full p-2 border rounded" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} placeholder="Email" className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('address', { required: 'Address is required', maxLength: { value: 400, message: 'Max 400 characters' } })} placeholder="Address" className="w-full p-2 border rounded" />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>
        {/* --- MODIFICATION START --- */}
        <div className="relative">
          <input 
            type={showPassword ? 'text' : 'password'} 
            {...register('password', { required: 'Password is required', pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/, message: '8-16 chars, one uppercase, one special char' } })} 
            placeholder="Password" 
            className="w-full p-2 border rounded" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {/* --- MODIFICATION END --- */}
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-bluen-500 transition">
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
       <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </div>
  );
};
export default SignupPage;