import {createTheme, Theme, ThemeOptions} from '@mui/material';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: "light",
        primary: {
            main: '#185A7D'
        },
        secondary: {
            main: '#FFC600'
        }
    },
    typography: {
        fontFamily: `'Montserrat' sans-serif`,
        fontSize: 14,
        button: {
            fontWeight: 500,
            textTransform: 'none'
        }
    }
}

export const theme: Theme = createTheme({
    ...themeOptions,
    components: {
        MuiIconButton: {
            styleOverrides: {
                colorSecondary: {
                    backgroundColor: '#FFC600',
                    '&:hover': {
                        backgroundColor: '#FFC600'
                    }
                }
            }
        }
    }
});

export default theme;
