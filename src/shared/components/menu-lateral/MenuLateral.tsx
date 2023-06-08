import { Divider, Drawer, List, ListItemButton, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { MdDensityMedium } from 'react-icons/md';
import { useDrawerContext } from "../../contexts";

interface IMenuLateral {
    children: React.ReactNode;
}

interface IListItemFilterProps {
    label: string;
    filter?: string;
    onClick: (() => void) | undefined;
}

const ListItemFilter: React.FC<IListItemFilterProps> = ({ label, filter, onClick }) => {



    const handleClick = () => {
        onClick?.();
    }

    return (
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    return (
        <>
            <Drawer open={isDrawerOpen}
                variant={smDown ? 'temporary' : "permanent"}
                onClose={toggleDrawerOpen}
            >
                <Box
                    width={theme.spacing(28)}
                    display={"flex"}
                    flexDirection={"column"}
                    height={'100%'}
                >
                    <Box
                        width={"100%"}
                        height={theme.spacing(4)}
                        padding={'10px'}
                        display={'flex'}
                    >
                        <MdDensityMedium size={'2em'} onClick={toggleDrawerOpen} />
                    </Box>
                    <Divider />
                    <Box flex={1}>
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
            <Box height={"100"} marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>

    )
} 