import express from "express"
import { DeleteUser, Updateuser, getAllUsers, getUser } from "../controllers/UserController.js"

const router = express.Router()
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/update/:id', Updateuser)
router.delete('/delete/:id', DeleteUser)


export default router;