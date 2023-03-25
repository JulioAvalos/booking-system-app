import {CircularProgress, Container, Typography} from "@mui/material";

export function Loading() {
    return (
        <Container
            component="main"
            maxWidth="xl"
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2
            }}
        >
            <Typography variant="h3" gutterBottom>
                Espere un momento...
            </Typography>
            <CircularProgress size={100}/>
        </Container>
    );
}
