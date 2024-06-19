import express from "express"
import {attendance, attendanceUpdate} from '../controllers/AttendanceController.js'

const router = express.Router()

router.get('/', attendance)
router.put('/:id', attendanceUpdate)



export default router;