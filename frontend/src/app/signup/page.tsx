'use client'

import React, { useState } from 'react'
import { handleRegister } from './actions'
import {
    Container,
    TextField,
    Link,
    Button,
    Box,
    Typography,
    MenuItem,
} from '@mui/material'
import { enqueueSnackbar } from 'notistack'

const SignupPage = () => {
    const [profile, setProfile] = useState('')

    const handleProfileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProfile(event.target.value)
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        await handleRegister(formData)
        enqueueSnackbar('Cadastro realizado com sucesso.', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
        })
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
                onSubmit={onSubmit}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Faça seu Cadastro
                </Typography>
                <TextField
                    name="name"
                    label="Nome"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                />
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
                <TextField
                    name="role"
                    label="Perfil"
                    select
                    value={profile}
                    onChange={handleProfileChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                >
                    <MenuItem value="gerente">Gerente</MenuItem>
                    <MenuItem value="funcionario">Funcionário</MenuItem>
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Cadastrar
                </Button>
                <Link href="/">
                    <Typography>Já possui cadastro? Faça seu login!</Typography>
                </Link>
            </Box>
        </Container>
    )
}

export default SignupPage
