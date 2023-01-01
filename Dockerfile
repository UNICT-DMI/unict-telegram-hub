FROM node:18.12.1
WORKDIR /next
COPY package*.json .
RUN ["yarn", "install"]
COPY . .
RUN ["yarn", "build"]
ENTRYPOINT ["yarn", "start"]