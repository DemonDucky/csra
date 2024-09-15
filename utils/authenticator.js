async function login(page, email, password) {
  await page.goto('https://www.coursera.org/?authMode=login')
  const cookie = await page.cookies()

  console.log(cookie)

  if (cookie.some(c => c.name.includes('CAUTH'))) {
    console.log('Already logged in')
    return
  }

  await page.locator('input[name="email"]').fill(email)

  await page.locator('input[name="password"]').fill(password)

  await page.locator('button[type="submit"]').click()

  await page.waitForNavigation({ timeout: 0, waitUntil: 'domcontentloaded' })

  console.log('Login successfully')
}

export { login }
