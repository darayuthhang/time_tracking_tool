FROM node:16-alpine

#tell docker to run configure in this app directory
WORKDIR /usr/app
#copy source code into image
#copy our current ditrect to new folder call app

RUN npm install -g nodemon
RUN npm install bcrypt
RUN npm install -g knex

COPY package.json .
COPY knexfile.js .
RUN npm install && npm cache clean --force

COPY . .

EXPOSE 5000

CMD ["npm", "run" , "start"]
