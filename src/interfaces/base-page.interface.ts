export interface IBasePage {
  goto(path?: string): Promise<void>;
}
