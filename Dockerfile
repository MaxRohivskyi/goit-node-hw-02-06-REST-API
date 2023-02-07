FROM  node:16.16.0-alpine

WORKDIR /src/server

COPY ./package.json .

RUN npm instal

COPY . .

EXPOSE 3000 

CMD npm run dev