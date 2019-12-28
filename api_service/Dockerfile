FROM node:8.16.2-buster-slim
WORKDIR /app
COPY *.json app.js ./
RUN [ "npm", "install" ]
ENTRYPOINT [ "node", "app.js" ]
EXPOSE 8080