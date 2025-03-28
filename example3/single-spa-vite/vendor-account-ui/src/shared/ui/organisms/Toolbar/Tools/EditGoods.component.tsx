import React, { memo, useMemo } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useBreakpoints } from '@shared/lib';
import { getEditGoodsButtonMenu } from '@shared/ui/organisms/Toolbar/Tools/Tools.data';

import { MenuButton } from '../../Button/MenuButton/MenuButton.component';
import { IToolbarMenuBtnProps } from '../Toolbar.types';

export const EditGoods: React.FC<IToolbarMenuBtnProps> = memo(({ menu, buttonProps, ...props }) => {
  const {
    breakpoints: { xl },
  } = useBreakpoints();

  const editGoodsButtonMenu = useMemo(() => getEditGoodsButtonMenu(), []);

  return (
    <MenuButton
      menu={{ items: editGoodsButtonMenu, ...menu }}
      buttonProps={{
        collapsed: !xl,
        children: 'Редактировать товары',
        icon: <EditOutlined />,
        dataTestId: 'edit-goods',
        ...buttonProps,
      }}
      {...props}
    />
  );
});
