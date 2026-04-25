export const ROUTES = {
  alerts: '/alerts',
  login: '/auth_ecommerce.html',
  register: '/register.html',
  recoverPassword: '/recover-password.html',
  loader: '/loader.html'
} as const;

export const APP_MESSAGES = {
  invalidCredentials: 'Bad credentials! Please try again! Make sure that you\'ve registered.',
  registrationSuccess: 'The account has been successfully created!'
} as const;
