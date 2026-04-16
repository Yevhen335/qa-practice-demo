import type { IBasePage } from './base-page.interface.ts';

export interface ILoaderPage extends IBasePage {
  open(): Promise<void>;
  reloadLoaderPage(): Promise<void>;
  expectLoadingState(): Promise<void>;
  expectLoadedState(): Promise<void>;
}
