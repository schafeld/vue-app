export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return false; // Empty email is invalid
  }
  const errors = [];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmailFormat = emailRegex.test(trimmedEmail);

  if (!isValidEmailFormat) {
    errors.push("Invalid email format");
  }

  return errors;
}

export const validatePassword = (password: string) => {
  const trimmedPassword = password.trim();
  if (!trimmedPassword) {
    return false; // Empty password is invalid
  }
  const errors = [];

  if (trimmedPassword.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  return errors;
}
