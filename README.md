# Find a Friend 🐶😻

Este projeto consiste no desenvolvimento de uma aplicação para gerenciar a adoção de pets. A aplicação permite que organizações (ORGs) possam cadastrar pets disponíveis para adoção e que usuários interessados possam visualizar esses pets e entrar em contato com as ORGs. Durante o desenvolvimento, foram abordados conceitos como SOLID, Design Patterns, uso de Docker para iniciar o banco de dados, JWT e Refresh Token, RBAC, TDD e diversos outros conceitos.


## Protótipo da Aplicação
[Protótipo no Figma](https://www.figma.com/community/file/1220006040435238030)


### RFs (Requisitos funcionais) --> Ação que deve acontecer

✅ Deve ser possível cadastrar um pet <br/>
✅ Deve ser possível listar todos os pets disponíveis para adoção em uma cidade <br/>
✅ Deve ser possível filtrar pets por suas características <br/>
✅ Deve ser possível visualizar detalhes de um pet para adoção <br/>
✅ Deve ser possível se cadastrar como uma ORG <br/>
✅ Deve ser possível realizar login como uma ORG

### RNs (Regras de negócios) --> Condições para acontecer ou não

✅ Para listar os pets, obrigatoriamente precisamos informar a cidade <br/>
✅ Uma ORG precisa ter um endereço e um número de WhatsApp <br/>
✅ Um pet deve estar ligado a uma ORG <br/>
✅ O usuário que quer adotar, entrará em contato com a ORG via WhatsApp <br/>
✅ Todos os filtros, além da cidade, são opcionais <br/>
✅ Para uma ORG acessar a aplicação como admin, ela precisa estar logada <br/>





## ⚒️ Tecnologias Utilizadas

    🔴 Fastify
    🔴 Prisma
    🔴 PostgreSQ
    🔴 bcryptjs
    🔴 zod 
    🔴 vitest

## 🆘 Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js e npm instalados

### Passos para execução

1. Clone o repositório:
    ```bash
    git clone https://github.com/raul-santana/api-find-a-friend
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd api-find-a-friend
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o Docker Compose para configurar o banco de dados:
    ```bash
    docker-compose up -d
    ```
5. Configure as variáveis de ambiente no arquivo `.env` com as informações necessárias.
6. Execute as migrações do banco de dados:
    ```bash
    npm run prisma migrate dev
    ```
7. Inicie a aplicação em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
8. Para compilar a aplicação:
    ```bash
    npm run build
    ```
9. Para iniciar a aplicação em produção:
    ```bash
    npm start
    ```
10. Para rodar os testes unitários:
    ```bash
    npm run test
    ```
11. Para rodar os testes unitários em modo watch:
    ```bash
    npm run test:watch
    ```
12. Para rodar os testes de integração:
    ```bash
    npm run test:e2e
    ```
13. Para rodar os testes de integração em modo watch:
    ```bash
    npm run test:e2e:watch
    ```
14. Para verificar a cobertura de testes:
    ```bash
    npm run test:coverage
    ```
15. Para rodar os testes com interface gráfica:
    ```bash
    npm run test:ui
    ```
16. Para fazer o linting do código:
    ```bash
    npm run lint
    ```

## 🚀 Contribuições

Contribuições são bem-vindas! Por favor, siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch: `git checkout -b minha-nova-funcionalidade`.
3. Faça as alterações desejadas e adicione testes quando necessário.
4. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`.
5. Faça o push para a branch: `git push origin minha-nova-funcionalidade`.
6. Envie um pull request.