import type { Locator, Page } from '@playwright/test';
import type { IBasePage } from '../interfaces/base-page.interface.ts';

export class BasePage implements IBasePage {
  public constructor(protected readonly page: Page) {}

  public async goto(path = ''): Promise<void> {
    await this.page.goto(path);
  }

  protected alertByText(text: string): Locator {
    return this.page.getByRole('alert').filter({ hasText: text });
  }
}
