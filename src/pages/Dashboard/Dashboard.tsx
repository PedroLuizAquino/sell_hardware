import { Box } from "@mui/system";
import { MenuLateral } from "../../shared/components";
import { Navbar } from "../../shared/layouts/Navbar"



type DashboardProps = {
    children: React.ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
    return (



        <Navbar>
            <MenuLateral>
                <Box height={"100%"} width={"100%"}>
                    {children}
                </Box>
            </MenuLateral>
        </Navbar>
    );
};