import dotenv from 'dotenv';
import type { EnvConfig } from '../interfaces/env-config.interface.ts';

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env: EnvConfig = {
  baseUrl: getRequiredEnv('BASE_URL'),
  adminEmail: getRequiredEnv('ADMIN_EMAIL'),
  adminPassword: getRequiredEnv('ADMIN_PASSWORD'),
  headless: getRequiredEnv('HEADLESS') === 'true'
};
