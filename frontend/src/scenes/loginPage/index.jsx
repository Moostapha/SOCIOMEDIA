import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';


const LoginPage = () => {
    
    // Déclarations des constantes et usage des imports
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery('min-width: 1000px');
    
    return (
        <Box>
            {/* LOGO SOCIOPEDIA BOX*/}
                <Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
                    <Typography fontWeight="bold" color="primary" fontSize="32px)">
                        SOCIOPEDIA
                    </Typography>
                </Box>
            {/* FIN */}
            
            {/* FORM BOX*/}
                <Box width={ isNonMobileScreens ? '50%' : '90%'} 
                    p='2rem' m='2rem auto' 
                    borderRadius='1.5rem' 
                    backgroundColor={theme.palette.background.alt}
                    >
                    <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
                        Bienvenue à Sociopédia, le réseau social des sociopathes !!!
                    </Typography>
                    
                    {/* NOTRE CUSTOM FORM COMPONENT */}
                        <Form/>
                    {/* FIN */}
                    
                </Box>
            {/* FIN*/}
            
        </Box>
    );
}

export default LoginPage