# Instrukcije za Media Folder

## Photos Folder (/public/media/photos/)
Dodaj svoje prekrasne fotografije ovdje. Podržani formati:
- .jpg, .jpeg, .png, .webp

## Videos Folder (/public/media/videos/)
Dodaj svoje posebne video snimke ovdje. Podržani formati:
- .mp4, .webm, .mov

## Kako dodati media:
1. Kopiraj svoje fotografije u `/public/media/photos/`
2. Kopiraj svoje video snimke u `/public/media/videos/`
3. Ažuriraj `mediaItems` niz u `/src/components/MediaGallery.jsx` sa stvarnim imenima fajlova i opisima

## Trenutni Placeholders:
Website trenutno koristi placeholder media. Zamijeni ih sa stvarnim fajlovima:
- placeholder1.jpg → tvoja prva fotografija
- placeholder2.jpg → tvoja druga fotografija  
- placeholder3.jpg → tvoja treća fotografija
- placeholder1.mp4 → tvoj prvi video

## Dodavanje više Media:
Da dodaš više fotografija/videa, jednostavno dodaj nove objekte u `mediaItems` niz u MediaGallery.jsx:

```javascript
{
  type: 'image', // ili 'video'
  src: '/media/photos/tvoja-fotografija.jpg',
  caption: 'Tvoj prekrasan opis ovdje'
}
```
