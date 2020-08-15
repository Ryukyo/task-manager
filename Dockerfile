FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /usr/src
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY ./src .
COPY ./public ./public
EXPOSE 3000
CMD npm start