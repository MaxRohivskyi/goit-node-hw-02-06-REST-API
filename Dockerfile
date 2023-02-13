FROM  node:18.12.1-alpine

WORKDIR /src/server

COPY ./package.json .

RUN npm instal

COPY . .

EXPOSE 3000 

CMD npm start
