import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let container

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
    container = render(
      <Blog blog={blog} />
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
})
