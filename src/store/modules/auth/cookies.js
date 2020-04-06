/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  /**
   * Clears input data from localStorage and cookies
   * @param {Array} lsKeys     Array of strings containing localStorage items to be removed
   * @param {Array} cookieKeys Array of strings containing cookie items to be removed
   */
  clearData(lsKeys, cookieKeys) {
    lsKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
    cookieKeys.forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    });
  },

  /**
   * Sets input data to session in cookies
   * @param {Array} cookieKeys Array of strings containing cookie items to be set to session
   */
  setCookiesToSession(cookieKeys) {
    cookieKeys.forEach((cookieKey) => {
      let cookieValue = '';
      document.cookie.split(';').some((c) => {
        const [key, value] = c.split('=');
        if (key === cookieKey) {
          cookieValue = value;
          return true;
        }
        return false;
      });

      document.cookie = `${cookieKey}=${cookieValue}`;
    });
  },
};
