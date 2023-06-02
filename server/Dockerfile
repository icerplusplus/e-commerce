FROM node:16.0.0

WORKDIR /e-commerce/api

COPY package.json .

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD ["npm", "run", "build"]
