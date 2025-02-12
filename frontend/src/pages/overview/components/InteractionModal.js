import {Dialog, Stack, Typography} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {InteractionItem} from "./InteractionItem";
import {useIncreaseScoreMutation} from "../../../services/api/friends/friendsApi";

export const InteractionModal = ({modal, onClose}) => {
    const [increaseScore, {isLoading, isError, data}] = useIncreaseScoreMutation();

    const handleIncreaseScore = async (points) => {
        try {
            const result = await increaseScore({friendId: modal.data?.id, points}).unwrap();
            onClose()
        } catch (error) {
            console.error("Failed to update score:", error);
        }
    };

    return (
        <Dialog open={modal.open} onClose={onClose} maxWidth="md">
            <Stack p={2} alignItems="center" justifyContent="center" spacing={2}>
                <Typography variant="h5">Interakce s {modal.data?.name}</Typography>
                <Stack p={1} direction="row" spacing={3}>
                    <InteractionItem icon={MessageIcon} label="Message" onClick={() => handleIncreaseScore(20)}/>
                    <InteractionItem icon={CallIcon} label="Call" onClick={() => handleIncreaseScore(30)}/>
                    <InteractionItem icon={VisibilityIcon} label="Hang Out" onClick={() => handleIncreaseScore(50)}/>
                </Stack>
            </Stack>
        </Dialog>
    );
};