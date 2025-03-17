// app/lib/auth.ts
import { UserData } from '@/type';
import { fetchAPI } from './api';

export const registerUser = async function ( userData : UserData) {
    const response = await fetch(`/register`, {
      method: 'POST',
      body: JSON.stringify(userData),   
    });
}


export async function logoutUser(): Promise<void> {
  await fetchAPI('/logout', {
    method: 'POST',
    credentials: 'include',
  });
}