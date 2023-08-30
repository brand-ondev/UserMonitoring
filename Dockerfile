FROM node:16.14.0-alpine3.14

COPY . ./src

WORKDIR /src

RUN npm install -g npm@latest --quiet

RUN npm i --quiet

RUN npm run prisma:generate

RUN npm run build

COPY dist .

RUN npm install pm2 -g

CMD ["pm2-runtime", "npm run start:prod"]

EXPOSE 8080