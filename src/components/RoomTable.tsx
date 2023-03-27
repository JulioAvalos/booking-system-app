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
import {FaEdit} from "react-icons/all";
import {Link as RouterLink} from "react-router-dom";
interface Room {
    id: number;
    name: string;
    level: string;
    capacity: number;
    photoUrl: string;
    status: string;
}

interface IRoomTableProps {
    list: Room[];
}

export default function RoomTable({list}: IRoomTableProps) {

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {

    }

    const rowsPerPage = () => {

    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color: '#9FA2B4'}}>#</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Nombre</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Nivel</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Capacidad</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Estado</TableCell>
                            <TableCell align="right" sx={{color: '#9FA2B4'}}>Acción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
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
                                            <IconButton
                                                size="small"
                                                component={RouterLink}
                                                to={`/room/${row.id}`}
                                            >
                                                <FaEdit color="#01426A"/>
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
                    ({from, to, count}) => {
                        return '' + from + '-' + to + ' de ' + count
                    }
                }
            />
        </>

    );
}
