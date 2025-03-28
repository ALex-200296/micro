import React from 'react';
import { BlockOutlined } from '@ant-design/icons';
import { SelectableCard } from '@shared/ui/atoms/Inputs/Cards/SelectableCard.component';
import IconButton from '@shared/ui/molecules/Button/IconButton/IconButton.component';
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import { CardArgDescriptions } from './Docs.data';

const meta: Meta<typeof SelectableCard> = {
  component: SelectableCard,
  title: 'Inputs/SelectableCard/Документация',
  tags: ['autodocs'],
  argTypes: CardArgDescriptions,
  parameters: {
    controls: {
      include: Object.keys(CardArgDescriptions),
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectableCard>;

export const Docs: Story = {
  args: {
    title: 'Держатель с защелкой 16 мм для труб',
    subtitle: 'Артикул: 2124124124512512312',
    checked: false,
    extra: <IconButton icon={<BlockOutlined />} dataTestId='rightTopComp' type='transparent' />,
    bottomnNode: '15 шт / 1.3 м³',
    required: false,
    indeterminate: false,
    defaultChecked: false,
    disabled: false,
    id: '',
    autoFocus: false,
    name: '',
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    const handleChange = (e: CheckboxChangeEvent) => {
      updateArgs({ checked: e.target.checked });
      args.onChange && args.onChange(e);
    };

    return <SelectableCard {...args} checked={checked} onChange={handleChange} />;
  },
};
