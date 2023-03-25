import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./utils/theme";
import Navigation from "./routes/Navigation";
import {AuthProvider} from "./context/AuthProvider";
import AlertModal from "./components/layout/AlertModal";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {es} from 'date-fns/locale';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                    <CssBaseline/>
                    <Navigation/>
                    <AlertModal/>
                </LocalizationProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
