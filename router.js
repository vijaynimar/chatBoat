import { Router } from "express"
import { createUser,choosePath } from "./controller.js"
const router=Router()
router.post("/create-user",createUser)

router.post('/webhook', choosePath);



export default router