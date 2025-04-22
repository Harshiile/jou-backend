import { Router, Request, Response } from 'express'
import { loginUser } from '../controllers/auth/login'
import { signUser } from '../controllers/auth/signup'

const router = Router()

router.post('/login', loginUser)
router.post('/signup', signUser)

export default router