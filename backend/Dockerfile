FROM node:23

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Ждем чтобы контейнеры запустились 
CMD sleep 10 && yarn typeorm migration:run && yarn start:dev
