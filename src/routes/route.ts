import { Router, Request, Response } from 'express'
import { loginUser } from '../controllers/auth/login'
import { signUser } from '../controllers/auth/signup'
import { SendMail } from '../controllers/mail/sendmail'

const router = Router()

router.post('/login', loginUser)
router.post('/signup', signUser)
router.post('/mail/send', SendMail)

export default router