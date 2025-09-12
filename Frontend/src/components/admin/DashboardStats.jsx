// src/components/admin/DashboardStats.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardStats } from '../../features/admin/adminSlice';
import { FaUsers, FaStore, FaStar } from 'react-icons/fa';

const StatCard = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-lg shadow-lg text-white ${color}`}>
    <div className="flex items-center gap-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <div className="text-5xl font-bold">{value}</div>
        <div className="text-lg">{title}</div>
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  if (isLoading) return <p>Loading stats...</p>;

  return (
    <div>
        <h1 className="text-3xl pt-20 font-bold mb-6 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={<FaUsers />} title="Total Users" value={stats.users} color="bg-blue-500" />
            <StatCard icon={<FaStore />} title="Total Stores" value={stats.stores} color="bg-green-500" />
            <StatCard icon={<FaStar />} title="Total Ratings" value={stats.ratings} color="bg-yellow-500" />
        </div>
    </div>
  );
};

export default DashboardStats;