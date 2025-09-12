import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { userValidationRules, newStoreWithOwnerValidationRules, validate } from '../middleware/validationMiddleware.js';
import { createUser, createStore, getAllUsers, getAllStores, getDashboardStats } from '../controllers/adminController.js';

const router = express.Router();
const adminOnly = [protect, authorize('SYSTEM_ADMIN')];

router.post('/users', ...adminOnly, userValidationRules(), validate, createUser);
router.post('/stores', ...adminOnly, newStoreWithOwnerValidationRules(), validate, createStore);
router.get('/users', ...adminOnly, getAllUsers);
router.get('/stores', ...adminOnly, getAllStores);
router.get('/stats', ...adminOnly, getDashboardStats);


export default router;