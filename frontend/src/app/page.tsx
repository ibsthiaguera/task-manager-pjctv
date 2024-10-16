import { api } from '@/services/api'
import {
    Box,
    Button,
    Container,
    Link,
    TextField,
    Typography,
} from '@mui/material'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const App = () => {
    async function handleLogin(formData: FormData) {
        'use server'
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const response = await api.post('/auth', {
                email,
                password,
            })

            if (!response.data.token) return

            const expireTime = 60 * 60 * 24 * 30 * 1000

            cookies().set('session', response.data.token, {
                maxAge: expireTime,
                path: '/',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
            })
        } catch (error) {
            console.log('error')
            console.log(error)
        }

        redirect('/dashboard')
    }

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box
                component="form"
                action={handleLogin}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h5">Task Manager</Typography>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                />
                <TextField
                    name="password"
                    label="Senha"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Entrar
                </Button>
                <Link href="/signup">
                    <Typography>Não possui uma conta? Cadastre-se!</Typography>
                </Link>

                <Box sx={{ margin: 2 }}>
                    <Typography variant="body1">Usuário Teste:</Typography>
                    <TextField
                        value="alice_alpha@example.com"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="body1">Senha:</Typography>
                    <TextField
                        value="123456"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        size="small"
                    />
                </Box>
            </Box>
        </Container>
    )
}

export default App
