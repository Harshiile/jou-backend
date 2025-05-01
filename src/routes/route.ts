import { Router } from 'express'
import { loginUser, signUser } from '../controllers/auth'
import { SendMail } from '../controllers/mail'
import { youtubeChannelInfo, youtubeConnecterURL } from '../controllers/oauth'
import { authorize } from '../middleware/authorize'
const router = Router()

const tmp = () => { }

// User-Auth
router.post('/login', loginUser)
router.post('/signup', signUser)

// Mail-Service
router.post('/mail/send', authorize, SendMail)

// Youtube-Service
router.get('/youtube/get/oauth-url', youtubeConnecterURL) // get/oauth/youtube/url
router.get('/youtube/get/channel-info', youtubeChannelInfo) // get/youtube/info
router.get('/youtube/upload/video', tmp)

// Drive-Service
router.get('/drive/upload', tmp)
router.get('/drive/retrieve', tmp)

export default router