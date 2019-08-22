import Config from './config';
import Service from './service';
import ServiceRegistry from './service-registry';

export default interface ServiceBuilder {
  (serviceRegistry: ServiceRegistry, config: Config): Service;
}
