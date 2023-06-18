import { useState, useContext, createContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from "../themes";
import { Box } from "@mui/system";

type ThemeContextProps = {
    themeName: 'light';

}

const ThemeContext = createContext({} as ThemeContextProps)


export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}


type AppThemeProviderProps = {
    children: React.ReactNode;

}
export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
    const [themeName] = useState<'light'>('light');
    return (
        <ThemeContext.Provider value={{ themeName }} >
            <ThemeProvider theme={LightTheme}>
                <Box width={"100vw"} height={"100vh"} bgcolor={LightTheme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )

} 