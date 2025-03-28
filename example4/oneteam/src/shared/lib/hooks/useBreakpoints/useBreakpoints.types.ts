export type UseBreakpointsType = () => {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  breakpoints: {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
  };
};
