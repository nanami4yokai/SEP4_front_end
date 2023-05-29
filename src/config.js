const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://terrasense-service-dot-terrasense.ew.r.appspot.com/';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/public/login`,
  register: `${API_BASE_URL}/public/register`,
  terrariums: `${API_BASE_URL}/terrarium/all`,
  delete:`${API_BASE_URL}/terrarium/delete`,
  create: `${API_BASE_URL}/terrarium/create`,
};
