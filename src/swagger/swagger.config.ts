export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Employee-Company API",
    version: "1.0.0",
    description: "API para gerenciamento de empresas e funcionários",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desenvolvimento",
    },
  ],
  tags: [
    { name: "Health", description: "Health check da API" },
    { name: "Companies", description: "Operações relacionadas a empresas" },
    { name: "Employees", description: "Operações relacionadas a funcionários" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Verifica o status da API",
        description: "Endpoint para verificar se a API está funcionando",
        responses: {
          "200": {
            description: "API funcionando corretamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/companies": {
      post: {
        tags: ["Companies"],
        summary: "Cria uma nova empresa",
        description: "Cadastra uma nova empresa no sistema",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "cnpj", "status"],
                properties: {
                  name: { 
                    type: "string", 
                    example: "ACME LTDA",
                    description: "Nome da empresa"
                  },
                  cnpj: { 
                    type: "string", 
                    example: "12345678901234",
                    description: "CNPJ com 14 dígitos numéricos"
                  },
                  sector: { 
                    type: "string", 
                    example: "Tecnologia",
                    description: "Setor de atuação (opcional)"
                  },
                  city: { 
                    type: "string", 
                    example: "São Paulo",
                    description: "Cidade onde está localizada (opcional)"
                  },
                  phone: { 
                    type: "string", 
                    example: "11999999999",
                    description: "Telefone de contato (opcional)"
                  },
                  status: { 
                    type: "string", 
                    enum: ["ativo", "inativo"], 
                    example: "ativo",
                    description: "Status da empresa"
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Empresa criada com sucesso",
          },
          "400": {
            description: "Dados de entrada inválidos",
          },
          "409": {
            description: "CNPJ já cadastrado no sistema",
          },
        },
      },
      get: {
        tags: ["Companies"],
        summary: "Lista todas as empresas",
        description: "Retorna a lista de todas as empresas cadastradas",
        responses: {
          "200": {
            description: "Lista de empresas retornada com sucesso",
          },
        },
      },
    },
    "/companies/{id}": {
      get: {
        tags: ["Companies"],
        summary: "Busca empresa por ID",
        description: "Retorna os dados de uma empresa específica",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID da empresa",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Empresa encontrada",
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Empresa não encontrada",
          },
        },
      },
      patch: {
        tags: ["Companies"],
        summary: "Atualiza dados de uma empresa",
        description: "Atualiza os dados de uma empresa existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  sector: { type: "string" },
                  city: { type: "string" },
                  phone: { type: "string" },
                  status: { type: "string", enum: ["ativo", "inativo"] },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Empresa atualizada com sucesso",
          },
          "400": {
            description: "Dados inválidos ou ID inválido",
          },
          "404": {
            description: "Empresa não encontrada",
          },
        },
      },
      delete: {
        tags: ["Companies"],
        summary: "Deleta uma empresa",
        description: "Remove uma empresa do sistema",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Empresa deletada com sucesso",
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Empresa não encontrada",
          },
        },
      },
    },
    "/employees": {
      post: {
        tags: ["Employees"],
        summary: "Cria um novo funcionário",
        description: "Cadastra um novo funcionário vinculado a uma empresa",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "role", "password", "companyId"],
                properties: {
                  name: { 
                    type: "string", 
                    example: "João Silva",
                    description: "Nome completo do funcionário"
                  },
                  email: { 
                    type: "string", 
                    example: "joao@example.com",
                    description: "Email do funcionário (único por empresa)"
                  },
                  role: { 
                    type: "string", 
                    example: "Desenvolvedor",
                    description: "Cargo do funcionário"
                  },
                  password: { 
                    type: "string", 
                    example: "senha123",
                    description: "Senha (mínimo 4 caracteres)"
                  },
                  companyId: { 
                    type: "string", 
                    example: "507f1f77bcf86cd799439011",
                    description: "ID da empresa"
                  },
                  status: { 
                    type: "string", 
                    enum: ["ativo", "inativo"],
                    description: "Status do funcionário (opcional, padrão: ativo)"
                  },
                  terminationDate: {
                    type: "string",
                    format: "date",
                    example: "2024-12-31",
                    description: "Data de desligamento (opcional)"
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Funcionário criado com sucesso",
          },
          "400": {
            description: "Dados inválidos ou companyId inválido",
          },
          "404": {
            description: "Empresa não encontrada",
          },
          "409": {
            description: "Email já cadastrado nesta empresa",
          },
        },
      },
    },
    "/employees/company/{companyId}": {
      get: {
        tags: ["Employees"],
        summary: "Lista funcionários de uma empresa",
        description: "Retorna todos os funcionários vinculados a uma empresa específica",
        parameters: [
          {
            name: "companyId",
            in: "path",
            required: true,
            description: "ID da empresa",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Lista de funcionários retornada com sucesso",
          },
          "400": {
            description: "companyId inválido",
          },
        },
      },
    },
    "/employees/{id}": {
      get: {
        tags: ["Employees"],
        summary: "Busca funcionário por ID",
        description: "Retorna os dados de um funcionário específico",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Funcionário encontrado",
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Funcionário não encontrado",
          },
        },
      },
      patch: {
        tags: ["Employees"],
        summary: "Atualiza dados de um funcionário",
        description: "Atualiza os dados de um funcionário existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                  password: { type: "string" },
                  status: { type: "string", enum: ["ativo", "inativo"] },
                  terminationDate: { type: "string", format: "date" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Funcionário atualizado com sucesso",
          },
          "400": {
            description: "Dados inválidos ou ID inválido",
          },
          "404": {
            description: "Funcionário não encontrado",
          },
          "409": {
            description: "Email já cadastrado para outro funcionário",
          },
        },
      },
      delete: {
        tags: ["Employees"],
        summary: "Deleta um funcionário",
        description: "Remove um funcionário do sistema",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Funcionário deletado com sucesso",
          },
          "400": {
            description: "ID inválido",
          },
          "404": {
            description: "Funcionário não encontrado",
          },
        },
      },
    },
  },
};