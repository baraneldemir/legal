import sendRequest from './send-request.js';

const BASE_URL = `${process.env.REACT_APP_USERS_URL}`

// Refactored code below
export async function signUp(userData) {
  const response = await sendRequest(BASE_URL, 'POST', userData); // Send request to backend
  console.log('Backend response:', response);
  const { token, user } = response; // Destructure token and user from backend response
  localStorage.setItem('token', token); // Store token in localStorage
  return user;  // Return user data (this is what you're expecting to use later)
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}