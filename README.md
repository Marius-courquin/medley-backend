# medley-backend
This repository contains the backend code for the Medley project.

## Context
Medley is an application developed as part of a fourth yearn engineering project at IG2I Centrale Lille.
The Medley objective is to provide a platform where a real estate agent can authenticate and make some lease inspections.

## Organization of the repository
This repository is a monorepo containing two applications:
- auth : The authentication API which allow to authenticate users
- core : The core API which allow to make lease inspections

Each application has its own dependencies and can be run independently.
Note that the core application depends on the auth application to authenticate users.
Core applcation require a valid JWT token to be passed in the Authorization header as Bearer of the request that is generated by the auth application.

If you want to start application corresponding dependencies, you can run the following command:
```bash
make deps-up
```

## Architecture
Both applications are developed using the **[NestJS](https://docs.nestjs.com/)** framework. 
Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. 
It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming)

As database, we use **[PostgreSQL](https://www.postgresql.org/docs/current/)**.
PostgreSQL is an object-relational database management system (ORDBMS) based on POSTGRES, Version 4.2. 

As ORM (Object-relational mapping) to persist data, we use **[TypeORM](https://typeorm.io/)**.
TypeORM is an ORM that can run in a lot of  platforms and can be used with TypeScript and JavaScript.
TypeORM supports both Active Record and Data Mapper patterns, unlike all other JavaScript ORMs currently in existence, which means you can write high-quality, loosely coupled, scalable, maintainable applications in the most productive way.

As file storage, we use **[MinIO](https://docs.min.io/)**.
MinIO is an object storage solution that provides an Amazon Web Services S3-compatible API and supports all core S3 features. 
MinIO is built to deploy anywhere - public or private cloud, baremetal infrastructure, orchestrated environments, and edge infrastructure.


### Global Medley backend architecture

![Global Medley backend architecture](/docs/architecture/medley-backend-architecture.png)

## CI (Continuous Integration)
This project has a CI pipeline of three steps:
- Testing auth application
- Building auth application
- Building core application
It ensures that the code is correctly tested and built before being merged into the main branch.

## CD (Continuous Deployment)
This project has a CD pipeline that build and push applications new images to the Docker Hub registry.
The images are then pulled by the production server to deploy the new version of the applications.
You can find latest images on the Docker Hub registry:
- [Auth image](https://hub.docker.com/r/mariuscourquin62/medley-auth)
- [Core image](https://hub.docker.com/r/mariuscourquin62/medley-core)

On our production server we are running an instance of the [Watchtower](https://containrrr.dev/watchtower/) container.
Watchtower is a process for automating Docker container base image updates. 
It is a daemon process that runs in the background and automatically updates the running container whenever a new image is pushed to the Docker Hub registry.

## Deployment
In order to deploy the architecture and applications on a server, we provide all the necessary files in the `deployments` directory.
In this directory you can find:
- `docker-compose.db.yml` : The docker-compose file to deploy databases
- `docker-compose.minio.yml` : The docker-compose file to deploy MinIO
- `docker-compose.apps.yml` : The docker-compose file to deploy both applications auth and core
- `docker-compose.watchtower.yml` : The docker-compose file to deploy Watchtower
- `docker-compose.portainer.yml` : The docker-compose file to deploy Portainer (optional if you want to manage your containers with a web interface)
-  all corresponding .env files to configure each solution with your specific configuration
- `Makefile` : A Makefile to help you deploy the solution with for each solution two commands `make start-"solution-name"` to deploy the solution and `make stop-"solution-name"` to stop the solution

Note that you need to have Docker and Docker Compose installed on your server to deploy the solution.

Note that you have to deploy the databases first, then MinIO, then the applications and finally Watchtower.
