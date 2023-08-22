# The Twelve-Factor App

<https://12factor.net>

## 1. Codebase

One codebase tracked in revision control, many deploys.

The first factor, codebase, focuses on having a single codebase with multiple deploys or “one codebase tracked in revision control, many deploys.” To properly follow this principle, you should avoid multiple code bases for various versions. Adding branches to one codebase helps ensure that your codebase is made of a logical version control system. Your repository shouldn’t house multiple applications, as it can become confusing.

In short, this means you need to:

- Have one codebase
- Make a logical control system
- Have a code repository for every deployment. This code repository should be able to be deployed in multiple environments

## 2. Dependencies

Explicitly declare and isolate dependencies.

The next principle is dependencies: explicitly declare and isolate dependencies. This means that you should never rely on the implicit existence of systemwide packages and instead have app-specific libraries. App-specific libraries should include the necessary system libraries, like ImageMagick, Pandoc, or cURL, and should allow shelling out to the operating system.

According to this principle, the 12-factor app must be:

- Self-containing
- Isolated to avoid interactions with any conflicting libraries

## 3. Config

Store config in the environment.

The third principle, config, is an incredibly important principle, which states that you should never commit any environment-specific configurations, like a password, in the source code repo. In short, the application and its configuration must be independent, and storing configs in code should be avoided.

Why having a separate config file is important:

- It simplifies the process of updating config values because you don’t have to touch the actual codebase.
- It eliminates the need for the redeployment of the application when certain config values are changed.
- Variables can be moved to a different environment since they’rre not configured in the app.
- Configs are independent of the operating system and language.

## 4. Backing services

Treat backing services as attached resources.

The next principle is to treat backing services as attached resources. This principle focuses on treating the external service that the applications depend on equally. Whether you manage the services or another party manages them, they need to be treated the same.

According to this principle, services that do not support the core app can be accessed as services. Because they’re accessed as services, they’re considered non-core essential services and are often treated as resources.

Non-core essential services often include external storage, databases, message queues, etc. These non-core essential services should be accessed as a service via HTTP, or a similar request, and stated in the config. With the usage of backup services, the service’s code can be changed at any time without the worry of impacting the core code of the application.

## 5. Build, release, run

Strictly separate build and run stages.

In this next principle, it’s critical to strictly separate build and run stages. To begin, the build process should start by storing the app in source control and then building out all of its dependencies. By separating the config information, you can combine it with the release stage. From there, it’s ready for the run state.

These stages must be separated:

- Building
- Releasing
- Running

In addition, each release needs a unique ID.

## 6. Processes

Execute the app as one or more stateless processes.

Processes, the next principle, “execute the app as one or more stateless processes.” In short, this means that you don’t have to rely on any state being present in the memory on the file system because it’s stateless. All required data should be stored in a stateful backing service, such as a database.

## 7. Port binding

Export services via port binding.

Port binding, the seventh principle, is essentially about the app being standalone. This is contrary to other applications that rely on running instances of an application server. According to this principle, a web server library or something similar to the core app should be used. In doing so, the app can wait for requests on a defined port.

## 8. Concurrency

Scale out via the process model.

The next principle, concurrency, states that you should “scale out via the process model.” Essentially, this means that you need to build the application so that scaling them in the cloud is simple. By developing the application to be concurrent, new instances can easily be spun into the cloud.

## 9. Disposability

Maximize robustness with fast startup and graceful shutdown.

In this principle, disposability means that you should “maximize robustness with fast startup and graceful shutdown.” By following this principle, you’re building a more durable application.

According to this principle, your app should be able to die at any time, without impacting the user. Apps designed in this way can shut down smoothly and come back up again quickly. This ensures that your users won’t be affected.

## 10. Dev/prod parity

Keep development, staging, and production as similar as possible.

According to the dev/prod parity principle, the development environment should be nearly identical to the production environment. It’s stated that developers should “keep development, staging, and production as similar as possible.” Twelve-factor apps should have identical development and production code.

Vast differences between the environments could result in compatibility issues between the dev and prod code. Down the line, this could result in significant issues that are potentially time consuming and a waste of resources. By following this principle, teams avoid the “it works on my machine” conundrum.

## 11. Logs

Treat logs as event streams.

The 11th principle, logs, states that you should “treat logs as event streams.” This means that developers should stream logs to a specific location. Unlike traditional models, the 12-factor app methodology avoids dumping logs into a log file.

By treating logs as event streams, development teams avoid common issues that other developers face. When new processes start or when an app crashes, logs will be allocated across different cloud machines. By following this principle, developers avoid this issue and have a common place for the logs to stream.

## 12. Admin processes

Run admin/management tasks as one-off processes.

The final principle, admin processes, requires that administrative tasks be separated from the rest of the application. Even when administration processes are separate, tasks should run in the same environment, against the base code and configuration of the app. Ultimately, by running admin and management tasks in this way, you’re preventing any drift from one another.
