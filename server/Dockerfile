FROM node:16.0.0

ENV NODE_ENV=production

WORKDIR /e-commerce/server

COPY package.json .

RUN npm install -g nodemon
RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm install @babel/preset-env

RUN npm run build-src

CMD ["npm", "run", "build"]
