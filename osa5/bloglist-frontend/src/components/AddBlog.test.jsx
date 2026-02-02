import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AddBlogForm from './AddBlog'

vi.mock('../services/blogs', () => ({
  default: {
    addBlog: vi.fn()
  }
}))

import blogService from '../services/blogs'

describe('AddBlogForm', () => {
  let mockSetBlogs
  let mockSetMessage
  let mockSetMessageType
  let mockOnBlogAdded

  beforeEach(() => {
    mockSetBlogs = vi.fn()
    mockSetMessage = vi.fn()
    mockSetMessageType = vi.fn()
    mockOnBlogAdded = vi.fn()
    vi.clearAllMocks()
  })

  test('calls blogService.addBlog with correct information when form is submitted', async () => {
    const blogs = []
    const returnedBlog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    }

    blogService.addBlog = vi.fn().mockResolvedValue(returnedBlog)

    console.log('Is addBlog a function?', typeof blogService.addBlog)
    console.log('Mock implementation:', blogService.addBlog)

    //const testResult = await blogService.addBlog({ test: 'data' })
    //console.log('Direct call result:', testResult)

    const { container } = render(
      <AddBlogForm
        blogs={blogs}
        setBlogs={mockSetBlogs}
        setMessage={mockSetMessage}
        setMessageType={mockSetMessageType}
        onBlogAdded={mockOnBlogAdded}
      />
    )

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)
    //const submitButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    console.log('After typing title:', titleInput.value)
    await user.type(authorInput, 'Test Author')
    console.log('After typing author:', authorInput.value)
    await user.type(urlInput, 'http://testurl.com')
    console.log('After typing url:', urlInput.value)
    const form = container.querySelector('form')
    console.log('Before submit')
    // Create and dispatch a submit event
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    form.dispatchEvent(submitEvent)

    console.log('after submit')

    // Verify blogService.addBlog was called with correct information
    expect(blogService.addBlog).toHaveBeenCalledTimes(1)
    expect(blogService.addBlog).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    })

    // Verify state updates
    expect(mockSetBlogs).toHaveBeenCalledWith([returnedBlog])
    expect(mockSetMessage).toHaveBeenCalledWith(
      'a new blog Test Blog Title by Test Author added'
    )
    expect(mockSetMessageType).toHaveBeenCalledWith('success')
    expect(mockOnBlogAdded).toHaveBeenCalledTimes(1)
  }, 10000)
})