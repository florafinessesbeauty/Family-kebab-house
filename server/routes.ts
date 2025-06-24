import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy API route to get all menu items from new backend
  app.get("/api/menu", async (_req, res) => {
    try {
      // Forward request to new backend API
      const response = await fetch('http://localhost:5001/api/menu');
      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }
      const menuItems = await response.json();
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items from backend API:", error);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  // Proxy API route to get menu items by category
  app.get("/api/menu/:category", async (req, res) => {
    try {
      const { category } = req.params;
      // Forward request to new backend API and filter by category
      const response = await fetch('http://localhost:5001/api/menu');
      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }
      const allMenuItems = await response.json();
      const menuItems = allMenuItems.filter((item: any) => item.category === category);
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items by category:", error);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
