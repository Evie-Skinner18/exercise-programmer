FROM node:14
ENV DB_NAME=exercise_programmer
ENV PORT=5001
ENV REACT_APP_ORIGIN=http://localhost:3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5001
CMD [ "npm", "run", "prod" ]