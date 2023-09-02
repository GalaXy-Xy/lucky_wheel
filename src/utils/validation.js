// Validation utility functions for form inputs and data

export const validators = {
  // Required field validation
  required: (value) => {
    if (value === null || value === undefined) return 'This field is required';
    if (typeof value === 'string' && value.trim() === '') return 'This field is required';
    if (Array.isArray(value) && value.length === 0) return 'This field is required';
    return null;
  },

  // Email validation
  email: (value) => {
    if (!value) return null; // Let required validator handle empty values
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  },

  // Ethereum address validation
  ethereumAddress: (value) => {
    if (!value) return null;
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!addressRegex.test(value)) return 'Please enter a valid Ethereum address';
    return null;
  },

  // Minimum length validation
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) return `Must be at least ${min} characters long`;
    return null;
  },

  // Maximum length validation
  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) return `Must be no more than ${max} characters long`;
    return null;
  },

  // Number range validation
  numberRange: (min, max) => (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < min) return `Must be at least ${min}`;
    if (num > max) return `Must be no more than ${max}`;
    return null;
  },

  // Positive number validation
  positiveNumber: (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num <= 0) return 'Must be a positive number';
    return null;
  },

  // URL validation
  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  // Custom regex validation
  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) return message || 'Invalid format';
    return null;
  },

  // Conditional validation
  conditional: (condition, validator) => (value, allValues) => {
    if (!condition(allValues)) return null;
    return validator(value, allValues);
  }
};

// Validate a single field with multiple validators
export const validateField = (value, fieldValidators) => {
  for (const validator of fieldValidators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

// Validate an entire form
export const validateForm = (values, validationSchema) => {
  const errors = {};

  Object.keys(validationSchema).forEach(fieldName => {
    const fieldValidators = validationSchema[fieldName];
    const fieldValue = values[fieldName];
    
    const error = validateField(fieldValue, fieldValidators);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

// Check if form is valid
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

// Common validation schemas
export const commonSchemas = {
  // Ethereum transaction form
  ethereumTransaction: {
    amount: [validators.required, validators.positiveNumber],
    recipient: [validators.required, validators.ethereumAddress],
    gasLimit: [validators.required, validators.positiveNumber, validators.numberRange(21000, 1000000)]
  },

  // User profile form
  userProfile: {
    username: [validators.required, validators.minLength(3), validators.maxLength(20)],
    email: [validators.required, validators.email],
    bio: [validators.maxLength(500)]
  },

  // Contact form
  contactForm: {
    name: [validators.required, validators.minLength(2)],
    email: [validators.required, validators.email],
    message: [validators.required, validators.minLength(10), validators.maxLength(1000)]
  }
};

// Real-time validation hook
export const useValidation = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((valuesToValidate) => {
    return validateForm(valuesToValidate, validationSchema);
  }, [validationSchema]);

  const setValue = useCallback((fieldName, value) => {
    const newValues = { ...values, [fieldName]: value };
    setValues(newValues);
    
    // Only validate if field has been touched
    if (touched[fieldName]) {
      const fieldErrors = validateForm(newValues, validationSchema);
      setErrors(fieldErrors);
    }
  }, [values, touched, validationSchema]);

  const setTouchedField = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate the field when it's touched
    const fieldErrors = validateForm(values, validationSchema);
    setErrors(fieldErrors);
  }, [values, validationSchema]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouchedField,
    reset,
    isValid: isFormValid(errors)
  };
};

export default {
  validators,
  validateField,
  validateForm,
  isFormValid,
  commonSchemas,
  useValidation
};
