# Authentication api

&nbsp;&nbsp;&nbsp;&nbsp;This api is responsable for users management and authentication

# Commands to setup 
&nbsp;&nbsp;&nbsp;&nbsp; Use the following commands to setup auth-api
- docker build -t auth_app .
- docker-compose up --build
- sudo docker network create chat-project-auth-api-network
- sudo docker network connect chat-project-auth-api-network auth-api
- sudo docker network connect chat-project-auth-api-network postgres-auth-api
- docker network inspect chat-project-auth-api-network
- docker-compose stop
- docker exec -it auth-api bash
- npx prisma migrate dev

# Used tecnologies

- Express
- Typescript
- Jwt
- PostgreSQL
- bcrypt (criptograph)
- uuidv4 (id generator)
- tsrynge  (dependency injection)
- dayjs (date manipulation lib)