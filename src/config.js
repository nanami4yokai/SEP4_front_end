const API_BASE_URL = 'https://terrasense-service-dot-terrasense.ew.r.appspot.com/';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/public/login`,
  register: `${API_BASE_URL}/public/register`,
  terrariums: `${API_BASE_URL}/terrarium/all`,
  delete:`${API_BASE_URL}/terrarium/delete`,
  create: `${API_BASE_URL}/terrarium/create`,
  limits:`${API_BASE_URL}/terrarium/limits`,
  reading:`${API_BASE_URL}/reading/?start=2020-01-01%2000:00:00&end=2024-01-01%2000:00:00`,
  alert: `${API_BASE_URL}/alert`
};
