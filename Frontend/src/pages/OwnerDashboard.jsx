import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOwnerDashboard } from '../features/stores/storeSlice';
import { FaStar, FaUsers, FaKey, FaArrowUp, FaArrowDown, FaSort } from 'react-icons/fa';
import Pagination from '../components/admin/Pagination';

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, isLoading, isError, message } = useSelector((state) => state.stores);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const params = {
        page: currentPage,
        limit: 10,
        sortBy: sortConfig.key,
        order: sortConfig.direction
    };
    dispatch(fetchOwnerDashboard(params));
  }, [dispatch, currentPage, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="inline ml-1 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaArrowUp className="inline ml-1 text-blue-500" /> 
      : <FaArrowDown className="inline ml-1 text-blue-500" />;
  };

  if (isLoading && !dashboardData) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (isError) return <div className="text-center mt-10 text-red-500">Error: {message}</div>;
  if (!dashboardData) return <div className="text-center mt-10 text-gray-500">No dashboard data available.</div>;

  const { storeName, averageRating, ratings } = dashboardData;
  const { data: usersWhoRated, pagination } = ratings;

  return (
    <div className="mt-20 container mx-auto p-4 md:p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">My Store Dashboard</h1>
            <h2 className="text-xl font-semibold text-gray-600">{storeName}</h2>
        </div>
        <Link 
            to="/update-password" 
            className="mt-4 md:mt-0 bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors"
        >
            <FaKey /> Update Password
        </Link>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="bg-[#FF714B] text-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center gap-4">
      <div className="bg-white bg-opacity-20 p-3 rounded-full">
        <FaStar className="text-3xl" />
      </div>
      <div>
        <div className="text-4xl font-bold">{averageRating}</div>
        <div className="text-lg opacity-90">Average Rating</div>
      </div>
    </div>
  </div>
  <div className="bg-[#FCC61D] text-white p-6 rounded-lg shadow-lg">
    <div className="flex items-center gap-4">
      <div className="bg-white bg-opacity-20 p-3 rounded-full">
        <FaUsers className="text-3xl" />
      </div>
      <div>
        <div className="text-4xl font-bold">{pagination.totalItems}</div>
        <div className="text-lg opacity-90">Total Ratings</div>
      </div>
    </div>
  </div>
</div>

      <h3 className="text-2xl font-bold mb-4 text-gray-800">Ratings Received</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('name')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  User Name
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('email')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  User Email
                  {getSortIcon('email')}
                </button>
              </th>
              <th className="p-4 text-left font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('address')} 
                  className="w-full text-left flex items-center justify-between focus:outline-none"
                >
                  User Address
                  {getSortIcon('address')}
                </button>
              </th>
              <th className="p-4 text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
                <button 
                  onClick={() => requestSort('rating')} 
                  className="w-full text-center flex items-center justify-center gap-1 focus:outline-none"
                >
                  Rating Given
                  {getSortIcon('rating')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="4" className="text-center p-8 text-gray-500">Loading ratings...</td></tr>
            ) : usersWhoRated.length === 0 ? (
              <tr><td colSpan="4" className="text-center p-8 text-gray-500">No ratings received yet.</td></tr>
            ) : (
              usersWhoRated.map((rating, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{rating.name}</td>
                  <td className="p-4 text-gray-600">{rating.email}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{rating.address}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-1 font-bold text-yellow-500">
                      {rating.rating} <FaStar className="text-yellow-400" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && pagination.totalPages > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;