/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
import validation from '@/store/modules/auth/validation';

describe('validation.js', () => {
  test('Testing minLength', () => {
    const validFn = validation.minLength('test', 4);
    expect(validFn('This is a test')).toEqual(true);
    expect(validFn('Thi')).toEqual('Minimum character length for test is 4');
  });

  test('Testing maxLength', () => {
    const validFn = validation.maxLength('test', 8);
    expect(validFn('Thi')).toEqual(true);
    expect(validFn('This is a test')).toEqual('Maximum character length for test is 8');
  });

  test('Testing required', () => {
    const validFn = validation.required('test');
    expect(validFn('This is a test')).toEqual(true);
    expect(validFn('')).toEqual('test is required');
  });

  test('Testing noSpecialCharacters', () => {
    const validFn = validation.noSpecialCharacters('test');
    expect(validFn('This_is_a_test')).toEqual(true);
    expect(validFn('!@#$%&')).toEqual('test doesn\'t allow special characters');
  });

  test('Testing validEmail', () => {
    const validFn = validation.validEmail();
    expect(validFn('test@test.com')).toEqual(true);
    expect(validFn('This is a test')).toEqual('Not a valid email address');
  });

  test('Testing validDay', () => {
    const validFn = validation.validDay();
    expect(validFn(19)).toEqual(true);
    expect(validFn(91)).toEqual('Please enter a valid day of the month');
    expect(validFn(-91)).toEqual('Please enter a valid day of the month');
    expect(validFn(0)).toEqual('Please enter a valid day of the month');
    expect(validFn('This is a test')).toEqual('Please enter a valid day of the month');
  });

  test('Testing validYear', () => {
    const validFn = validation.validYear();
    expect(validFn(1991)).toEqual(true);
    expect(validFn(2091)).toEqual('Please enter a valid year');
    expect(validFn(1891)).toEqual('Please enter a valid year');
    expect(validFn(0)).toEqual('Please enter a valid year');
    expect(validFn(-90)).toEqual('Please enter a valid year');
    expect(validFn('This is a test')).toEqual('Please enter a valid year');
  });

  test('Testing validMobilePhoneNumber', () => {
    const validFn = validation.validMobilePhoneNumber();
    expect(validFn('+201100130094')).toEqual(true);
    expect(validFn('011100130094')).toEqual('Please enter a valid phone number');
    expect(validFn('Not a phone number')).toEqual('Please enter a valid phone number');
    expect(validFn('+2011001300')).toEqual('Please enter a valid phone number');
  });

  test('Testing validName', () => {
    const validFn = validation.validName();
    expect(validFn('Abdelrahman Farid')).toEqual(true);
    expect(validFn('XL3')).toEqual('Please enter a valid name');
    expect(validFn('!@#$%^&*()-=')).toEqual('Please enter a valid name');
    expect(validFn('Sub-Zero')).toEqual('Please enter a valid name');
  });
});
