async function solveCaptchaManually(page) {
  const checkForCaptcha = async () => await page.$('#rc-imageselect')

  await page.waitForNetworkIdle({ idleTime: 500 })
  let captchaPresent = checkForCaptcha()

  if (captchaPresent) {
    console.log('CAPTCHA detected. Please solve it manually.')

    // Wait for the CAPTCHA to be solved
    await page.waitForFunction(
      () => {
        const captchaElement = document.getElementById('rc-imageselect')
        return !captchaElement || captchaElement.style.display === 'none'
      },
      { timeout: 0 }
    ) // Set timeout to 0 to wait indefinitely

    console.log('CAPTCHA solved. Continuing...')
  } else {
    console.log('No CAPTCHA detected after retry. Continuing...')
  }
}

export { solveCaptchaManually }
