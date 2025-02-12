import {Avatar, IconButton, Stack, Typography} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import {ScoreBar} from "./ScoreBar";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDeleteFriendMutation} from "../../../services/api/friends/friendsApi";

export const FriendComponent = ({friend, onClick}) => {
    const [deleteFriend] = useDeleteFriendMutation();

    const handleDeleteFriend = async (event) => {
        event.stopPropagation();

        try {
            await deleteFriend(friend.id).unwrap();
        } catch (error) {
            console.error("Failed to remove firned:", error);
        }
    };

    return (
        <Stack p={2} pt={2.5} pb={2.5} spacing={2} direction={"row"} alignItems={"center"}
               borderBottom={"1px solid lightgray"}
               onClick={onClick}
        >
            <Avatar/>

            <Stack flex={1} spacing={0.5}>

                <Stack direction="row" justifyContent="space-between">
                    <Typography>{friend.name} </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CakeIcon fontSize={"small"} sx={{color: "gray"}}/>
                        <Typography sx={{color: "gray"}}>{friend.birthday}</Typography>
                    </Stack>

                </Stack>
                <ScoreBar score={friend.score} color="cornflowerblue"/>
                {friend.loveScore && <ScoreBar score={friend.loveScore} color="pink"/>}
            </Stack>

            <IconButton sx={{backgroundColor: "#efefef"}} onClick={handleDeleteFriend}>
                <DeleteOutlineIcon/>
            </IconButton>
        </Stack>
    )
}