import React from "react";
import {Stack, TextField, Button, Card, Alert} from "@mui/material";
import useForm from "../../hooks/useForm";
import {useRegisterMutation} from "../../services/api/auth/authApi";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../services/slice/auth/authSlice";

const Register = () => {
    const {formData, handleChange} = useForm({username: "", email: "", password: "", repeatPassword: ""});
    const [register, {isLoading, error}] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await register(formData).unwrap();
            dispatch(setUser(user));
            navigate("/overview");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (<Stack spacing={2} maxWidth={500} component={Card} p={1}>
        <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
        />
        <TextField
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            value={formData.repeatPassword}
            onChange={handleChange}
        />
        {error && <Alert severity="error">{error?.data}</Alert>}
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
            Register
        </Button>
    </Stack>);
};

export default Register;