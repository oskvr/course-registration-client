export const BASE_URL = "https://localhost:44314/api";

export const fetcher = (url, token) =>
  fetch(BASE_URL + url, {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
