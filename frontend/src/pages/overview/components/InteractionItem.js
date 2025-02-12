import {IconButton, Stack, Typography} from "@mui/material";

export const InteractionItem = ({icon: IconComponent, label, onClick}) => {

    return (
        <Stack alignItems="center" spacing={1} onClick={onClick}>
            <IconButton sx={{backgroundColor: "#efefef"}} /*onClick={handleIncreaseScore} */>
                <IconComponent fontSize="large"/>
            </IconButton>
            <Typography>{label}</Typography>
        </Stack>
    );
};