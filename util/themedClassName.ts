export function classNameByTheme(
    themeState:string,
    dark:string,
    warm:string,
    light:string,
) {
    switch (themeState) {
        case 'dark':
            return dark; break;
        case 'warm':
            return warm; break;
        case 'light':
            return light; break;
    default:
        console.log(`util.classNameByTheme(); themeState input invalid`);
    }
}