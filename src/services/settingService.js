import { GEMINI_API_URL } from '@/utils/constants';
import axios from 'axios';

export function getSettings() {
  return JSON.parse(localStorage.getItem('settings'));
}

export async function updateSettings({ values, onSuccess }) {
  try {
    const apiKey = values.apiKey;

    const { data } = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, {
      contents: [{
        parts: [{ text: 'This is just test prompt. Replay with "Ay ay captain!".' }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    localStorage.setItem('settings', JSON.stringify({
      apiKey,
      modelVersion: data.modelVersion
    }));

    onSuccess()
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to update settings.');
  }
}