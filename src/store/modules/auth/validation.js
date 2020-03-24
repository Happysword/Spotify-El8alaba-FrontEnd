export default {
  /**
   * Validates that the provided data is above a minimum length of characters.
   * @param  {String} propertyName The name of the property being validated
   * @param  {Number} len          The length being matched against
   * @return {function}            The function that does the validation
   */
  minLength(propertyName, len) {
    return (data) => (!!data && data.length >= len)
      || `Minimum character length for ${propertyName} is ${len}`;
  },

  /**
   * Validates that the provided data is below a maximum length of characters.
   * @param  {String} propertyName The name of the property being validated
   * @param  {Number} len          The length being matched against
   * @return {function}            The function that does the validation
   */
  maxLength(propertyName, len) {
    return (data) => (!!data && data.length <= len)
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
    // Validate that this RegExp isn't found in the string
    return (data) => (!!data && data.search(/[^\w@\-.]/g) === -1)
      || `${propertyName} doesn't allow special characters`;
  },

  /**
   * Validates that the provided data matches an email address pattern
   * @return {function} The function that does the validation
   */
  validEmail() {
    // Validate that this RegExp matches the full string
    return (email) => (!!email && email.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) === 0)
      || 'Not a valid email address';
  },

  /**
   * Validates that the provided data matches a day of the month
   * @return {function} The function that does the validation
   */
  validDay() {
    return (day) => (!!day && day >= 1 && day <= 31)
      || 'Please enter a valid day of the month';
  },

  /**
   * Validates that the provided data matches a year
   * @return {function} The function that does the validation
   */
  validYear() {
    // @todo[XL3] Validate this year range
    return (year) => (!!year && year >= 1920 && year <= 2020)
      || 'Please enter a valid year';
  },
};
