import { useState } from "react";

const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return { formData, handleChange };
};

export default useForm;