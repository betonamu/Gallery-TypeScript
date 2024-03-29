import {useLayoutEffect, useState} from "react";

import {getStringData, setStringData} from "@utils/localStorage";
import {storageKeys, THEME_DOM_KEY, THEME_MODE} from "@constants";

type DarkModeReturnType = {
    onSwitchTheme: (e: any) => void;
    isDarkMode: boolean;
}

const useDarkMode = (): DarkModeReturnType => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const onSetDataTheme = (dataTheme = THEME_MODE.LIGHT, isDarkMode = false) => {
        setIsDarkMode(isDarkMode);
        document.documentElement.setAttribute(THEME_DOM_KEY, dataTheme);
        setStringData(storageKeys.DATA_THEME, dataTheme);
    }

    const onSetDataThemeIntoDOM = (dataTheme: string | false | null) => {
        if (dataTheme === THEME_MODE.DARK) {
            onSetDataTheme(THEME_MODE.DARK, true);
        } else {
            onSetDataTheme();
        }
    }

    const onSwitchTheme = (checked: boolean) => {
        let nextTheme = '';
        let _isDarkMode: boolean;
        if (checked) {
            nextTheme = THEME_MODE.DARK;
            _isDarkMode = true;
        } else {
            _isDarkMode = false;
        }
        onSetDataTheme(nextTheme, _isDarkMode);
    }

    useLayoutEffect(() => {
        //get init theme from localStorage and set when the first time page loaded.
        const dataTheme = getStringData(storageKeys.DATA_THEME);
        onSetDataThemeIntoDOM(dataTheme);

        //handle event listener to tracking OS theme.
        const darkModeTracking = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChangeThemeByTracking = (event: any) => {
            const nextTheme = event.matches ? THEME_MODE.DARK : THEME_MODE.LIGHT;
            onSetDataThemeIntoDOM(nextTheme);
        }

        darkModeTracking.addEventListener('change', handleChangeThemeByTracking);

        //delete event tracking theme when page dismount
        return () => {
            darkModeTracking.removeEventListener('change', handleChangeThemeByTracking);
        }
    }, []);

    return {
        onSwitchTheme,
        isDarkMode
    }
};

export default useDarkMode;