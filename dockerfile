FROM node:14

WORKDIR /samyalliance-app

COPY . .

RUN npm install

EXPOSE 5000

CMD npm run seed && npm start

