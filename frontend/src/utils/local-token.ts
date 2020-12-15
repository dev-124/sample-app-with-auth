export const isBrowser = (): boolean => typeof window !== 'undefined'

export const getLocalToken = (): string | null => {
  if (!isBrowser()) throw new Error('error - browser window not found')
  return localStorage.getItem('token')
}

export const saveLocalToken = (token: string): void =>
  localStorage.setItem('token', token)

export const removeLocalToken = (): void => localStorage.removeItem('token')
