# 🔥 Firebase Firestore Setup - Korak po korak

## Problem: Ne mogu da promenim Rules

### Razlog 1: Firestore Database nije kreirana
1. Idi na https://console.firebase.google.com
2. Klikni na projekat "sajt-beec2"
3. U levom meniju klikni "Firestore Database"
4. Ako vidiš "Create database" - klikni na to
5. Izaberi "Start in test mode" 
6. Izaberi lokaciju (npr. europe-west1)
7. Klikni "Done"

### Razlog 2: Koristiš pogrešan tab
1. Kada otvoriš Firestore Database
2. Traži tabove na vrhu: "Data", "Rules", "Indexes", "Usage"
3. Klikni na "Rules" tab
4. Tu možeš da menjaš pravila

### Razlog 3: Nemaš dozvole
1. Proveri da li si Owner ili Editor projekta
2. Ako nisi, traži od vlasnika da te doda

### Test pravila za početak:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Ako i dalje ne radi:
- Pokušaj sa drugim browser-om
- Očisti cache (Ctrl+Shift+R)
- Odjavi se i ponovo se uloguj u Firebase
