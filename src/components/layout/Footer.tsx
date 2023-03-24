import {Box, Container, Grid, Typography} from "@mui/material";

export default function Footer() {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Typography
                variant="subtitle2"
                sx={{
                    color: '#7B7B7B',
                    fontWeight: 'normal'
                }}
            >
                BANCO CUSCATLAN {new Date().getFullYear()}
            </Typography>
        </Box>
    )
}
