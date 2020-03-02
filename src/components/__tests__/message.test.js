import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Message } from '../message';

const mockMessage = {
  id: 1,
  message: 'this is a test message',
  priority: 1
};

describe('message', () => {
  afterEach(cleanup);
  it('should render a message', () => {
    const { getByText } = render(<Message message={mockMessage}/>)

    expect(getByText('this is a test message')).toBeDefined();
  });
})