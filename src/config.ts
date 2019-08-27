import fs from 'fs';

import { createLogger } from './logging';

const LOGGER = createLogger('Config');

export function loadConfig(...candidateFilenames: Array<string>) {
  const filename = candidateFilenames.find(filename => {
    if (filename) {
      LOGGER.info(`Checking if file "${filename}" exists`);
      return fs.existsSync(filename);
    }
  });

  if (!filename) {
    const message = 'Found no suitable config file';
    LOGGER.error(message);
    throw new Error(message);
  }

  LOGGER.info(`Loading config from ${filename}`);
  return JSON.parse(fs.readFileSync(filename).toString());
}

export default interface Config {
  [key: string]: any
}
