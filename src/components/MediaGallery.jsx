import React, { useState, useEffect } from 'react';

const MediaGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedMedia, setLikedMedia] = useState(new Set());

  const mediaItems = [
    { type: 'image', src: '/media/IMG-20250729-WA0000.jpg', caption: 'Nasa prekrasna uspomena' },
    { type: 'image', src: '/media/IMG-20250729-WA0001.jpg', caption: 'Ti si moja radost' },
    { type: 'image', src: '/media/IMG-20250729-WA0002.jpg', caption: 'Svaki trenutak s tobom je carolija' },
    { type: 'image', src: '/media/IMG-20250729-WA0003.jpg', caption: 'Moje srce kuca samo za tebe' },
    { type: 'image', src: '/media/IMG-20250729-WA0004.jpg', caption: 'Ti si moj svijet' },
    { type: 'video', src: '/media/VID-20250729-WA0033.mp4', caption: 'Nas posebni trenutak' }
  ];

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedMedia');
    if (savedLikes) setLikedMedia(new Set(JSON.parse(savedLikes)));
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  const goToSlide = (index) => setCurrentSlide(index);

  const toggleLike = (index) => {
    const newLikedMedia = new Set(likedMedia);
    if (newLikedMedia.has(index)) {
      newLikedMedia.delete(index);
    } else {
      newLikedMedia.add(index);
    }
    setLikedMedia(newLikedMedia);
    localStorage.setItem('likedMedia', JSON.stringify(Array.from(newLikedMedia)));
  };

  return (
    <div className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-slideshow">
          {mediaItems.map((item, index) => (
            <div key={index} className={`gallery-slide ${index === currentSlide ? 'active' : ''}`}>
              {item.type === 'image' ? <img src={item.src} alt={item.caption} /> : <video src={item.src} controls muted />}
            </div>
          ))}
        </div>
        <div className="gallery-controls">
          <button className="gallery-nav" onClick={prevSlide}></button>
          <div className="gallery-dots">
            {mediaItems.map((_, index) => (
              <button key={index} className={`gallery-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)} />
            ))}
          </div>
          <button className="gallery-nav" onClick={nextSlide}></button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          <button className={`heart-like ${likedMedia.has(currentSlide) ? 'liked' : ''}`} onClick={() => toggleLike(currentSlide)}>
            {likedMedia.has(currentSlide) ? '' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;
