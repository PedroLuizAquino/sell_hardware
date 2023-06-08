import { Drawer } from "@mui/material";
import { Box } from "@mui/system";

interface InMenuLateral {
    children: React.ReactNode;
}

export const MenuLateral: React.FC<InMenuLateral> = (children) => {


    return (
        <>
            <Drawer variant="permanent" >
                Teste
            </Drawer>
            <Box>
            </Box>
        </>

    )
} 