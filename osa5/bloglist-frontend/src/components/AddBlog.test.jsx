import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AddBlogForm from './AddBlog'

import blogService from '../services/blogs'

vi.mock('../services/blogs', () => ({
  default: {
    addBlog: vi.fn()
  }
}))

test('by hand this time', async () => {
  const user = userEvent.setup()

  const mockSetBlogs = vi.fn()
  const mockSetMessage = vi.fn()
  const mockSetMessageType = vi.fn()
  const mockOnBlogAdded = vi.fn()

  const blogs = []

  const returnedBlog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0
  }

  blogService.addBlog.mockResolvedValue(returnedBlog)

  render(
    <AddBlogForm
      blogs={blogs}
      setBlogs={mockSetBlogs}
      setMessage={mockSetMessage}
      setMessageType={mockSetMessageType}
      onBlogAdded={mockOnBlogAdded}
    />
  )

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)
  const submitButton = screen.getByText('create')

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://testurl.com')
  await user.click(submitButton)
  console.log('after submit')

  expect(blogService.addBlog).toHaveBeenCalledTimes(1)
  expect(blogService.addBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0
  })

  expect(mockSetBlogs).toHaveBeenCalledWith([returnedBlog])
  expect(mockSetMessage).toHaveBeenCalledWith(
    'a new blog Test Blog Title by Test Author added'
  )
  expect(mockSetMessageType).toHaveBeenCalledWith('success')
  expect(mockOnBlogAdded).toHaveBeenCalledTimes(1)
})