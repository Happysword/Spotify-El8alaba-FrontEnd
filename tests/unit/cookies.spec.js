/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
import cookies from '@/store/modules/auth/cookies';

describe('cookies.js', () => {
  beforeEach(() => {
    localStorage.setItem('lsKey', 'value');
    document.cookie = 'cookieKey=value;';
  });

  test('Testing clearData', () => {
    expect(localStorage.lsKey).not.toEqual(undefined);
    expect(document.cookie.search('cookieKey')).not.toEqual(-1);

    cookies.clearData(['lsKey'], ['cookieKey']);
    expect(localStorage.lsKey).toEqual(undefined);
    expect(document.cookie.search('cookieKey')).toEqual(-1);
  });
});
