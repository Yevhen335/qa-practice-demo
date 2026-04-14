import { test } from '../fixtures/test.fixture.ts';

test.describe('Forms - Recover Password', () => {
  test('should send a recovery email for a registered account @smoke @regression', async ({
    recoverPasswordPage
  }) => {
    const email = process.env.ADMIN_EMAIL as string;

    await recoverPasswordPage.open();
    await recoverPasswordPage.recoverPasswordFor({ email });

    await recoverPasswordPage.expectConfirmationFor(email);
  });
});
