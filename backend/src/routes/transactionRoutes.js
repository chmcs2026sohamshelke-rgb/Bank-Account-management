import express from 'express';
const router = express.Router();
import * as transactionController from '../controller/transactionController.js';

router.post('/deposit', transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);
router.get('/:accountId', transactionController.getHistory);

export default router;
