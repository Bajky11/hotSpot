import React, {useEffect} from "react";
import {Stack, TextField, Button, Card, Alert} from "@mui/material";
import useForm from "../../hooks/useForm";
import {useLoginMutation} from "../../services/api/auth/authApi";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../services/slice/auth/authSlice";
import {setPageLabel} from "../../services/slice/app/appSlice";

const Login = () => {
    const {formData, handleChange} = useForm({username: "", password: ""});
    const [login, {isLoading, error}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await login(formData).unwrap();
            dispatch(setUser(user));
            navigate("/overview");
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <Stack spacing={2} maxWidth={500} component={Card} p={1}>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            {error && <Alert severity="error">{error?.data}</Alert>}
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                Login
            </Button>
        </Stack>
    );
};

export default Login;