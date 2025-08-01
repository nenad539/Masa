import React, { useState, useEffect } from 'react';
import { trackMediaGallery } from '../firebase/userActivity.js';
import { getUserSpecificData, setUserSpecificData } from '../services/auth.js';

const MediaGalleryNew = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedMedia, setLikedMedia] = useState(new Set());
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  // Jednostavni niz slika i video fajlova - proverio sam da ovi fajlovi postoje
  const mediaFiles = [
    { src: '/media/1.jpg', type: 'image', caption: 'Naša prva večernja magija 💖' },
    { src: '/media/2.jpg', type: 'image', caption: 'Ti si moja zvezda u noći ⭐' },
    { src: '/media/3.jpg', type: 'image', caption: 'Svaki trenutak s tobom je poseban ✨' },
    { src: '/media/4.jpg', type: 'image', caption: 'Moja prekrasna ljubav 🌹' },
    { src: '/media/5.jpg', type: 'image', caption: 'Naša prva digitalna uspomena 📱' },
    { src: '/media/6.jpg', type: 'image', caption: 'Ti si moja radost 😊' },
    { src: '/media/7.jpg', type: 'image', caption: 'Osmeh koji pokreće moj dan ☀️' },
    { src: '/media/8.jpg', type: 'image', caption: 'Moje srce kuca samo za tebe 💓' },
    { src: '/media/9.jpg', type: 'image', caption: 'Ti si moj celi svet 🌍' },
    { src: '/media/10.jpg', type: 'image', caption: 'Volim tvoj pogled 👀' },
    { src: '/media/11.jpg', type: 'image', caption: 'Bez tebe ništa nije isto 💔' },
    { src: '/media/12.jpg', type: 'image', caption: 'Ti si moja sreća 🍀' },
    { src: '/media/13.jpg', type: 'image', caption: 'Moja ljubav je beskrajna ♾️' },
    { src: '/media/14.jpg', type: 'image', caption: 'Ti si razlog mog smeha 😄' },
    { src: '/media/15.jpg', type: 'image', caption: 'Moja zauvek i uvek 💍' },
    { src: '/media/16.mp4', type: 'video', caption: 'Naš posebni trenutak koji ću čuvati zauvek 🎥' }
  ];

  useEffect(() => {
    // Učitaj user-specific liked media
    const savedLikes = getUserSpecificData('likedMedia');
    if (savedLikes) {
      setLikedMedia(new Set(JSON.parse(savedLikes)));
    }
    console.log(`🎯 MediaGalleryNew - učitavam ${mediaFiles.length} fajlova iz /media/`);
  }, []);

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % mediaFiles.length;
    setCurrentSlide(newSlide);
    trackMediaGallery(newSlide, mediaFiles.length, likedMedia);
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + mediaFiles.length) % mediaFiles.length;
    setCurrentSlide(newSlide);
    trackMediaGallery(newSlide, mediaFiles.length, likedMedia);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    trackMediaGallery(index, mediaFiles.length, likedMedia);
  };

  const toggleLike = (index) => {
    const newLikedMedia = new Set(likedMedia);
    if (newLikedMedia.has(index)) {
      newLikedMedia.delete(index);
    } else {
      newLikedMedia.add(index);
    }
    setLikedMedia(newLikedMedia);
    // Sačuvaj user-specific liked media
    setUserSpecificData('likedMedia', JSON.stringify(Array.from(newLikedMedia)));
    
    // Prati promenu u sviđanjima
    trackMediaGallery(currentSlide, mediaFiles.length, newLikedMedia);
    
    // Trigger custom event da Dashboard zna da se ažurira
    window.dispatchEvent(new CustomEvent('statsUpdated'));
  };

  const handleImageLoad = (index) => {
    console.log(`✅ Uspešno učitano: ${mediaFiles[index].src}`);
    setImagesLoaded(prev => new Set(prev).add(index));
  };

  const handleImageError = (index) => {
    console.error(`❌ GREŠKA: Ne mogu da učitam ${mediaFiles[index].src}`);
  };

  return (
    <div className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-slideshow">
          {mediaFiles.map((file, index) => (
            <div
              key={`media-${index}`}
              className={`gallery-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              {file.type === 'image' ? (
                <img
                  src={file.src}
                  alt={file.caption}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    display: 'block'
                  }}
                />
              ) : (
                <video
                  src={file.src}
                  controls
                  muted
                  onLoadedData={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="gallery-controls" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          padding: '0 2rem'
        }}>
          <button 
            className="gallery-nav" 
            onClick={prevSlide}
            style={{
              background: 'white',
              color: '#2c1810',
              border: '3px solid #8b4559',
              borderRadius: '50%',
              width: 'clamp(50px, 12vw, 60px)',
              height: 'clamp(50px, 12vw, 60px)',
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ❮
          </button>
          
          <button 
            className="gallery-nav"
            onClick={nextSlide}
            style={{
              background: 'white',
              color: '#2c1810',
              border: '3px solid #8b4559',
              borderRadius: '50%',
              width: 'clamp(50px, 12vw, 60px)',
              height: 'clamp(50px, 12vw, 60px)',
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ❯
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => toggleLike(currentSlide)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2.5rem',
              cursor: 'pointer'
            }}
          >
            {likedMedia.has(currentSlide) ? '❤️' : '🤎'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaGalleryNew;
