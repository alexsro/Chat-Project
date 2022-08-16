# Backend api

&nbsp;&nbsp;&nbsp;&nbsp;This api is responsable for communication with frontend

# Commands to setup
&nbsp;&nbsp;&nbsp;&nbsp; Use the following commands to setup chat-backend
- docker build -t chat_app .
- docker-compose up --build
- sudo docker network create chat-project-chat-api-network
- sudo docker network connect chat-project-chat-api-network chat-api
- sudo docker network connect chat-project-chat-api-network postgres-chat-api
- docker network inspect chat-project-chat-api-network
- docker-compose stop
- docker exec -it chat-api bash
- npx prisma migrate dev

# Used tecnologies

- Express
- Typescript
- Jwt
- PostgreSQL
- Redis (Cache)
- MongoDB (Notifications)
- bcrypt (Criptograph)
- uuidv4 (Id generator)
- tsrynge (Dependency injection)
- dayjs(Date manipulation lib)
- Jest(Tests)
- Prettier
- EsLint
- Celebrate(Validation)
- Class-transformer (Class transformer)
