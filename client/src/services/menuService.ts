// Menu service for Family Kebab House
import { MenuItem } from "../../../shared/schema";

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com'  // Update this for production
  : 'http://localhost:5001';

export class MenuService {
  private static baseUrl = API_BASE_URL;

  static async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/menu`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch menu items: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Menu service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  static getApiUrl(): string {
    return this.baseUrl;
  }
}