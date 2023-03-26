import {
    Autocomplete,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {AiOutlinePlus} from "react-icons/ai";
import {FaFilter, FaSearch} from "react-icons/all";
import RoomTable from "./RoomTable";

const levelList = [
    {
        id: 1,
        name: "Nivel 1",
        buildingId: 1,
        createdAt: "2023-03-24T07:40:32.761Z",
        createdBy: "admin",
        updatedAt: null,
        updatedBy: null
    },
    {
        id: 2,
        name: "Nivel 2",
        buildingId: 1,
        createdAt: "2023-03-24T07:40:32.761Z",
        createdBy: "admin",
        updatedAt: null,
        updatedBy: null
    }
];

const statusList = [
    {
        id: 1,
        name: 'Activo',
        value: 'active'
    },
    {
        id: 2,
        name: 'Inactivo',
        value: 'inactive'
    },
    {
        id: 3,
        name: 'Ocupado',
        value: 'busy'
    },
]

export default function RoomPage() {

    // filtros: buscar por nombre, activos, inactivos, nivel, paginacion,

    return (
        <Container sx={{mt: 5}}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography variant="h4" sx={{fontWeight: 500, color: "#01426A"}}>
                        Salas
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        component={RouterLink}
                        to="/room/create"
                        sx={{fontWeight: 600}}
                        startIcon={<AiOutlinePlus color="#01426A"/>}
                    >
                        Nuevo
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        options={levelList}
                        onChange={(event, value) => {
                            // setFieldValue('level', value);
                            // lookUpRoomsByLevel(value);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Nivel"
                                    id="level"
                                    name="level"
                                    size="small"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaFilter color="#01426A"/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        options={statusList}
                        onChange={(event, value) => {
                            // setFieldValue('level', value);
                            // lookUpRoomsByLevel(value);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Estado"
                                    id="status"
                                    name="status"
                                    size="small"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FaFilter color="#01426A"/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small" color="secondary">
                                        <FaSearch color="#01426A" size="15"/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RoomTable/>
                </Grid>
            </Grid>
        </Container>
    );
}
