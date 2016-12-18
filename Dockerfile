# Author: Stefan Ragnar Viglundsson
# Last-modified: 17.12.16
# Script for building Docker
#-----------------------------------
FROM node
WORKDIR /app
COPY . .
# Installing npm in silent mode
RUN npm install --silent
ENV NODE_PATH .
EXPOSE 3000
# Running migrate.sh instead of run.js
CMD ["./migrate.sh"]

