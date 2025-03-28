import { useMemo } from 'react';
import { Grid } from 'antd';

import { UseBreakpointsType } from './useBreakpoints.types';

const { useBreakpoint } = Grid;

export const useBreakpoints: UseBreakpointsType = () => {
  const { xs, sm, md, lg, xl } = useBreakpoint();
  const isDesktop = useMemo(() => Boolean(lg || xl), [lg, xl]);
  const isTablet = useMemo(() => Boolean(md && !isDesktop), [md, isDesktop]);
  const isMobile = useMemo(() => Boolean(xs || (sm && !md)), [xs, sm, md]);
  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoints: {
      xs: Boolean(xs),
      sm: Boolean(sm && isMobile),
      md: Boolean(md && !isDesktop),
      lg: Boolean(lg && isDesktop),
      xl: Boolean(xl),
    },
  };
};