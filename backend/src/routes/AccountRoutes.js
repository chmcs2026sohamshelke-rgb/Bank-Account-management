import express from 'express';
const router = express.Router();
import * as accountController from '../controller/AccountController.js';

router.post('/', accountController.createAccount);
router.get('/', accountController.getAllAccounts);
router.patch('/:id', accountController.updateStatus);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

export default router;
