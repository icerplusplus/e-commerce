FROM node:16.0.0

WORKDIR /e-commerce/server

ENV NODE_ENV=production

COPY package.json .

RUN npm install
RUN npm install -g nodemon  @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD ["npm", "run", "build"]
