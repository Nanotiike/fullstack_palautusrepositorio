const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the database and create a test user
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'tt',
        username: 'tester2',
        password: 'test'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Check that the login form is visible
    const signIn = page.getByText('login')
    const usernameInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')

    await expect(signIn).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // Fill in the login form and submit
      await page.getByLabel('username').fill('tester2')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('tt logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      // Fill in the login form with wrong credentials and submit
      await page.getByLabel('username').fill('tester')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Log in first
      await page.getByLabel('username').fill('tester2')
      await page.getByLabel('password').fill('test')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      // Create a new blog
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('test blog')
      await page.getByLabel('author').fill('test author')
      await page.getByLabel('url').fill('http://test.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Success message appears
      const successDiv = page.locator('.success')
      await expect(successDiv).toContainText('a new blog test blog by test author added')
    })

    test('a blog can be liked', async ({ page }) => {
      // Create a blog first
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('test blog')
      await page.getByLabel('author').fill('test author')
      await page.getByLabel('url').fill('http://test.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Like the blog
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText("likes 1")).toBeVisible()
    })

    test('a blog can be deleted by the creator', async ({ page }) => {
      // Create a blog first
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title').fill('test blog')
      await page.getByLabel('author').fill('test author')
      await page.getByLabel('url').fill('http://test.com')
      await page.getByRole('button', { name: 'create' }).click()

      // Set up dialog handler to accept the confirmation dialog
      page.on('dialog', async dialog => {
        console.log(dialog.message())
        // Check if it's a confirm dialog 
        if (dialog.type() === 'confirm') {
          await dialog.accept();  // This simulates clicking "OK" to confirm deletion
        } else {
          await dialog.dismiss();  
        }
      })

      await page.pause()
      await expect(page.getByText('test blog')).toBeVisible()
      console.log('Test: Blog created and visible')

      // Delete the blog
      await page.getByRole('button', { name: 'view' }).click()
      console.log('Test: Clicked view button')
      await page.pause()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
      await page.getByRole('button', { name: 'remove' }).click()

      // Check that the blog is no longer visible
      await expect(page.getByText('test blog')).not.toBeVisible()
    })
  })
})