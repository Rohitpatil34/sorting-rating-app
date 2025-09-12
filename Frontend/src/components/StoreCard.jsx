import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import RatingModal from './RatingModal';

const StoreCard = ({ store }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{store.name}</h3>
          <p className="text-gray-600 mb-4 text-sm">{store.address}</p>
        </div>
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-lg">
                <FaStar className="text-yellow-400" />
                <span className="font-bold text-gray-700">{store.overallRating}</span>
                <span className="text-sm text-gray-500">(Overall)</span>
                </div>
                {store.userSubmittedRating !== null ? (
                <div className="flex items-center gap-1 text-blue-600 font-semibold">
                    <FaRegStar />
                    <span>Your Rating: {store.userSubmittedRating}</span>
                </div>
                ) : (
                    <div className="text-sm text-gray-400">Not rated yet</div>
                )}
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition-colors"
            >
                {store.userSubmittedRating ? 'Change Your Rating' : 'Rate Store'}
            </button>
        </div>
      </div>
      
      {isModalOpen && (
        <RatingModal 
            storeId={store.id} 
            currentRating={store.userSubmittedRating || 0}
            onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default StoreCard;