import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MessageList from '../message-list'

const mockMessages = {
  errors: [{id: 1, message: 'test error', priority: 1}],
  warnings: [{id: 2, message: 'this is a test warning', priority: 2}],
  info: [{id: 3, message: 'this is test info', priority: 3}]
}

describe('message-list', () => {
  afterEach(cleanup);
  it('should render MessageList', () => {
    const { container } = render(<MessageList /> )
    expect(container).toBeVisible()
  });

  it('should render messages', () => {
    const component = render(<MessageList messages={mockMessages}/>);

    expect(component.getByText('test error')).toBeVisible();
    expect(component.getByText('this is a test warning')).toBeVisible();
    expect (component.getByText('this is test info')).toBeVisible(); 
  });
})
