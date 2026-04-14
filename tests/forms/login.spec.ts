import { APP_MESSAGES } from '../../src/constants/routes.ts';
import { expect, test } from '../fixtures/test.fixture.ts';

test.describe('Forms - Login', () => {
  test('should log in with valid credentials and open the shop @smoke @regression', async ({
    loginPage
  }) => {
    await loginPage.open();
    await loginPage.loginAs({
      email: process.env.ADMIN_EMAIL as string,
      password: process.env.ADMIN_PASSWORD as string
    });

    await loginPage.expectUserIsLoggedIn();
  });

  test('should reject invalid credentials and keep the user on the login form @regression', async ({
    loginPage,
    page,
    testDataFactory
  }) => {
    const credentials = testDataFactory.buildInvalidLoginCredentials();

    await loginPage.open();
    await loginPage.loginAs(credentials);

    await loginPage.expectInvalidCredentialsAlert();
    await expect(page).toHaveURL(/auth_ecommerce\.html$/);
    await expect(page.getByRole('alert')).toContainText(APP_MESSAGES.invalidCredentials);
  });
});
