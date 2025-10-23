# Etapa 1: imagem leve com Node
FROM node:18-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia apenas arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código
COPY . .

# Exposição da porta de dev React
EXPOSE 3000

# Comando padrão
CMD ["npm", "run", "dev", "--", "--host"]
