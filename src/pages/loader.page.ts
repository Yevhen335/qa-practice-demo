import { expect, type Locator, type Page } from '@playwright/test';
import { ROUTES } from '../constants/routes.ts';
import type { ILoaderPage } from '../interfaces/loader-page.interface.ts';
import { BasePage } from './base.page.ts';

export class LoaderPage extends BasePage implements ILoaderPage {
  private readonly loader: Locator;
  private readonly loadedContainer: Locator;
  private readonly loadedHeading: Locator;
  private readonly loadedText: Locator;

  public constructor(page: Page) {
    super(page);
    this.loader = page.locator('#loader');
    this.loadedContainer = page.locator('#myDiv');
    this.loadedHeading = page.getByRole('heading', { name: 'Tada!' });
    this.loadedText = page.getByText('Some text in my newly loaded page..');
  }

  public async open(): Promise<void> {
    await this.goto(ROUTES.loader);
  }

  public async reloadLoaderPage(): Promise<void> {
    await this.page.reload();
  }

  public async expectLoadingState(): Promise<void> {
    await expect(this.loader).toBeVisible();
    await expect(this.loadedContainer).toBeHidden();
  }

  public async expectLoadedState(): Promise<void> {
    await expect(this.loader).toBeHidden({ timeout: 5_000 });
    await expect(this.loadedHeading).toBeVisible();
    await expect(this.loadedText).toBeVisible();
  }
}
