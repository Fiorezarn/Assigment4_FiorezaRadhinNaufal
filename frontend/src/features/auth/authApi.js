const BASE_API = import.meta.env.VITE_BASE_URL_BE;

async function fetchLogin({ username, password }) {
  const response = await fetch(`${BASE_API}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
}

async function fetchRegister({ fullname, username, email, password }) {
  const response = await fetch(`${BASE_API}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ fullname, username, email, password }),
  });
  return await response.json();
}

export { fetchLogin, fetchRegister };
