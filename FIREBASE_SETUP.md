# 🔥 Firebase Real-time User Activity Tracking

## 📊 Implementirane funkcionalnosti

### 1. **Real-time praćenje korisnika**
- Jedinstveni ID za svakog korisnika (čuva se u localStorage)
- Praćenje trenutne aktivnosti u realnom vremenu
- Automatsko ažuriranje kada korisnik napusti stranicu

### 2. **Praćenje aktivnosti na dugmetu ljubavi**
- Broj klikova na dugme "Zašto te volim"
- Trenutna poruka ljubavi koja se prikazuje
- Timer status (preostalo vreme do sledećeg klika)

### 3. **Praćenje Media Galerije**
- Trenutna slika/video koja se prikazuje
- Broj sviđanja (lajkova) 
- Koje slike je korisnik lajkovao

### 4. **Praćenje tema**
- Trenutno aktivna romantična tema
- Vreme kada je poslednji put promenjena tema

### 5. **Statistike uživo**
- Broj aktivnih korisnika u posledjih 5 minuta
- Ukupan broj korisnika koji je posetio sajt
- Ukupan broj klikova na dugme ljubavi
- Prosečan broj klikova po korisniku

## 🎯 Kako koristiti

### Admin panel (Statistike)
1. **Dugme za statistike** - Klikni na 📊 dugme u gornjem desnom uglu
2. **Aktivni korisnici** - Vidi ko je trenutno aktivan na sajtu
3. **Real-time ažuriranje** - Statistike se automatski osveže

### Kako se prate aktivnosti
- **LoveButton klikovi** - Automatski se beleže u Firebase
- **Media Gallery** - Prati se svaka promena slike i lajk
- **Teme** - Beleži se svaka promena boje
- **Osnovne aktivnosti** - Učitavanje stranice, odlazak, etc.

## 🚀 Tehnički detalji

### Firebase konfiguracija
- **Projekat**: sajt-beec2
- **Firestore Database**: Aktivna sa test pravilima
- **Real-time synchronizacija**: Omogućena

### Komponente sa Firebase integracijom
- `UserStats.jsx` - Prikazuje statistike uživo
- `LoveButton.jsx` - Prati klikove i timer
- `MediaGalleryNew.jsx` - Prati galeriju aktivnosti  
- `RomanticThemes.jsx` - Prati promene tema
- `useUserActivityTracking.js` - Hook za osnovne aktivnosti

### Firebase servisi
- `config.js` - Osnovna Firebase konfiguracija
- `userActivity.js` - Svi servisi za praćenje aktivnosti

## 💡 Moguce proširenja

1. **Chat sistem** - Real-time poruke između korisnika
2. **Push notifikacije** - Obavesti kada je neko aktivan
3. **Analitika** - Detaljnije praćenje ponašanja korisnika
4. **Admin panel** - Naprednije statistike i upravljanje

## 🔧 Deployment sa Firebase

Firebase je automatski uključen u production build:
```bash
npm run build
npm run deploy
```

Statistike će raditi i na GitHub Pages sajtu: https://nenad539.github.io/Masa/

## 🛡️ Sigurnost

- Test pravila omogućavaju read/write pristup
- Za production, trebalo bi dodati dodatna sigurnosna pravila
- Korisnički ID-jevi su anonimni (ne čuvaju se lični podaci)
