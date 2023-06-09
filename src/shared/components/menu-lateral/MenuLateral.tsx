import { Typography, Drawer, List, ListItemButton, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../../contexts";

type MenuLateralProps = {
    children: React.ReactNode;
}

type ListItemFilterProps = {
    label: string;
    filter?: string;
    onClick: (() => void) | undefined;
}

const ListItemFilter = ({ label, filter, onClick }: ListItemFilterProps) => {



    const handleClick = () => {
        onClick?.();
    }

    return (
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

export const MenuLateral = ({ children }: MenuLateralProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Drawer open={isDrawerOpen}
                    variant={smDown ? 'temporary' : "persistent"}
                    onClose={toggleDrawerOpen}
                    className="Drawer"
                    sx={{
                        zIndex: 0,
                    }}
                >
                    <Box
                        width={theme.spacing(28)}
                        display={"flex"}
                        flexDirection={"column"}
                        height={'100%'}
                        marginTop={12}
                    >
                        <Box padding={1}>
                            <Typography  >
                                Categorias
                            </Typography>
                        </Box>
                        <Box flex={1} padding={1}>
                            <List component={'nav'}>
                                {drawerOptions.map(drawerOption => (
                                    <ListItemFilter
                                        key={drawerOption.id}
                                        label={drawerOption.label}
                                        onClick={undefined}
                                    />
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Drawer>

                <Box flex={1} overflow={'auto'} marginTop={10} marginLeft={smDown ? theme.spacing(4) : isDrawerOpen ? theme.spacing(30) : theme.spacing(4)} sx={{ flexGrow: 3 }}>
                    {children}
                </Box>
            </Box>
        </>
    );
};