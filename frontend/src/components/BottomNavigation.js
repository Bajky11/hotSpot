import {IconButton, Stack, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {Home, Menu} from "@mui/icons-material";

export const BottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Stack borderTop={"1px solid rgba(246,246,246,1)"} direction={"row"} justifyContent={"space-evenly"} p={0.5}>
            <BottomNavigationItem
                onClick={() => navigate("/home")}
                selected={location.pathname === "/home"}
                label={"Home"}
                Icon={<Home/>}
            />
            <BottomNavigationItem
                onClick={() => navigate("/options")}
                selected={location.pathname === "/options"}
                label={"Oprions"}
                Icon={<Menu/>}
            />
        </Stack>
    )
}

export const BottomNavigationItem = ({onClick, selected, label, Icon}) => {

    return (
        <Stack alignItems={"center"} spacing={-1}>
            <IconButton size={"large"} onClick={onClick} sx={{color: selected ? "orange" : "#49454F"}}>
                {Icon}
            </IconButton>
            <Typography fontSize={12}>{label}</Typography>
        </Stack>
    )
}