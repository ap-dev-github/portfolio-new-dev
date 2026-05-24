FROM node:20-slim

WORKDIR /app

ENV PORT=8080
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build


EXPOSE 8080

CMD ["npm", "run", "start"]
