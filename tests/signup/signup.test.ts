import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {
  test('creating a new account is possible', async ({ page }) => {
    await page.goto('localhost:8080/signup')

    await page
      .getByLabel('First name')
      .fill('tester')

    await page
      .getByLabel('Last name')
      .fill('testsson')

    await page
      .getByLabel('Email')
      .fill('test4@mail.com')

    await page
      .getByLabel('Password', { exact: true })
      .fill('Testtest1234')

    await page
      .getByRole('button', {name: 'Submit'})
      .click()

    // Wait for 1 second until page is fully loaded
    await page.waitForTimeout(1000)
    await expect(page.getByText('Log out')).toBeVisible()
  }),

  test('creating a new account with an invalid password is not possible', async ({ page }) => {
    await page.goto('localhost:8080/signup')

    await page
      .getByLabel('First name')
      .fill('tester')

    await page
      .getByLabel('Last name')
      .fill('testsson')

    await page
      .getByLabel('Email')
      .fill('test4@mail.com')

    await page
      .getByLabel('Password', { exact: true })
      .fill('Testtest')

    await expect(page.getByRole('button', {name: 'Submit'})).toBeDisabled()
  })
})
