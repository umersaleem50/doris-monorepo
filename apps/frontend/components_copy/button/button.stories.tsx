import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    backgroundColor: {
      options: ['red', 'blue', 'green'],
      control: 'radio',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
    backgroundColor: 'blue',
  },
};

export const Error: Story = {
  args: {
    backgroundColor: 'red',
    label: 'Button',
  },
};
export const Success: Story = {
  args: {
    backgroundColor: 'green',
    label: 'Button',
  },
};
