import React, { useState } from 'react';
import { Edit, Trash2, Star, DollarSign } from 'lucide-react';

const MenuItemsList = ({ menuItems, onEdit, onDelete }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = ['all', ...Object.keys(groupedItems).sort()];
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : groupedItems[selectedCategory] || [];

  const formatPrice = (price) => {
    return price ? `£${parseFloat(price).toFixed(2)}` : null;
  };

  const getPrices = (item) => {
    const prices = [];
    if (item.singlePrice) prices.push({ label: 'Single', price: item.singlePrice });
    if (item.priceSmall) prices.push({ label: 'Small', price: item.priceSmall });
    if (item.priceMedium) prices.push({ label: 'Medium', price: item.priceMedium });
    if (item.priceLarge) prices.push({ label: 'Large', price: item.priceLarge });
    if (item.priceXLarge) prices.push({ label: 'X-Large', price: item.priceXLarge });
    return prices;
  };

  if (menuItems.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center" style={{ padding: '4rem' }}>
          <DollarSign size={48} style={{ color: '#9ca3af', margin: '0 auto 1rem' }} />
          <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>No Menu Items</h3>
          <p className="text-gray-500">
            Start by adding your first menu item using the "Add New Item" button.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${
                  selectedCategory === category ? 'btn-primary' : 'btn-secondary'
                }`}
                style={{ textTransform: 'capitalize' }}
              >
                {category === 'all' ? 'All Categories' : category}
                {category !== 'all' && (
                  <span style={{ 
                    marginLeft: '0.25rem', 
                    background: 'rgba(255,255,255,0.2)', 
                    padding: '0.125rem 0.375rem', 
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem'
                  }}>
                    {groupedItems[category]?.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '1rem' 
      }}>
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`menu-item-card card ${item.isSpecial ? 'special-item' : ''}`}
          >
            <div className="card-body">
              {/* Header */}
              <div className="flex-between mb-2">
                <div className="flex gap-2" style={{ alignItems: 'center' }}>
                  {item.logoEmoji && (
                    <span style={{ fontSize: '1.5rem' }}>{item.logoEmoji}</span>
                  )}
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>
                    {item.name}
                  </h3>
                  {item.isSpecial && (
                    <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                  )}
                </div>
                
                <div className="flex gap-1">
                  <button 
                    onClick={() => onEdit(item)}
                    className="btn btn-secondary btn-sm"
                    title="Edit item"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger btn-sm"
                    title="Delete item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Category */}
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ 
                  background: '#e5e7eb', 
                  color: '#374151', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {item.category}
                </span>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-600 text-sm" style={{ marginBottom: '0.75rem' }}>
                  {item.description}
                </p>
              )}

              {/* Prices */}
              <div className="price-grid">
                {getPrices(item).map(({ label, price }) => (
                  <div key={label} className="price-item">
                    <div style={{ fontWeight: '500' }}>{label}</div>
                    <div style={{ color: '#059669', fontWeight: '600' }}>
                      {formatPrice(price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Timestamps */}
              <div style={{ 
                marginTop: '0.75rem', 
                paddingTop: '0.75rem', 
                borderTop: '1px solid #e5e7eb' 
              }}>
                <div className="text-xs text-gray-500">
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                  {item.updatedAt !== item.createdAt && (
                    <span style={{ marginLeft: '0.5rem' }}>
                      Updated: {new Date(item.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && selectedCategory !== 'all' && (
        <div className="card">
          <div className="card-body text-center" style={{ padding: '3rem' }}>
            <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
              No items in "{selectedCategory}" category
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or add new items to this category.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItemsList;