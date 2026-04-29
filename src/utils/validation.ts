import { SimpleUserFormData, ValidationErrors } from '../types';

export const validateUserForm = (formData: SimpleUserFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!formData.username || formData.username.trim() === '') {
    errors.username = 'Username is required';
  }

  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  return errors;
};