import {Stack, Box} from "@mui/material";
import {BottomNavigation} from "../components/BottomNavigation";
import {AppBar} from "../components/AppBar";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Home} from "../pages/home/Home";
import {setPageLabel} from "../services/slice/app/appSlice";

export const AppLayout = ({children}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        switch (location.pathname) {
            case "/home":
                dispatch(setPageLabel("TimeIsMoney"));
                break;
            case "/options":
                dispatch(setPageLabel("Nastavení"));
                break;
            default:
                dispatch(setPageLabel("Default"));
        }
    }, [location.pathname]);

    return (
        <Stack height="100vh">
            <AppBar/>
            <Box padding={2} sx={{flexGrow: 1, overflow: "auto"}}>{children}</Box>
            <BottomNavigation/>
        </Stack>
    );
};