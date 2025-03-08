import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./services/store";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Options} from "./pages/options/Options";
import {Home} from "./pages/home/Home";
import {AppLayout} from "./layouts/AppLayout";
import "@fontsource/inter";
import "@fontsource/inter/300.css"; // Lehký font
import "@fontsource/inter/400.css"; // Normální font
import "@fontsource/inter/700.css";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "'Inter', sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightBold: 700,
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(215, 215, 215, 0.5)", // Výchozí barva
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(215, 215, 215, 0.8)", // Barva při hoveru
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(215, 215, 215, 1)", // Barva při fokusu
                    }
                }
            }
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Provider store={store}>
                    <BrowserRouter basename="/timeIsMoney">
                        <AppLayout>
                            <Routes>
                                <Route path="/home" element={<Home/>}/>
                                <Route path="/options" element={<Options/>}/>
                                <Route path="*" element={<Navigate to="/home"/>}/>
                            </Routes>
                        </AppLayout>
                    </BrowserRouter>
                </Provider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;