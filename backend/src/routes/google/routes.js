import express from 'express'
import fs from 'fs'
import path from 'path'
import g from 'googleapis'
const { google } = g
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    console.log(path.resolve('src/credentials/oauth2.keys.json'))
    const keys = JSON.parse(
      fs.readFileSync(path.resolve('src/credentials/oauth2.keys.json'))
    )
    const oauth2Client = new google.auth.OAuth2(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    )
     
    // generate a url that asks permissions for Blogger and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/youtube'
    ]
     
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
     
      // If you only need one scope you can pass it as a string
      scope: scopes
    })
    res.send(url)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

export default router