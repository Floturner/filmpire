import axios from 'axios';
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../services';

const moviesApi = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const REQUEST_TOKEN_KEY = 'request_token';
export const SESSION_ID_KEY = 'session_id';

export async function fetchToken() {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem(REQUEST_TOKEN_KEY, token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    }
  } catch (err) {
    throw new Error('Invalid credentials.');
  }
}

export async function createSessionId() {
  const token = localStorage.getItem(REQUEST_TOKEN_KEY);

  if (token) {
    try {
      const {
        data: { session_id: sessionId },
      } = await moviesApi.post('/authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem(SESSION_ID_KEY, sessionId);
      return sessionId;
    } catch (err) {
      throw new Error('Invalid credentials.');
    }
  }

  return null;
}

export async function getUser(sessionId) {
  try {
    const { data: user } = await moviesApi.get(
      `/account?session_id=${sessionId}`
    );
    return user;
  } catch (err) {
    throw new Error('Session expired.');
  }
}

export function convertNumberToTime(num) {
  const hours = Math.floor(num / 60);
  let minutes = num % 60;
  if (minutes.toString().length < 2) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
