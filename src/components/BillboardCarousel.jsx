// src/components/BillboardCarousel.jsx
import React, { useState, useEffect } from 'react';
import { fetchBillboardsList } from '../src/api/billboardsApi';

export default function BillboardCarousel({ fullHeight = false }) {
  const [billboards, setBillboards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBillboards() {
      try {
        setLoading(true);
        const response = await fetchBillboardsList();
        const activeBillboards = (response.data || []).filter(b => b.is_active);
        setBillboards(activeBillboards);
      } catch (err) {
        console.error('Error loading billboards:', err);
        setError('Gagal memuat billboard');
      } finally {
        setLoading(false);
      }
    }
    loadBillboards();
  }, []);

  useEffect(() => {
    if (billboards.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % billboards.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [billboards.length]);

  if (loading || billboards.length === 0 || error) {
    return null;
  }

  const currentBillboard = billboards[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? billboards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % billboards.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const imageUrl = `http://localhost:5000${currentBillboard.image_url}`;

  return (
    <div className={`relative w-full ${fullHeight ? 'h-full' : 'h-96'} bg-gray-200 overflow-hidden`}>
      {/* Billboard Image */}
      <div className="relative w-full h-full">
        {currentBillboard.link ? (
          <a href={currentBillboard.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
            <img
              src={imageUrl}
              alt={currentBillboard.title}
              className="w-full h-full object-cover hover:opacity-90 transition duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Billboard';
              }}
            />
          </a>
        ) : (
          <img
            src={imageUrl}
            alt={currentBillboard.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Billboard';
            }}
          />
        )}
      </div>

      {/* Navigation Arrows (only show if multiple billboards) */}
      {billboards.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10"
            aria-label="Previous billboard"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10"
            aria-label="Next billboard"
          >
            &#10095;
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {billboards.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to billboard ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
