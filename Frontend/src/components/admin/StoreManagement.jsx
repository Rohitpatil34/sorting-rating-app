import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllStores, addNewStore } from '../../features/admin/adminSlice';
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaStar, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash, FaSort } from 'react-icons/fa';
import Pagination from './Pagination';
import { ImCancelCircle } from "react-icons/im";

const StoreManagement = () => {
  const dispatch = useDispatch();
  const { stores, pagination, isLoading, isError, message } = useSelector((state) => state.admin);

  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filters, setFilters] = useState({ name: '', email: '', address: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Re-fetch data when filters, page, or sort order change
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = {
        ...filters,
        page: currentPage,
        limit: 10,
        sortBy: sortConfig.key,
        order: sortConfig.direction
      };
      dispatch(fetchAllStores(params));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters, currentPage, sortConfig, dispatch]);

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

  const onStoreSubmit = (data) => {
    dispatch(addNewStore(data)).unwrap()
      .then(() => {
        reset();
        setShowForm(false);
      })
      .catch(() => { });
  };

  return (
    <div className="pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Store Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          
          {showForm ? 'Cancel' : 'Add Store'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md animate-fade-in-down">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Store & Owner</h2>
          {isError && <p className="text-red-500 mb-4">{message}</p>}
          <form onSubmit={handleSubmit(onStoreSubmit)} className="space-y-4">
            <h3 className="font-bold text-gray-600 border-b pb-2">Store Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input {...register('storeName', { required: 'Store name is required' })} placeholder="Store Name" className="w-full p-2 border rounded" />
                {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName.message}</p>}
              </div>
              <div className="md:col-span-2">
                <input {...register('storeAddress', { required: 'Store address is required', maxLength: { value: 400, message: 'Max 400 characters' } })} placeholder="Store Address" className="w-full p-2 border rounded" />
                {errors.storeAddress && <p className="text-red-500 text-xs mt-1">{errors.storeAddress.message}</p>}
              </div>
            </div>

            <h3 className="font-bold text-gray-600 border-b pb-2 mt-4">New Store Owner Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  {...register('ownerName', {
                    required: "Owner's name is required",
                    minLength: { value: 20, message: 'Min 20 characters' },
                    maxLength: { value: 60, message: 'Max 60 characters' }
                  })}
                  placeholder="Owner's Full Name"
                  className="w-full p-2 border rounded"
                />
                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName.message}</p>}
              </div>
              <div>
                <input
                  {...register('email', {
                    required: 'A valid email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  placeholder="Store & Owner Email"
                  className="w-full p-2 border rounded"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="md:col-span-2">
                <input {...register('ownerAddress', { required: "Owner's address is required", maxLength: { value: 400, message: 'Max 400 characters' } })} placeholder="Owner's Address" className="w-full p-2 border rounded" />
                {errors.ownerAddress && <p className="text-red-500 text-xs mt-1">{errors.ownerAddress.message}</p>}
              </div>

              <div className="relative md:col-span-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Owner password is required',
                    pattern: { value: /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/, message: '8-16 chars, one uppercase, one special char' }
                  })}
                  placeholder="New Owner's Password"
                  className="w-full p-2 border rounded"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-green-300 hover:bg-green-600 transition-colors">
              {isLoading ? 'Creating...' : 'Create Store & Owner'}
            </button>
          </form>
        </div>
      )}

      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input type="text" name="name" value={filters.name} onChange={handleFilterChange} placeholder="Filter by name..." className="w-full p-2 pl-10 border rounded" />
        </div>
        <div className="relative">
          <input type="text" name="email" value={filters.email} onChange={handleFilterChange} placeholder="Filter by email..." className="w-full p-2 pl-10 border rounded" />
        </div>
        <div className="relative">
          <input type="text" name="address" value={filters.address} onChange={handleFilterChange} placeholder="Filter by address..." className="w-full p-2 pl-10 border rounded" />
        </div>
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
              <th className="p-4 text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button
                  onClick={() => requestSort('rating')}
                  className="w-full text-center flex items-center justify-center gap-1 focus:outline-none"
                >
                  Avg. Rating
                  {getSortIcon('rating')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && stores.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-8 text-gray-500">Loading stores...</td></tr>
            ) : stores.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-8 text-gray-500">No stores found matching your filters.</td></tr>
            ) : (
              stores.map(store => (
                <tr key={store.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{store.name}</td>
                  <td className="p-4 text-gray-600">{store.email}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{store.address}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-1 font-bold text-gray-800">
                      <FaStar className="text-yellow-400" />
                      {store.rating || 'N/A'}
                    </div>
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

export default StoreManagement;