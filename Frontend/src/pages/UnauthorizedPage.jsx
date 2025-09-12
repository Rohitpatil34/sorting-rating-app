import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
      <p className="text-lg text-gray-600 mt-4">You do not have permission to view this page.</p>
      <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        Go to Homepage
      </Link>
    </div>
  );
};
export default UnauthorizedPage;