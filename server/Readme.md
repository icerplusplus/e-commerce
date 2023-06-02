open mysql by docker:
docker exec -it <container-name> mysql<enviroment-name | image-name > -u root -p <database-name>

BUILD FRONTEND/BACKEND TO IMAGE:
docker build --tag e-commerce-backend || e-commerce-fontend .

CONFIG TO USE MYSQL IN VSCODE:

1. OPEN MYSQL CLIENT.
2. CREATE NEW MYSQL ACCOUNT IN SCRIPTS:
   -> CREATE USER 'sqluser'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
   -> GRANT ALL PRIVILEGES ON _._ TO 'sqluser'@'%';

RESET MYSQL PASSWORD:
docker run --name <container-name> -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0.33

CHECK MYSQL HOST IN DOCKER CONTAINER:
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container-name | container-id>

npx sequelize-cli db:seed:all