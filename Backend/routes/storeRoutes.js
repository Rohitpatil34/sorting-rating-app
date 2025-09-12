import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { ratingValidationRules, validate } from '../middleware/validationMiddleware.js';
import { getStoresForUser, rateStore, getOwnerDashboard } from '../controllers/storeController.js';

const router = express.Router();

// Normal User Routes
router.get('/', protect, getStoresForUser);
router.post('/:storeId/rate', protect, authorize('NORMAL_USER'), ratingValidationRules(), validate, rateStore);

// Store Owner Routes
router.get('/owner/dashboard', protect, authorize('STORE_OWNER'), getOwnerDashboard);

export default router;