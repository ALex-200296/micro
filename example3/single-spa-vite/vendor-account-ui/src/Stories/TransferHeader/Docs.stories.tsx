import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TransferHeader } from '@features/common/ui/Transfer/TransferHeader/TransferHeader.component';
import { ITransferHeaderProps } from '@features/common/ui/Transfer/TransferHeader/TransferHeader.types';
import { createId } from '@shared/lib/utils/helpers/string.helpers';
import { useCallback, useMemo, useState } from '@storybook/preview-api';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { Typography } from 'antd';

import { TransferHeaderArgDescriptions } from './Docs.data';

const { Text } = Typography;

const OnChangeArgs: Decorator<ITransferHeaderProps> = (Story, context) => {
  const boxes = [createId()];

  const [boxesState, setBoxesState] = useState(boxes);
  const [activeBox, setActiveBox] = useState<string>(boxes[0]);
  const activeBoxNumber = useMemo(() => boxesState.findIndex((box) => box === activeBox) + 1, [boxesState, activeBox]);

  const items = useMemo(() => boxesState, [boxesState]);

  const addBoxFn = () => {
    const newBox = createId();
    setBoxesState((prev) => [...prev, newBox]);
    setActiveBox(newBox);
  };

  const removeBoxFn = (selectedBox: string) => {
    setBoxesState((prev) => prev.filter((rowId) => rowId !== selectedBox));
  };

  const selectBoxFn = (selectedBox: string) => {
    setActiveBox(selectedBox);
  };

  const addElement = useCallback(addBoxFn, [boxesState]);
  const removeElement = useCallback(removeBoxFn, [boxesState]);
  const selectElement = useCallback(selectBoxFn, [boxesState, activeBox]);

  return Story({
    ...context,
    args: {
      ...context.allArgs,
      activeBox,
      items,
      addElement,
      removeElement,
      selectElement,
      children: (
        <Text>
          {context.allArgs.itemTitle}
          {activeBoxNumber}
        </Text>
      ),
    },
  });
};

const meta: Meta<typeof TransferHeader> = {
  component: TransferHeader,
  title: 'Transfer/Transfer Header/Документация',
  tags: ['autodocs'],
  argTypes: TransferHeaderArgDescriptions,
};

export default meta;
type Story = StoryObj<typeof TransferHeader>;

export const Docs: Story = {
  args: {
    addButtonTitle: 'Добавить элемент',
    dropdownIcon: <DownOutlined />,
    itemTitle: 'Коробка №',
  },
  decorators: [OnChangeArgs],
};
