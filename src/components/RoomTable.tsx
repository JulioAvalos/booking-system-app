import {
    Grid,
    IconButton, Pagination,
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
    roomId: number;
    name: string;
    levelName: string;
    capacity: number;
    photoUrl: string;
    status: string;
}

interface IRoomTableProps {
    list: Room[];
    pagination: any;
    loading: boolean;
    handleChangePage: (event: any, value: number) => void;
    page: number;
}

export default function RoomTable({list, pagination, loading, handleChangePage, page}: IRoomTableProps) {

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
                                key={row.roomId}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.roomId}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.levelName}</TableCell>
                                <TableCell align="right">{row.capacity}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Grid container spacing={1} justifyContent="end">
                                        <Grid item>
                                            <IconButton
                                                size="small"
                                                component={RouterLink}
                                                to={`/room/${row.roomId}`}
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
            <Grid container justifyContent="center" alignItems="center" sx={{mt: 2}}>
                <Grid item>
                    <Pagination
                        size="small"
                        count={pagination ? pagination.totalPages : 0}
                        onChange={handleChangePage}
                        page={page}
                        showFirstButton
                        showLastButton
                        disabled={loading}
                    />
                </Grid>
            </Grid>
        </>

    );
}
