import queryString from 'query-string';

/** Get data from our api */
export async function get(url: string, query: {}) {
  const response = await fetch(
    `${url}${query ? `?${queryString.stringify(query)}` : ''}`
  );
  return response.json();
}

/** Post data to our api */
export async function post(url: string, body: {}) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'content-type': 'application/json'},
  });
  return response.json();
}
