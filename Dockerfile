# Usando a versão estável do Node no Alpine (ultra leve)
FROM node:20-alpine

# Pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro para otimizar o cache de build
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm install --production

# Copia o código da aplicação (app.js)
COPY . .

# A porta que o Express está ouvindo
EXPOSE 3000

# Comando para iniciar
CMD ["node", "app.js"]