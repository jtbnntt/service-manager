import ServiceBuilder from './service-builder';
import ServiceRegistry from './service-registry';
import Service from './service';
import Config from './config';

import { createLogger } from './logging';

const LOGGER = createLogger('ServiceManager');

export default class ServiceManager implements ServiceRegistry {
  private services: Map<string, Service>;

  constructor(
    private config: Config,
    private serviceBuilders: Map<string, ServiceBuilder>
  ) {
    this.services = new Map<string, Service>();
  }

  addService(name: string, service: Service) {
    this.services.set(name, service);
  }

  getService<T extends Service>(name: string) {
    if (!this.services.has(name)) {
      LOGGER.info(`No service registered for "${name}", attempting to build`);

      if (!this.serviceBuilders.has(name)) {
        const message = `No builder for "${name}"`;
        LOGGER.error(message);
        throw new Error(message);
      }

      const builder = this.serviceBuilders.get(name)!;
      LOGGER.info(`Found builder for "${name}"`)

      this.addService(name, builder(this, this.config));
      LOGGER.info(`Registered service "${name}"`);
    }

    return this.services.get(name) as T;
  }
}
