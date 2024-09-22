import {styled} from "@mui/system";
import {Typography} from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
    fontFamily: '"Orbitron", sans-serif',
    color: '#fff',
    fontSize: '2rem',
    letterSpacing: '0.1rem',
    textTransform: 'uppercase',
    marginBottom: '1rem',
}));


export default Title;