import theme from '@styles/themeExports.module.scss';

export const tagStatusToColor: Record<string, string> = {
    comp_succ: theme.completedSuccessfullyStateColor,
    comp_unsucc: theme.commonStateColor,
    comp_part: theme.commonStateColor,
    appoint: theme.appointStateColor,
    uncomplete: theme.incompletedStateColor,
    fail: theme.commonStateColor,
    in_progress: theme.inProgressStateColor
}
