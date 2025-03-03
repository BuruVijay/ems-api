import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addLeave, getLeaves, getLeavesadmin,getLeaveDetail, updateLeave} from '../controllers/leaveController.js';

const router=express.Router();

router.post('/add',authMiddleware,addLeave);
router.get('/detail/:id',authMiddleware,getLeaveDetail);
router.get('/:id/:role',authMiddleware,getLeaves);
router.get('/',authMiddleware,getLeavesadmin);
router.put('/:id',authMiddleware,updateLeave);


export default router;