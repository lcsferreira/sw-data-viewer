## SW Data Viewer

Aplicação React que exibe dados do universo Star Wars (filmes, personagens, espécies e planetas), consumindo a API pública. O projeto foi iniciado com Create React App (CRA) e oferece suporte a desenvolvimento local com Node e a um ambiente de desenvolvimento via Docker/Compose com hot-reload.

### Stack

- React 17 + TypeScript
- React Router 6
- Ant Design 5 + styled-components
- Axios
- React Scripts (CRA)

---

## Requisitos

- Node 18 LTS (se executar localmente sem Docker)
- NPM 9+ ou compatível com Node 18
- Docker Desktop e Docker Compose v2 (se executar via Docker)

---

## Variáveis de ambiente

A aplicação lê a URL base da API de `process.env.REACT_APP_SWAPI_URL`.

Exemplo de `.env` na raiz do projeto:

```
REACT_APP_SWAPI_URL=https://swapi.dev/api
```

Importante:

- Em tempo de execução no container, o Compose carrega o arquivo `.env` automaticamente (veja `docker-compose.yml`).
- Em ambiente local (sem Docker), crie o arquivo `.env` na raiz antes de iniciar `npm start`.

---

## Instalação (sem Docker)

1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure o `.env` conforme acima.

---

## Execução em desenvolvimento (sem Docker)

```bash
npm start
```

- Acesse `http://localhost:3000`.
- Hot-reload habilitado via CRA.

Scripts úteis:

- `npm test`: executa testes em modo watch.
- `npm run build`: gera build de produção em `build/`.

---

## Execução em desenvolvimento com Docker/Compose (recomendado)

Este modo simula um ambiente de DEV isolado, com dependências imutáveis e hot-reload via bind mounts.

Pré-requisitos:

- Docker Desktop em execução
- Arquivo `.env` com `REACT_APP_SWAPI_URL` devidamente configurado

Subir o ambiente:

```bash
docker compose up --build
```

Detalhes relevantes do `docker-compose.yml`:

- Porta mapeada: `3000:3000`
- Volume: `.:/app` (hot-reload) e `/app/node_modules` como diretório interno
- Comando: `npm run dev -- --host` para expor o servidor do CRA no container
- Nome do container: `sw-data-viewer`

Acesse a aplicação em `http://localhost:3000`.

Parar/limpar:

```bash
docker compose down
```

## Estrutura de pastas (resumo)

```
src/
  api/            # axios instance, models e services
  components/     # componentes UI (Cards, Carrossel, Detalhes, etc.)
  pages/          # rotas de páginas (Home, Movies, Characters)
  routes/         # configuração das rotas
  context/        # contextos (Theme, etc.)
  hooks/          # hooks reutilizáveis
  helpers/        # formatadores e utilitários
```

---

## Testes

- `npm test`: executa com Jest/Testing Library (CRA).

## Troubleshooting

- Porta 3000 ocupada: pare serviços que usam a porta ou altere o mapeamento no Compose.
- Variáveis de ambiente não aplicadas: confirme o nome correto (`REACT_APP_SWAPI_URL`), a presença do `.env` e reinicie o container.

---

## Notas de arquitetura

- A baseURL da API é configurada em tempo de build/execução via `REACT_APP_SWAPI_URL`. Não use valores embutidos no código.
- O projeto segue a separação por domínios (api/services/models, components e pages), facilitando manutenção e evolução.

---
