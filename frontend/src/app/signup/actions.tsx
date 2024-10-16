'use server'

import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'

export async function handleRegister(formData: FormData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const role = formData.get('role')

    const token = getCookieClient()

    if (name === '' || email === '' || password === '' || role === '') return

    try {
        await api.post('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            name: name,
            email: email,
            password: password,
            role: role
        })
    } catch (error) {
        console.error('Error during registration:', error)
    }

    redirect('/')
}
