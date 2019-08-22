# appconstructor

`appconstructor` is a simple service management framework. It's a proof of concept and a work in progress.

See `./src/example.ts` for an example of how this works. Each service should have a `ServiceBuilder`, which is a recipe for building the service. The `ServiceManager` can use these builders to construct services as needed.