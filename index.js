import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import { login } from './utils/authenticator.js'
import { clickAndEnrollMenuButtons, courseEnroll, joinProgram } from './utils/joinCourse.js'

const fall = 'https://www.coursera.org/programs/fptu-fall-2024-zb2kn'
const learningProgress = `${fall}/my-learning`
const username = 'abc'
const password = 'abc'

;(async () => {
  const baseDir = path.join('./', 'profiles')
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }

  const profileDir = path.join(baseDir, username)

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: profileDir,
    // devtools: true,
    args: [`--start-maximized`, '--disable-notifications'],
    defaultViewport: null
  })

  const page = await browser.newPage()
  await login(page, username, password)

  await joinProgram(page)

  await courseEnroll(page, 'https://www.coursera.org/specializations/academic-english')

  await clickAndEnrollMenuButtons(page)
})()

export { learningProgress, fall }
