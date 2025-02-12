import {Stack, Typography} from "@mui/material";
import React from "react";

const TypographyWithDescription = ({label, description}) => {
    return (
        <Stack>
            <Typography>{label}</Typography>
            <Typography variant={"body2"} color="textSecondary">{description}</Typography>
        </Stack>
    )
}

export default TypographyWithDescription;