export default {
  minLength(propertyName, len) {
    return (data) => data.length >= len
      || `Minimum character length for ${propertyName} is ${len}`;
  },

  maxLength(propertyName, len) {
    return (data) => data.length <= len
      || `Maximum character length for ${propertyName} is ${len}`;
  },

  required(propertyName) {
    return (data) => (!!data && data.length > 0)
      || `${propertyName} is required`;
  },

  noSpecialCharacters(propertyName) {
    return (data) => (!!data && data.search(/[^a-zA-Z0-9_@\-.]/g) !== -1)
      || `${propertyName} doesn't allow special characters`;
  },
};
