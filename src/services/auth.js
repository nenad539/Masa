// Servis za autentifikaciju korisnika
const USERS = {
  nenad: {
    username: 'nenad',
    password: 'nenad539',
    displayName: 'Nenad',
    whatsappNumber: '+382 067 266 002',
    avatar: '👨',
    id: 'user_nenad'
  },
  masa: {
    username: 'mala masa',
    password: 'masa',
    displayName: 'Mala Masa 💖',
    whatsappNumber: '+382 068 392 397',
    avatar: '👩',
    id: 'user_masa'
  }
};

// Login funkcija
export const login = (username, password) => {
  const user = Object.values(USERS).find(u => 
    u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    return { success: true, user };
  }
  
  return { success: false, error: 'Pogrešno korisničko ime ili lozinka' };
};

// Logout funkcija
export const logout = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  // Sačuvaj podatke za različite korisnike
  localStorage.removeItem('loveCooldown');
  localStorage.removeItem('currentReasonIndex');
};

// Proveri da li je korisnik ulogovan
export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Dobij trenutnog korisnika
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// Dobij drugog korisnika (partnera)
export const getPartner = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  
  const partnerId = currentUser.id === 'user_nenad' ? 'user_masa' : 'user_nenad';
  return Object.values(USERS).find(u => u.id === partnerId);
};

// Dobij podatke specifične za korisnika
export const getUserSpecificKey = (key) => {
  const user = getCurrentUser();
  return user ? `${key}_${user.id}` : key;
};

// Sačuvaj podatke specifične za korisnika
export const setUserSpecificData = (key, value) => {
  const specificKey = getUserSpecificKey(key);
  localStorage.setItem(specificKey, value);
};

// Učitaj podatke specifične za korisnika
export const getUserSpecificData = (key) => {
  const specificKey = getUserSpecificKey(key);
  return localStorage.getItem(specificKey);
};
