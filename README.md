# service-manager

`service-manager` is a simple framework for dependency injection and service management. It's a proof of concept and a work in progress.

See `example/example.js` for an example of how this works.

Each service should have a corresponding `ServiceBuilder`, which is a recipe for building the service. The `ServiceManager` can use these builders to construct services as needed.

`example/example.ts` shows how this module can be used with Typescript.
