import { useState, useCallback } from "react";

export const useModal = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);

    const handleOpen = useCallback((modalData = null) => {
        setData(modalData);
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setData(null);
        setOpen(false);
    }, []);

    return { open, data, handleOpen, handleClose };
};

export default useModal;