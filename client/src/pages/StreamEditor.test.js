import React from 'react';
import { render } from '@testing-library/react';
import StreamEditor from './StreamEditor';

test('renders learn react link', () => {
  const { getByText } = render(<StreamEditor />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
