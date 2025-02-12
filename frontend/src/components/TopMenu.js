import {Avatar, IconButton, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {useSelector} from "react-redux";

export const TopMenu = () => {
    const navigate = useNavigate();
    const pageLabel = useSelector(state => state.app.pageLabel)

    return (
        <Stack px={2} pt={2} borderBottom={"1px solid lightgray"}>
            <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"h5"}>{pageLabel}</Typography>

                <Stack direction={"row"}>
                    <IconButton onClick={() => navigate("/login")}>
                        <LogoutIcon/>
                    </IconButton>
                    <IconButton onClick={() => navigate("/profile")}>
                        <Avatar sx={{width: 32, height: 32}}/>
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    )
}