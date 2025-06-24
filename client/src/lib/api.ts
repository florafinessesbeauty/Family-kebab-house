// API configuration for Family Kebab House
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com'  // Update this for production
  : 'http://localhost:5001';

export const API_ENDPOINTS = {
  MENU: `${API_BASE_URL}/api/menu`,
  HEALTH: `${API_BASE_URL}/health`
};

// Enhanced fetch with error handling
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
  
  return res;
}

// Menu API functions
export async function fetchMenuItems() {
  const response = await fetch(API_ENDPOINTS.MENU);
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
}

export async function checkServerHealth() {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH);
    return response.ok;
  } catch {
    return false;
  }
}