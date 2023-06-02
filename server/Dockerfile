FROM node:16.0.0

ENV NODE_ENV=production

WORKDIR /e-commerce/server

RUN npm install -g yarn

COPY package.json .


RUN yarn install
RUN npm install -g @babel/core @babel/cli
RUN npm install -g nodemon

COPY . .

CMD ["yarn", "run", "build"]
