import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Easy to grow and maintain.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming aroma.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-66e2554f2a43", description: "Sweet fragrance.", cost: "$18" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#2e7d32', color: 'white' }}>
        <h2>Paradise Nursery</h2>
        <button onClick={() => setShowCart(!showCart)} style={{ cursor: 'pointer' }}>
          🛒 Cart ({totalQuantity})
        </button>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                {categoryObj.plants.map((plant, pIndex) => {
                  const isInCart = cartItems.some((item) => item.name === plant.name);
                  return (
                    <div key={pIndex} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                      <img src={plant.image} alt={plant.name} style={{ width: '150px', height: '150px' }} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p><strong>{plant.cost}</strong></p>
                      <button onClick={() => handleAddToCart(plant)} disabled={isInCart}>
                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
