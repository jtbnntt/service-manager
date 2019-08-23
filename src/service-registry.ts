import Service from "./service";

export default interface ServiceRegistry {
  registerService(name: string, service: Service): void;
  getService<T extends Service>(name: string): T;
}