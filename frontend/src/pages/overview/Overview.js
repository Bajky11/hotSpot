import { useGetFriendsQuery } from "../../services/api/friends/friendsApi";
import {useDispatch, useSelector} from "react-redux";
import { Box, Stack } from "@mui/material";
import {useEffect, useState} from "react";
import { FriendComponent } from "./components/FriendComponent";
import { InteractionModal } from "./components/InteractionModal";
import {setPageLabel} from "../../services/slice/app/appSlice";

const Overview = () => {
    const userId = useSelector((state) => state.auth.user.id);
    const { data: friends, error, isLoading } = useGetFriendsQuery(userId);
    const [modal, setModal] = useState({ open: false, data: null });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageLabel("Lidé"))
    }, [])

    const closeModal = () => {
        setModal({ open: false, data: null });
    };

    const openModal = (data) => {
        setModal({ open: true, data });
    };

    if (isLoading) return <p>Načítání...</p>;
    if (error) return <p>Chyba při načítání přátel</p>;

    return (
        <div>
            <Stack spacing={2}>
                {friends && friends.length > 0 ? (
                    friends.map((friend) => (
                        <Box key={friend.id}>
                            <FriendComponent friend={friend} onClick={() => openModal(friend)} />
                        </Box>
                    ))
                ) : (
                    <p>Žádní přátelé k zobrazení.</p>
                )}
            </Stack>

            <InteractionModal modal={modal} onClose={closeModal} />
        </div>
    );
};

export default Overview;