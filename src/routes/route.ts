import { Router } from 'express'
import { loginUser, signUser } from '../controllers/auth'
import { SendMail } from '../controllers/mail'
import { youtubeChannelInfo, youtubeConnecterURL } from '../controllers/oauth'
import { authorize } from '../middleware/authorize'
import { uploadOnDrive } from '../controllers/drive/upload'
import { TMP } from '../controllers/auth/login'
const router = Router()

const tmp = () => { }

// User-Auth
router.post('/login', loginUser)
router.post('/signup', signUser)
router.post('/tmp', TMP)

// Mail-Service
router.post('/mail/send', SendMail)

// Youtube-Service
router.get('/youtube/get/oauth-url', youtubeConnecterURL) // get/oauth/youtube/url
router.get('/youtube/get/channel-info', youtubeChannelInfo) // get/youtube/info
router.get('/youtube/upload/video', tmp)

// Drive-Service
router.post('/drive/upload', uploadOnDrive)
router.post('/drive/retrieve', authorize)

export default router