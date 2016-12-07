FROM node
WORKDIR /app
COPY . .
RUN npm install --silent
ENV NODE_PATH .
EXPOSE 3000
CMD ["./migrate.sh"]

