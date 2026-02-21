const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface AuthCredentials {
  email: string
  password: string
}

export async function login(credentials: AuthCredentials): Promise<void> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!res.ok) {
    throw new Error('Credenciales inválidas')
  }

  const data = await res.json()
  localStorage.setItem('token', data.access_token)
}

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function logout(): void {
  localStorage.removeItem('token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
