import Service from "./service";

export default interface ServiceRegistry {
  addService(name: string, service: Service): void;
  getService<T extends Service>(name: string): T;
}