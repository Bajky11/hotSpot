import {IconButton, Stack} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {useNavigate} from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <Stack borderTop={"1px solid lightgray"} direction={"row"} justifyContent={"space-evenly"} p={0.5}>
            <IconButton onClick={() => navigate("/overview")}>
                <FormatListBulletedIcon/>
            </IconButton>
            <IconButton onClick={() => navigate("/addFriend")}>
                <PersonAddIcon/>
            </IconButton>
        </Stack>
    )
}