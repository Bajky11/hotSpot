import {Box, Stack} from "@mui/material";

export const ScoreBar = ({score, color}) => {
    const height = 10
    const percentage = calculatePercentage(score, 100)

    function calculatePercentage(part, whole) {
        if (whole === 0) {
            console.error("Cannot divide by zero");
            return 0;
        }

        let percentage = (part / whole) * 100;

        percentage = Math.max(0, Math.min(percentage, 100));

        return percentage;
    }

    return (
        <Stack sx={{width: "100%", height: {height}}}
               justifyContent="center"
               alignItems="flex-start"
               border={"1px solid black"}
               borderRadius={2}
        >
            <Box sx={{
                width: `${percentage}%`,
                backgroundColor: color,
                height: '50px',
                borderRadius: 1.5
            }}/>
        </Stack>
    )
}