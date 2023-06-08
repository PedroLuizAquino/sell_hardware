import { createTheme } from "@mui/material"

export const LightTheme = createTheme({
    palette: {
        primary: {
            main:  "#FF9900", 
            dark:  "#DE8500",
            light: "#FFAE00" ,
            contrastText: "#FFFFFF" ,
        },
        secondary: {
            main:  "#465EFF", 
            dark:  "#3A4FD6",
            light: "#457CFF" ,
            contrastText: "#FFFFFF" ,
        },
        background: {
            default: "#E6E6E6",
            paper: "#FFFFFF",
        } 
    }
});