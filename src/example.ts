import ServiceBuilder from './service-builder';
import ServiceManager from './service-manager';

import { createLogger } from './logging';
import { loadConfig } from './config';

const LOGGER = createLogger('index');
const CONFIG = loadConfig('./config.example.json');

const serviceBuilders = new Map<string, ServiceBuilder>()
  .set('hello', (_, config) => {
    return {
      greet: () => config.greeting
    };
  });

const serviceManager = new ServiceManager(
  CONFIG,
  serviceBuilders
);

type HelloService = {
  greet: () => string
};

const helloService = serviceManager.getService<HelloService>('hello');

LOGGER.log(helloService.greet());
