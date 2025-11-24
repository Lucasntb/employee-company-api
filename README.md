# Employee-Company API

API desenvolvida com **Node.js**, **Express**, **TypeScript** e **Mongoose** para gerenciamento de **empresas** e **funcionários**, incluindo validação com **Zod**, documentação com **Swagger**, testes com **Jest** containers Docker e conventional commits pattern.

---

## Funcionalidades

- CRUD completo para **Empresas**
- CRUD completo para **Funcionários**
- Listagem de funcionários por empresa
- Validação de entrada com **Zod**
- Middleware global de tratamento de erros
- Middleware de logging de requisições
- Documentação com **Swagger UI**
- Containers Docker para API e MongoDB
- Testes unitários
- Arquitetura organizada (controllers, services, repositories)

---

## Tecnologias Utilizadas

- Node.js (TypeScript)
- Express.js
- MongoDB + Mongoose
- Zod
- Swagger UI
- Jest + ts-jest
- Docker e Docker Compose

---

# **Executando o Projeto com Docker**

### Criar o arquivo `.env`

```env
PORT=3000
MONGO_USER=root
MONGO_PASS=root
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DB=ce_db
```

### Subir os containers
```
docker-compose up --build -d
```

### Testar se a API está funcionando
```
http://localhost:3000/health
```

### Executando os Testes

Os testes são executados localmente (fora do Docker):
```
npm test
```

### Documentação da API (Swagger)

Com a API rodando:
Acesse:
http://localhost:3000/api-docs/



<details>
  <summary><strong>Checklist do Desafio (clique para expandir)</strong></summary>

## ✔ Requisitos Obrigatórios
- [x] CRUD de Empresa  
- [x] CRUD de Funcionário  
- [x] Funcionário vinculado a uma empresa existente  
- [x] Validação dos dados obrigatórios  
- [x] Código organizado e modular  

## ✔ Diferenciais
- [x] Docker (API + MongoDB)  
- [x] Documentação das rotas (Swagger)  
- [x] Testes unitários

</details>

