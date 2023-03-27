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
import RoomTable from "../../components/RoomTable";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {levelList, roomList, statusList} from "../../utils/sampleData";
import {roomListByName} from "../../api/services/room";
import {Loading} from "../../components/layout/Loading";

export default function RoomPage() {

    const navigate = useNavigate();
    const {verifyLogin, user} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [roomList, setRoomList] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<any | null>(null);

    useEffect(() => {
        const result = verifyLogin();
        if (!result) {
            navigate('/login');
        } else if (result && result.role !== 'ADMIN') {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (user) {
            getRoomList();
        }
    }, [user]);


    const getRoomList = async () => {
        const resp = await roomListByName(searchText, page);
        setRoomList(resp.data.data.items);
        setPagination(resp.data.data.pagination);
        setLoading(false);
    }
    const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setLoading(true);
        setPage(value);
        const resp = await roomListByName(searchText, value);
        setRoomList(resp.data.data.items);
        setPagination(resp.data.data.pagination);
        setLoading(false);
    }

    if (loading) {
        return <Loading/>
    }

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
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton size="small" color="secondary" onClick={getRoomList}>
                                        <FaSearch color="#01426A" size="15"/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RoomTable
                        list={roomList}
                        page={page}
                        pagination={pagination}
                        loading={loading}
                        handleChangePage={handleChangePage}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
