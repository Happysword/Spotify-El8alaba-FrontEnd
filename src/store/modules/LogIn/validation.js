export default {
  /**
   * Validates that the provided data is above a minimum length of characters.
   * @param  {String} propertyName The name of the property being validated
   * @param  {Number} len          The length being matched against
   * @return {function}            The function that does the validation
   */
  minLength(propertyName, len) {
    return (data) => data.length >= len
      || `Minimum character length for ${propertyName} is ${len}`;
  },

  /**
   * Validates that the provided data is below a maximum length of characters.
   * @param  {String} propertyName The name of the property being validated
   * @param  {Number} len          The length being matched against
   * @return {function}            The function that does the validation
   */
  maxLength(propertyName, len) {
    return (data) => data.length <= len
      || `Maximum character length for ${propertyName} is ${len}`;
  },

  /**
   * Validates that the provided data is not empty.
   * @param  {String} propertyName The name of the property being validated
   * @return {function}            The function that does the validation
   */
  required(propertyName) {
    return (data) => (!!data && data.length > 0)
      || `${propertyName} is required`;
  },

  /**
   * Validates that the provided data doesn't contain any special characters.
   * @param  {String} propertyName The name of the property being validated
   * @return {function}            The function that does the validation
   */
  noSpecialCharacters(propertyName) {
    return (data) => (!!data && data.search(/[^a-zA-Z0-9_@\-.]/g) === -1)
      || `${propertyName} doesn't allow special characters`;
  },
};
