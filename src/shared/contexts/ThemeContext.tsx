import { useState, useContext, createContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { LightTheme } from "../themes";
import { Box } from "@mui/system";

interface IThemeContextData {
    themeName: 'light';

}

const ThemeContext = createContext({} as IThemeContextData)


export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}


interface IAppThemeProvider {
    children: React.ReactNode;

}
export const AppThemeProvider: React.FC<IAppThemeProvider> = ({ children }) => {
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