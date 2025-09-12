import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, addNewUser } from '../../features/admin/adminSlice';
import { useForm } from 'react-hook-form';
import { FaPlus, FaStar, FaArrowUp, FaArrowDown, FaSort } from 'react-icons/fa';
import Pagination from './Pagination';
import { ImCancelCircle } from 'react-icons/im';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, pagination, isLoading, isError, message } = useSelector((state) => state.admin);
  
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Re-fetch data when filters, page, or sort order change
  useEffect(() => {
    const debouncedFetch = setTimeout(() => {
      const params = {
        ...filters,
        page: currentPage,
        limit: 10,
        sortBy: sortConfig.key,
        order: sortConfig.direction,
      };
      dispatch(fetchAllUsers(params));
    }, 500);
    return () => clearTimeout(debouncedFetch);
  }, [dispatch, filters, currentPage, sortConfig]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="inline ml-1 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaArrowUp className="inline ml-1 text-blue-500" /> 
      : <FaArrowDown className="inline ml-1 text-blue-500" />;
  };

  const onUserSubmit = (data) => {
    dispatch(addNewUser(data)).unwrap()
      .then(() => {
        reset();
        setShowForm(false);
      })
      .catch(() => {});
  };

  return (
    <div className='pt-20'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors">
          
 {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-down">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">New User Form</h2>
          {isError && <p className="text-red-500 mb-4">{message}</p>}
          <form onSubmit={handleSubmit(onUserSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input {...register('name', { required: 'Name is required' })} placeholder="Full Name" className="w-full p-2 border rounded" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <input {...register('email', { required: 'Email is required' })} placeholder="Email" className="w-full p-2 border rounded" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Password" className="w-full p-2 border rounded" />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <input {...register('address', { required: 'Address is required' })} placeholder="Address" className="w-full p-2 border rounded" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="md:col-span-2">
                    <select {...register('role', { required: 'Role is required' })} className="w-full p-2 border rounded bg-white" defaultValue="">
                        <option value="" disabled>Select a Role</option>
                        <option value="NORMAL_USER">Normal User</option>
                        <option value="SYSTEM_ADMIN">System Admin</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                </div>
            </div>
            <button type="submit" disabled={isLoading} className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-green-300 hover:bg-green-600 transition-colors">
              {isLoading ? 'Saving...' : 'Save User'}
            </button>
          </form>
        </div>
      )}

      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Filter by name..." className="w-full p-2 border rounded" />
        <input type="text" name="email" value={filters.email} onChange={handleFilterChange} placeholder="Filter by email..." className="w-full p-2 border rounded" />
        <input type="text" name="address" value={filters.address} onChange={handleFilterChange} placeholder="Filter by address..." className="w-full p-2 border rounded" />
        <select name="role" value={filters.role} onChange={handleFilterChange} className="w-full p-2 border rounded bg-white">
            <option value="">All Roles</option>
            <option value="NORMAL_USER">Normal User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('name')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('email')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  Email
                  {getSortIcon('email')}
                </button>
              </th>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('address')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  Address
                  {getSortIcon('address')}
                </button>
              </th>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('role')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  Role
                  {getSortIcon('role')}
                </button>
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Store Avg. Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && users.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-8 text-gray-500">Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-8 text-gray-500">No users found matching your filters.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 text-sm text-gray-600 truncate max-w-xs">{user.address}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'SYSTEM_ADMIN' ? 'bg-red-100 text-red-800' :
                      user.role === 'STORE_OWNER' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role.replace('_', ' ').toLowerCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.role === 'STORE_OWNER' ? ( 
                      <span className="flex items-center gap-1 font-bold">
                        <FaStar className="text-yellow-400" />
                        {user.storeAverageRating || 'N/A'}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default UserManagement;