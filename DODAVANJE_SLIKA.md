# 📸 Instrukcije za Dodavanje Slika i Videa

## Kako da dodate vaše slike i video:

### 1. **Kopirajte vaše fajlove:**
   - Slike stavite u: `public/media/photos/`
   - Video stavite u: `public/media/videos/`

### 2. **Ažurirajte MediaGallery.jsx:**
   Otvorite `src/components/MediaGallery.jsx` i u `mediaItems` nizu zamenite placeholders sa vašim stvarnim fajlovima:

```javascript
const mediaItems = [
  {
    type: 'image',
    src: '/media/photos/vasa-slika-1.jpg',  // ← Zamenite sa imenom vaše slike
    caption: 'Vaš opis slike...'
  },
  {
    type: 'image', 
    src: '/media/photos/vasa-slika-2.jpg',  // ← Zamenite sa imenom vaše slike
    caption: 'Vaš opis slike...'
  },
  {
    type: 'video',
    src: '/media/videos/vas-video.mp4',     // ← Zamenite sa imenom vašeg videa
    caption: 'Vaš opis videa...'
  }
  // Dodajte više slika/videa ovde...
];
```

### 3. **Primer sa stvarnim imenima:**
Ako imate slike sa imenima kao što su:
- `masa_i_ja.jpg`
- `nase_selo.png` 
- `romantika.mp4`

Onda ćete pisati:
```javascript
{
  type: 'image',
  src: '/media/photos/masa_i_ja.jpg',
  caption: 'Naša prva fotografija zajedno'
},
{
  type: 'image', 
  src: '/media/photos/nase_selo.png',
  caption: 'Prelepo mesto gde živimo'
},
{
  type: 'video',
  src: '/media/videos/romantika.mp4',
  caption: 'Naš specijalni trenutak'
}
```

### 4. **Podržani formati:**
- **Slike:** .jpg, .jpeg, .png, .webp, .gif
- **Video:** .mp4, .webm, .mov

### 5. **Saveti:**
- Koristite kratka imena fajlova bez razmaka (koristite _ ili -)
- Dodajte lepe opise za svaku sliku/video
- Možete dodati koliko god želite media fajlova

### 6. **Testiranje:**
Nakon što dodate fajlove i ažurirate kod, osvežite stranicu da vidite vaše slike!
