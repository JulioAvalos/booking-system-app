import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {FaEdit, FaTrashAlt} from "react-icons/all";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const roomList = [
    {
        id: 1,
        name: 'Suchitoto 1',
        level: 'Primer nivel',
        capacity: 12,
        photoUrl: 'https://example.com/suchitoto.jpg',
        status: 'Inactiva'
    },
    {
        id: 2,
        name: 'Tazumal 1',
        level: 'Primer nivel',
        capacity: 8,
        photoUrl: 'https://example.com/tazumal.jpg',
        status: 'Ocupada'
    },
    {
        id: 3,
        name: 'Joya de Cerén 1',
        level: 'Primer nivel',
        capacity: 6,
        photoUrl: 'https://example.com/joya-de-ceren.jpg',
        status: 'Activa'
    }
];

export default function RoomTable() {

    const handleChangePage = () => {

    }

    const rowsPerPage = () => {

    }

    const handleChangeRowsPerPage = () => {}

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{color: '#9FA2B4'}}>#</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Nombre</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Nivel</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Capacidad</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Estado</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roomList.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.level}</TableCell>
                                <TableCell align="right">{row.capacity}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Grid container spacing={1} justifyContent="end">
                                        <Grid item>
                                            <IconButton size="small">
                                                <FaEdit color="#01426A"/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="small">
                                                <FaTrashAlt color="#01426A"/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={100}
                page={1}
                onPageChange={handleChangePage}
                rowsPerPage={10}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return '' + from + '-' + to + ' de ' + count
                    }
                }
            />
        </>

    );
}