import { fall, learningProgress } from '../index.js'
import { sleep } from './ultilities.js'

async function joinProgram(page, programURl = fall) {
  await page.goto(programURl, { waitUntil: 'domcontentloaded' })

  const selector = 'button[type="button"][data-e2e="ProgramJoinModal-join-button"]'

  try {
    await page.waitForSelector(selector, { visible: true, timeout: 5000 })
    await page.click(selector)

    await page.waitForNavigation({ timeout: 0 })
    sleep(5000)

    console.log('Joined the program successfully')
  } catch (error) {
    console.log('Already joined the program')
  }
}

async function specializationEnroll(page, courseUrl) {
  await page.goto(courseUrl, { waitUntil: 'domcontentloaded' })

  const buttonSelector = 'button[type="submit"][data-track-component="enroll_button"]'

  try {
    // Wait for the button to be visible
    await page.waitForSelector(buttonSelector, { visible: true, timeout: 5000 })

    // Get the button text
    const buttonText = await page.$eval(buttonSelector, el => el.innerText.trim())

    if (buttonText === 'Go To Course') {
      console.log('Already enrolled')
      return
    }

    // Click the button if it's not 'Go To Course'
    await page.click(buttonSelector)
    // await page.locator('#rc-TopLevelModal >>> button[type="button"]').click()
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 })
    sleep(5000)
    console.log('Enrolled successfully')

    // Wait for navigation to complete
  } catch (error) {
    console.error('Error during enrollment:', error.message)
  }
}

async function clickAndEnrollMenuButtons(page) {
  await page.goto(learningProgress, { waitUntil: 'domcontentloaded' })

  const menuSelector = '.rc-MultiCourseProductEnrolledCardExtended >>> div[role="tablist"]'
  console.log(menuSelector)
  const buttonSelector = `${menuSelector} >>> button[role="tab"]`
  const courseCardSelector = 'div[class*="rc-CourseNotEnrolledCard"]'
  const enrollButtonSelector = `${courseCardSelector} >>> button[data-e2e*="ProgramActionButtonContainer"]`

  try {
    // Wait for the menu to be visible
    await page.waitForSelector(menuSelector, { visible: true, timeout: 10000 })

    // Get all buttons within the menu
    const buttons = await page.$$(buttonSelector)

    console.log(`Found ${buttons.length} buttons`)

    // Click each button
    for (let i = 1; i < buttons.length; i++) {
      console.log(`Clicking button ${i + 1}`)
      await buttons[i].click()
      try {
        await page.waitForSelector(courseCardSelector, { timeout: 5000 })
      } catch (error) {
        console.log('No course card found')
        continue
      }

      await page.locator(enrollButtonSelector).click()
      console.log('Course card founded')
      await sleep(5000)
    }

    console.log('Finished clicking all buttons in the menu')
  } catch (error) {
    console.error('Error while clicking menu buttons:', error)
  }

  page.reload({ waitUntil: 'networkidle2' })
}

export { joinProgram, specializationEnroll as courseEnroll, clickAndEnrollMenuButtons }
