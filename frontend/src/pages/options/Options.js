import {Divider, Stack, Typography} from "@mui/material";
import {Money, Payments} from "@mui/icons-material";

export const Options = () => {
    return (
        <Stack spacing={2}>
            <Divider/>
            <MenuItem/>
            <Divider/>
        </Stack>
    )
}

function MenuItem() {
    return (
        <Stack direction="row" justifyContent={"space-between"} alignItems={"center"} p={1}>
            <Stack spacing={2} direction="row" >
                <Payments/>
                <Typography>Hodinový plat</Typography>
            </Stack>
            <Typography>450 Kč</Typography>
        </Stack>
    )
}