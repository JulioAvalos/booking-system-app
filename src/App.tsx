import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./utils/theme";
import Navigation from "./routes/Navigation";
import {AuthProvider} from "./context/AuthProvider";
import AlertModal from "./components/layout/AlertModal";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Navigation/>
                <AlertModal />
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
