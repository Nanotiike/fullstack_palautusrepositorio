import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

vi.mock('../services/blogs', () => ({
  default: {
    addLike: vi.fn()
  }
}))

import blogService from '../services/blogs'

test('renders blog title', () => {
  const blog = {
    title: 'Testing React Components',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  render(<Blog blog={blog} />)

  const titles = screen.getAllByText('Testing React Components')
  expect(titles[0]).toBeInTheDocument()
})

test('renders blog information when expanded', async () => {
  const blog = {
    title: 'Testing React Components',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  render(<Blog blog={blog} blogs={[blog]} setBlogs={() => {}} />)

  const authorElement = screen.getByText('Test Author')
  const urlElement = screen.getByText('http://example.com')
  const likesElement = screen.getByText('likes 5')

  expect(authorElement).not.toBeVisible()
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(authorElement).toBeVisible()
  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
})

test('like button calls event handler twice when clicked twice', async () => {
  const blog = {
    id: '1',
    title: 'Testing React Components',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    user: {
      name: 'Test User'
    }
  }

  blogService.addLike.mockResolvedValue({ ...blog, likes: blog.likes + 1 })

  const mockHandler = vi.fn()

  render(<Blog blog={blog} blogs={[blog]} setBlogs={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})