import { useEffect } from 'react';
import { updateUserActivity } from '../firebase/userActivity';

// Hook za praćenje osnovnih aktivnosti korisnika
export const useUserActivityTracking = () => {
  useEffect(() => {
    // Prati početnu aktivnost kada se komponenta učita
    const trackInitialActivity = () => {
      updateUserActivity({
        pageLoaded: true,
        loadTime: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });
    };

    // Prati kada korisnik napušta stranicu
    const trackPageLeave = () => {
      updateUserActivity({
        pageLeft: true,
        leaveTime: new Date().toISOString()
      });
    };

    // Prati promene u vidljivosti stranice
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateUserActivity({
          pageHidden: true,
          hiddenTime: new Date().toISOString()
        });
      } else {
        updateUserActivity({
          pageVisible: true,
          visibleTime: new Date().toISOString()
        });
      }
    };

    trackInitialActivity();

    // Dodaj event listener-e
    window.addEventListener('beforeunload', trackPageLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // Ukloni event listener-e
      window.removeEventListener('beforeunload', trackPageLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
