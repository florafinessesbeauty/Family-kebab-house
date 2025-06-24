import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

const EditItemModal = ({ item, onClose, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: item.name || '',
      logoEmoji: item.logoEmoji || '',
      description: item.description || '',
      category: item.category || '',
      isSpecial: item.isSpecial || false,
      singlePrice: item.singlePrice || '',
      priceSmall: item.priceSmall || '',
      priceMedium: item.priceMedium || '',
      priceLarge: item.priceLarge || '',
      priceXLarge: item.priceXLarge || ''
    }
  });

  const onFormSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Convert price strings to numbers, filtering out empty values
    const formattedData = {
      ...data,
      singlePrice: data.singlePrice ? parseFloat(data.singlePrice) : null,
      priceSmall: data.priceSmall ? parseFloat(data.priceSmall) : null,
      priceMedium: data.priceMedium ? parseFloat(data.priceMedium) : null,
      priceLarge: data.priceLarge ? parseFloat(data.priceLarge) : null,
      priceXLarge: data.priceXLarge ? parseFloat(data.priceXLarge) : null,
    };

    try {
      await onSubmit(item.id, formattedData);
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonCategories = [
    'kebabs', 'pizzas', 'burgers', 'chicken', 'sides', 'drinks', 
    'desserts', 'wraps', 'salads', 'specials'
  ];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="card-header">
          <div className="flex-between">
            <h2 className="card-title">Edit Menu Item</h2>
            <button 
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Basic Information */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Basic Information
              </h3>
              
              <div className="form-group">
                <label className="form-label">Item Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Doner Kebab"
                  {...register('name', { required: 'Item name is required' })}
                />
                {errors.name && (
                  <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Logo Emoji</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="🥙"
                  {...register('logoEmoji')}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Describe this menu item..."
                  {...register('description')}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  {commonCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        const input = document.querySelector('input[name="category"]');
                        input.value = cat;
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter category or select from above"
                  {...register('category', { required: 'Category is required' })}
                />
                {errors.category && (
                  <div className="text-red-600 text-sm mt-1">{errors.category.message}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label flex gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    {...register('isSpecial')}
                  />
                  Mark as Special Item
                </label>
              </div>
            </div>

            {/* Pricing */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                Pricing
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem' 
              }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Single Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="0.00"
                    {...register('singlePrice')}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Small Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="0.00"
                    {...register('priceSmall')}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Medium Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="0.00"
                    {...register('priceMedium')}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Large Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="0.00"
                    {...register('priceLarge')}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">X-Large Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="0.00"
                    {...register('priceXLarge')}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '0.5rem' }}>
                <p className="text-xs text-gray-500">
                  Note: At least one price must be specified for the item to be valid.
                </p>
              </div>
            </div>

            {/* Item Info */}
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem', 
              background: '#f3f4f6', 
              borderRadius: '0.5rem' 
            }}>
              <div className="text-xs text-gray-600">
                <div><strong>Item ID:</strong> {item.id}</div>
                <div><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</div>
                <div><strong>Last Updated:</strong> {new Date(item.updatedAt).toLocaleString()}</div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
              <button 
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;