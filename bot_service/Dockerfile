FROM node:8.16.2-buster-slim
WORKDIR /app
COPY *.json bot.js ./
RUN [ "npm", "install" ]
ENTRYPOINT [ "node", "bot.js" ]