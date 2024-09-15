import puppeteer from 'puppeteer'
import { login } from './utils/authenticator'
import { clickAndEnrollMenuButtons, courseEnroll, joinProgram } from './utils/joinCourse'
;(async () => {
  'use strict'

  const username = ''
  const password = ''

  const baseDir = path.join('./', 'profiles')
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }

  const profileDir = path.join(baseDir, username)

  const browser = await puppeteer.launch({
    userDataDir: profileDir,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  })

  const page = browser.newPage()

  await login(page, username, password)

  await joinProgram(page)

  await courseEnroll(page, 'https://www.coursera.org/specializations/academic-english')

  await clickAndEnrollMenuButtons(page)
})()
