import { getUser } from "./userService";

export function loginGuest({ name }) {
  try {
    if (getUser()) {
      throw new Error('User sudah ada. Tidak dapat menyimpan user baru.');
    }

    const id = new Date().getTime();
    const data = { id, name };

    localStorage.setItem('user', JSON.stringify(data));

    return true;
  } catch (error) {
    throw new Error(error.message || 'Terjadi kesalahan.');
  }
}