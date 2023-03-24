FROM node:14
ENV REACT_APP_API_BASE_URL=http://localhost:5001/api/

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start" ]