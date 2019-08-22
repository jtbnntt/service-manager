import Config from './config';
import Service from './service';
import ServiceRegistry from './service-registry';

type ServiceBuilder = (serviceRegistry: ServiceRegistry, config: Config) => Service;

export default ServiceBuilder;
