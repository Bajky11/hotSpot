import {
    Alert, Button, Checkbox, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography,
} from "@mui/material";
import React, {useEffect} from "react";
import useForm from "../../hooks/useForm";
import {useNavigate} from "react-router-dom";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {useAddFriendMutation} from "../../services/api/friends/friendsApi";
import {useDispatch} from "react-redux";
import {setPageLabel} from "../../services/slice/app/appSlice";
import CenteredStack from "../../components/mui/CenteredStack";
import TypographyWithDescription from "../../components/mui/TypographyWithDescription";
import {texts} from "./constants";

export const AddFriend = () => {
    const [addFriend, {isLoading, error}] = useAddFriendMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {formData, handleChange} = useForm({
        name: "", birthday: "", relationshipPriority: "KEEP_IN_TOUCH", trackLoveScore: false,
    });

    useEffect(() => {
        dispatch(setPageLabel(texts.pageLabel));
    }, []);

    const handleDateChange = (newValue) => {
        handleChange({
            target: {
                name: "birthday", value: newValue ? dayjs(newValue).format("YYYY-MM-DD") : "",
            },
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addFriend(formData).unwrap();
            navigate("/overview");
        } catch (err) {
            console.error("Add friend error:", err);
        }
    };

    return (<CenteredStack>
        <Stack spacing={4} maxWidth={500} p={2}>
            <Section>
                <Typography variant="body1" color="textSecondary">
                    {texts.sections.basicInfo.title}
                </Typography>
                <TextField
                    label={texts.sections.basicInfo.nameLabel}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <DatePicker
                    label={texts.sections.basicInfo.birthdayLabel}
                    value={formData.birthday ? dayjs(formData.birthday) : null}
                    onChange={handleDateChange}
                    required
                />
            </Section>


            <Section>
                <Typography variant="body1" color="textSecondary">
                    {texts.sections.contactPriority.title}
                </Typography>
                <RadioGroup
                    name="relationshipPriority"
                    value={formData.relationshipPriority}
                    onChange={handleChange}
                    sx={{gap: "12px"}}
                >
                    <FormControlLabel
                        value="STAY_CLOSE"
                        control={<Radio/>}
                        label={<TypographyWithDescription
                            label={texts.sections.contactPriority.options.STAY_CLOSE.label}
                            description={texts.sections.contactPriority.options.STAY_CLOSE.description}
                        />}
                    />
                    <FormControlLabel
                        value="KEEP_IN_TOUCH"
                        control={<Radio/>}
                        label={<TypographyWithDescription
                            label={texts.sections.contactPriority.options.KEEP_IN_TOUCH.label}
                            description={texts.sections.contactPriority.options.KEEP_IN_TOUCH.description}
                        />}
                    />
                    <FormControlLabel
                        value="LET_IT_FLOW"
                        control={<Radio/>}
                        label={<TypographyWithDescription
                            label={texts.sections.contactPriority.options.LET_IT_FLOW.label}
                            description={texts.sections.contactPriority.options.LET_IT_FLOW.description}
                        />}
                    />
                </RadioGroup>
            </Section>

            <Section>
                <Typography variant="body1" color="textSecondary">
                    {texts.sections.loveScore.title}
                </Typography>
                <FormControlLabel
                    control={<Checkbox
                        name="trackLoveScore"
                        checked={formData.trackLoveScore}
                        onChange={(e) => handleChange({
                            target: {
                                name: "trackLoveScore", value: e.target.checked,
                            },
                        })}
                    />}
                    label={texts.sections.loveScore.checkboxLabel}
                />
            </Section>

            {error && <Alert severity="error">{texts.sections.error}</Alert>}
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                {texts.sections.button}
            </Button>
        </Stack>

    </CenteredStack>);
};

const Section = ({children}) => <Stack spacing={1}>{children}</Stack>;