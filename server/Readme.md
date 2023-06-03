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

OPEN TERMINAL IN DB CONTAINER:
docker exec -it my-data_name bash


My final personal project in university, about: 
1. Frontend: ReactJS
2. Backend: ExpressJS
- This backend was build with MVC pattern and REST API
- A lot of features on it:
  + Authentication/Authorization with JWT - Json web token
  + Allow get list, create, update, and delete: user, product, category,...
  + Allow client payment with VnPay, Papal, Stripe, ... when they buy something in this shop
  + Client can rate and comment under the description
3. Database: MySQL (using Sequelize-cli to work)

My final personal project in university, about: 
1. Frontend: ReactJS
2. Backend: ExpressJS
3. Database: MySQL (using Sequelize-cli to work)