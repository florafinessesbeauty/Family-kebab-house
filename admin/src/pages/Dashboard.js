import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MenuItemsList from '../components/MenuItemsList';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import { Plus, LogOut, RefreshCw, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAddItem = async (itemData) => {
    try {
      const response = await axios.post('/api/menu', itemData);
      setMenuItems([...menuItems, response.data]);
      setShowAddModal(false);
      toast.success('Menu item added successfully!');
    } catch (error) {
      toast.error('Failed to add menu item');
      console.error('Error adding menu item:', error);
    }
  };

  const handleUpdateItem = async (id, itemData) => {
    try {
      const response = await axios.put(`/api/menu/${id}`, itemData);
      setMenuItems(menuItems.map(item => 
        item.id === id ? response.data : item
      ));
      setEditItem(null);
      toast.success('Menu item updated successfully!');
    } catch (error) {
      toast.error('Failed to update menu item');
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      await axios.delete(`/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast.success('Menu item deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete menu item');
      console.error('Error deleting menu item:', error);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}>
        <div className="container">
          <div className="flex-between">
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>
                Kebab Shop Admin
              </h1>
              <p className="text-gray-600 text-sm">
                Manage your menu items and categories
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={fetchMenuItems}
                className="btn btn-secondary btn-sm"
                disabled={loading}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
              
              <div className="flex gap-2" style={{ alignItems: 'center' }}>
                <User size={16} />
                <span className="text-sm font-medium">{user?.username}</span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ padding: '2rem 1rem' }}>
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: '600', color: '#3b82f6' }}>
                {menuItems.length}
              </div>
              <div className="text-gray-600 text-sm">Total Items</div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: '600', color: '#10b981' }}>
                {Object.keys(groupedItems).length}
              </div>
              <div className="text-gray-600 text-sm">Categories</div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '2rem', fontWeight: '600', color: '#f59e0b' }}>
                {menuItems.filter(item => item.isSpecial).length}
              </div>
              <div className="text-gray-600 text-sm">Special Items</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex-between mb-6">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            Menu Items Management
          </h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            Add New Item
          </button>
        </div>

        {/* Menu Items List */}
        {loading ? (
          <div className="flex-center" style={{ padding: '4rem' }}>
            <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
          </div>
        ) : (
          <MenuItemsList 
            menuItems={menuItems}
            onEdit={setEditItem}
            onDelete={handleDeleteItem}
          />
        )}
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddItemModal 
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
        />
      )}
      
      {editItem && (
        <EditItemModal 
          item={editItem}
          onClose={() => setEditItem(null)}
          onSubmit={handleUpdateItem}
        />
      )}
    </div>
  );
};

export default Dashboard;