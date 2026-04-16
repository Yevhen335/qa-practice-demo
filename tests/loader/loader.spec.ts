import { expect, test } from '../fixtures/test.fixture.ts';

test.describe('Loader', () => {
  test('should show the loader first and then reveal the loaded content @smoke @regression', async ({
    loaderPage,
    page
  }) => {
    await loaderPage.open();

    await expect(page).toHaveURL(/\/loader$/);
    await loaderPage.expectLoadingState();
    await loaderPage.expectLoadedState();
  });

  test('should restart the loading cycle after a page reload @regression', async ({
    loaderPage,
    page
  }) => {
    await loaderPage.open();
    await loaderPage.expectLoadedState();

    await loaderPage.reloadLoaderPage();

    await expect(page).toHaveURL(/\/loader$/);
    await loaderPage.expectLoadingState();
    await loaderPage.expectLoadedState();
  });
});
