import {Avatar, IconButton, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {useSelector} from "react-redux";
import {MonetizationOnOutlined} from "@mui/icons-material";

export const AppBar = () => {
    const navigate = useNavigate();
    const pageLabel = useSelector(state => state.app.pageLabel)

    return (
        <Stack px={2} pt={2}>
            <Stack direction="row" justifyContent={"space-between"} alignItems={"center"}>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <MonetizationOnOutlined sx={{color: "orange"}}/>
                    <Typography variant={"h5"}>{pageLabel}</Typography>
                </Stack>

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