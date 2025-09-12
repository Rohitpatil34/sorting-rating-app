import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateStore } from '../features/stores/storeSlice';
import { FaStar } from 'react-icons/fa';

const RatingModal = ({ storeId, currentRating = 0, onClose }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setIsLoading(true);
    dispatch(rateStore({ storeId, value: rating }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        onClose();
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Rate this Store</h2>
        <div className="flex justify-center text-4xl mb-6">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={ratingValue}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer transition-colors"
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || rating === 0}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 transition"
          >
            {isLoading ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;