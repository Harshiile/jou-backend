import { Router } from 'express'
import { SendMail } from '../controllers/mail'
import { authorize } from '../middleware/authorize'
import { loginUser, signUser } from '../controllers/auth'
import { youtubeChannelInfo, youtubeConnecterURL } from '../controllers/youtube'
import { deleteOnDrive, uploadOnDrive } from '../controllers/drive'
import { getVideosFromWorkSpace } from '../controllers/fetch/video'
import { getWorkSpaces } from '../controllers/fetch/user'
const router = Router()

const tmp = () => { }

// User-Auth
router.post('/login', loginUser)
router.post('/signup', signUser)

// Mail-Service
router.post('/mail/send', SendMail)

// Youtube-Service
router.get('/youtube/get/oauth-url', youtubeConnecterURL) // get/oauth/youtube/url
router.get('/youtube/get/channel-info', youtubeChannelInfo) // get/youtube/info
router.get('/youtube/upload/video', tmp)

// Drive-Service
router.post('/drive/upload', uploadOnDrive)
router.delete('/drive', deleteOnDrive)
router.post('/drive/retrieve', authorize)

// Fetcher
router.get('/get/videos', getVideosFromWorkSpace)
router.get('/get/workspace', getWorkSpaces)
export default router