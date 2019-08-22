import fs from 'fs';

import { createLogger } from './logging';

const LOGGER = createLogger('Config');

export function loadConfig(filename: string) {
  if (!fs.existsSync(filename)) {
    const message = `Config file "${filename}" does not exist.`;
    LOGGER.error(message);
    throw new Error(message);
  }

  return JSON.parse(fs.readFileSync(filename).toString());
}

type Config = {
  [key: string]: string
};

export default Config;
