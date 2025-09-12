import { useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatePassword, clearAuthState } from '../features/auth/authSlice.js';
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
    setVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };
  

  useEffect(() => {
    return () => { dispatch(clearAuthState()); };
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(updatePassword({ 
        currentPassword: data.currentPassword, 
        newPassword: data.newPassword 
    })).unwrap()
    .then(() => { reset(); })
    .catch(() => {});
  };

  const isSuccess = !isError && message;
  const getDashboardLink = () => {
    switch (user?.role) {
        case 'SYSTEM_ADMIN': return '/admin';
        case 'STORE_OWNER': return '/owner/dashboard';
        case 'NORMAL_USER': return '/dashboard';
        default: return '/';
    }
  }

  return (
    <div className=" mt-20 container mx-auto max-w-lg mt-10 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Update Password</h2>
      
      {isError && message && (
        <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-sm flex items-center gap-2">
            <MdErrorOutline/> {message}
        </div>
      )}
      {isSuccess && (
        <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 text-sm flex flex-col items-center gap-2">
            <p className="flex items-center gap-2"><MdCheckCircleOutline/> {message}</p>
            <Link to={getDashboardLink()} className="font-bold hover:underline">
                Return to your Dashboard
            </Link>
        </div>
      )}
      
      {!isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="relative">
              <input 
                type={visibility.current ? 'text' : 'password'} 
                {...register('currentPassword', { required: 'Current password is required' })} 
                placeholder="Current Password" 
                className="w-full p-2 border rounded" 
              />
              <button type="button" onClick={() => toggleVisibility('current')} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                {visibility.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
            
            
            <div className="relative">
              <input 
                type={visibility.new ? 'text' : 'password'} 
                {...register('newPassword', { 
                    required: 'New password is required', 
                    pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/, message: '8-16 chars, one uppercase, one special char' }
                })} 
                placeholder="New Password" 
                className="w-full p-2 border rounded" 
              />
              <button type="button" onClick={() => toggleVisibility('new')} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                {visibility.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}

            
            <div className="relative">
              <input 
                type={visibility.confirm ? 'text' : 'password'} 
                {...register('confirmNewPassword', { 
                    required: 'Please confirm your new password',
                    validate: value => value === watch('newPassword') || 'Passwords do not match'
                })} 
                placeholder="Confirm New Password" 
                className="w-full p-2 border rounded" 
              />
              <button type="button" onClick={() => toggleVisibility('confirm')} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                {visibility.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword.message}</p>}
            
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 disabled:bg-indigo-300 transition">
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
        </form>
      )}
    </div>
  );
};

export default UpdatePasswordPage;