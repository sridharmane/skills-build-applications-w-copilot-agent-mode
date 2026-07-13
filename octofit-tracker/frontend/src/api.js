const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : "http://localhost:8000/api";

export async function fetchCollection(endpoint, responseKey) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload, responseKey);
}

function normalizeCollection(payload, responseKey) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const keyed = payload?.[responseKey];
  if (Array.isArray(keyed)) {
    return keyed;
  }

  if (Array.isArray(keyed?.results)) {
    return keyed.results;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}
