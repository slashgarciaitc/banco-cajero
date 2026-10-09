FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=3002
ENV DATA_DIR=/app/data
EXPOSE 3002

CMD ["node", "src/server.js"]
