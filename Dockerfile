FROM node:18.16.0
WORKDIR /next
COPY package*.json .
RUN ["yarn", "install"]
COPY . .
RUN ["yarn", "build"]
ENTRYPOINT ["yarn", "start"]