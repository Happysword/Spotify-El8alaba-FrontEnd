/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
import cookies from '@/store/modules/auth/cookies';

describe('cookies.js', () => {
  beforeEach(() => {
    // Populate localStorage and cookies
    localStorage.setItem('lsKey', 'value');
    document.cookie = 'cookieKey=value;';
  });

  test('Testing clearData', () => {
    // Assert that the data was inserted
    expect(localStorage.lsKey).not.toEqual(undefined);
    expect(document.cookie).toMatch('cookieKey');
    expect(document.cookie).not.toMatch('undefinedKey');

    // Clear the data and assert it was cleared
    cookies.clearData(
      ['lsKey', 'undefinedKey'],
      ['cookieKey', 'undefinedKey'],
    );
    expect(localStorage.lsKey).toEqual(undefined);
    expect(document.cookie).not.toMatch('cookieKey');
    expect(document.cookie).not.toMatch('undefinedKey');
  });

  test('Testing setCookiesToSession', () => {
    // Assert that the data was inserted
    expect(localStorage.lsKey).not.toEqual(undefined);
    expect(document.cookie).toMatch('cookieKey');
    expect(document.cookie).not.toMatch('undefinedKey');

    // Set the cookies to session and assert that it exists
    cookies.setCookiesToSession(['cookieKey', 'undefinedKey']);
    expect(document.cookie).toMatch('cookieKey');
    expect(document.cookie).not.toMatch('undefinedKey');
    expect(document.cookie).not.toMatch('undefinedKey');
  });
});
