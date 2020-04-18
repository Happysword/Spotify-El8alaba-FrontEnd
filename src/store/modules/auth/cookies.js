/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  /**
   * Clears `localStorage` and cookies from given keys
   * @param {Array} lsKeys     Array of strings containing localStorage items to be removed
   * @param {Array} cookieKeys Array of strings containing cookies to be removed
   */
  clearData(lsKeys, cookieKeys) {
    lsKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    cookieKeys.forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  },

  /**
   * Sets the expiry date of given cookies in `/` to session
   * @param {Array} cookieKeys Array of strings containing cookies to be set to session
   */
  setCookiesToSession(cookieKeys) {
    cookieKeys.forEach((cookieKey) => {
      let cookieValue = null;
      document.cookie.split(';').some((c) => {
        const [key, value] = c.split('=');
        if (key === cookieKey) {
          cookieValue = value;
          return true;
        }
        return false;
      });

      if (cookieValue) {
        document.cookie = `${cookieKey}=${cookieValue}; path=/;`;
      }
    });
  },
};
