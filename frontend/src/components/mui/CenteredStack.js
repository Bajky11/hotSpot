import {Stack} from "@mui/material";
import React from "react";

const CenteredStack = ({children}) => {
    return <Stack alignItems={"center"} justifyContent={"center"}>{children}</Stack>
}
export default CenteredStack;