import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <BlogForm createBlog={mockHandler} />
    ).container
  })

  test('form calls event handler on submit with right details', async () => {
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    const submitButton = container.querySelector('.submitBtn')

    await user.type(titleInput, 'Je suis un titre')
    await user.type(authorInput, 'Au Teur')
    await user.type(urlInput, 'https://url.com')

    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Je suis un titre')
    expect(mockHandler.mock.calls[0][0].author).toBe('Au Teur')
    expect(mockHandler.mock.calls[0][0].url).toBe('https://url.com')
  })
})
