import {
  ServiceBuilder,
  ServiceManager,
  config,
  logging
} from '../dist';

const LOGGER = logging.createLogger('index');
const CONFIG = config.loadConfig(
  'non-existent-file.json',
  undefined,
  './config.example.json',
  'another-filename.json'
);

interface Sayer {
  say(message: string): void;
}

interface Greeter {
  greet(): void;
}

const serviceBuilders = new Map<string, ServiceBuilder>()
  .set('sayer', () => {
    return {
      say: (message: string) => LOGGER.log(message)
    };
  })
  .set('greeter', (serviceRegsistry, config) => {
    const sayer = serviceRegsistry.getService<Sayer>('sayer');
    return {
      greet: () => sayer.say(config.greeting)
    };
  });

const serviceManager = new ServiceManager(
  CONFIG,
  serviceBuilders
);

const greeter = serviceManager.getService<Greeter>('greeter');

greeter.greet();
