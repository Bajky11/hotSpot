import {IconButton, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Home, Menu} from "@mui/icons-material";

export const BottomNavigation = () => {
    const navigate = useNavigate();

    return (
        <Stack borderTop={"1px solid lightgray"} direction={"row"} justifyContent={"space-evenly"} p={0.5}>
            <IconButton onClick={() => navigate("/home")}>
                <Home/>
            </IconButton>
            <IconButton onClick={() => navigate("/options")}>
                <Menu/>
            </IconButton>
        </Stack>
    )
}