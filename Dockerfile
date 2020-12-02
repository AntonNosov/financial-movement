FROM node:12 AS backend
WORKDIR /app
RUN npm config set registry http://registry.npmjs.org
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
ENV NODE=production
CMD npm run start:prod