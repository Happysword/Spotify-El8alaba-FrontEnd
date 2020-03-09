// TODO[XL3]: Implement hashing
const hashPassword = (password) => password;

export default {
  // TODO[XL3]: Implement requests to a mock API
  authenticateUser(username, password) {
    const hashedPw = hashPassword(password);
    return { found: username === 'admin' && hashedPw === 'admin123' };
  },
};
