// Servis za autentifikaciju korisnika
const USERS = {
  stefan: {
    username: 'stefan',
    password: 'stefan123',
    displayName: 'Stefan',
    id: 'user_stefan'
  },
  tanja: {
    username: 'tanja',
    password: 'tanja',
    displayName: 'Tanja 💖',
    id: 'user_tanja'
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
  
  const partnerId = currentUser.id === 'user_stefan' ? 'user_tanja' : 'user_stefan';
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
