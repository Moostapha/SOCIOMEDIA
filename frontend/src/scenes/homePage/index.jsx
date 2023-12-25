import {Box} from '@mui/material';
import NavBar from 'scenes/navBar';
import UserAlert from "components/UserAlert";

const HomePage = () => {
    return (
        <Box>
            <NavBar/>
            <UserAlert/>
        </Box>
    )
}

export default HomePage