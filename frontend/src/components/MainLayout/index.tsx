import { Box, Container, Toolbar } from '@mui/material'
import Header from '../Header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Box
                component="main"
                sx={{
                    backgroundColor: 'grey.100',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 1, mb: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    )
}

export default MainLayout
