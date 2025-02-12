import {Stack, Box} from "@mui/material";
import {Footer} from "../components/Footer";
import {TopMenu} from "../components/TopMenu";

export const AppLayout = ({children}) => {
    return (
        <Stack height="100vh">
            <TopMenu/>
            <Box sx={{flexGrow: 1, overflow: "auto"}}>{children}</Box>
            <Footer/>
        </Stack>
    );
};