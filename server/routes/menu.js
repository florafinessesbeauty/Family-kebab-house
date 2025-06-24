const express = require('express');
const MenuItem = require('../models/MenuItem');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// GET /api/menu - Public route to list all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.findAll({
      order: [['category', 'ASC'], ['name', 'ASC']]
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// POST /api/menu - Protected route to create new menu item
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      logoEmoji,
      description,
      category,
      isSpecial,
      singlePrice,
      priceSmall,
      priceMedium,
      priceLarge,
      priceXLarge
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const menuItem = await MenuItem.create({
      name,
      logoEmoji,
      description,
      category,
      isSpecial: isSpecial || false,
      singlePrice: singlePrice || null,
      priceSmall: priceSmall || null,
      priceMedium: priceMedium || null,
      priceLarge: priceLarge || null,
      priceXLarge: priceXLarge || null
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// PUT /api/menu/:id - Protected route to update menu item
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await menuItem.update(updateData);
    res.json(menuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// DELETE /api/menu/:id - Protected route to delete menu item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await menuItem.destroy();
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

module.exports = router;