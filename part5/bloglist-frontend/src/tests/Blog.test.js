import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      url: 'https://test.com/',
      title: 'This is a test.',
      author: 'The Tester',
      user: {
        name: 'Jean Huynh'
      },
      likes: 3,
    }

    const user = {
      username: 'feilong',
      name: 'Jean Huynh'
    }

    container = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    ).container


  })
  test('renders only title and author', () => {
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent(
      'This is a test. The Tester'
    )
    expect(blogDiv).not.toHaveTextContent(
      'https://test.com/'
    )
    expect(blogDiv).not.toHaveTextContent(
      'Jean Huynh'
    )
    expect(blogDiv).not.toHaveTextContent(
      'likes'
    )
    const blogDetailsDiv = container.querySelector('.blogDetails')
    expect(blogDetailsDiv).toBeNull()
  })

  test('clicking the button calls event handler once and show blog details', async () => {
    const user = userEvent.setup()
    const toggleButton = container.querySelector('.toggleBtn')
    await user.click(toggleButton)

    const blogDetailsDiv = container.querySelector('.blogDetails')

    expect(blogDetailsDiv).not.toBeNull()

    expect(blogDetailsDiv).toHaveTextContent(
      'Jean Huynh'
    )
    expect(blogDetailsDiv).toHaveTextContent(
      'likes 3'
    )
  })

  test('clicking the like button twice calls event handler twice.', async () => {
    const user = userEvent.setup()
    const toggleButton = container.querySelector('.toggleBtn')
    await user.click(toggleButton)

    const likeButton = container.querySelector('.likeBtn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
