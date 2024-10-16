# task-manager-pjctv

Desafio: Desenvolvimento de uma Aplicação de Gerenciamento de Tarefas

## Frontend

Para instalação das dependências e execução do projeto:

```bash
npm install
npm run dev
```

Em seguida acessar [http://localhost:3000](http://localhost:3000).

## Backend

Para instalação das dependências e execução do projeto:

```bash
npm install
npx-prisma-generate
npm run dev
```

Foi utilizado para teste das rotas a API **Insomnia**.

Arquivo de exportação das rotas para teste

| routes_imnsomnia_export.json | 
| :-------- | 

Para acessar as rotas, utilizar [http://localhost:3333](http://localhost:3333).

## Banco de dados

Foi utilizado PostgreSQL para configuração do banco de dados. 

Criar um novo bd com o nome **task-manager-projectiva**, este que está configurado na variável de ambiente **.env**, presente no projeto.

Arquivo dump de exportação dos dados:

| task_manager_backup.sql | 
| :-------- | 

Estrutura criada:

![](https://i.imgur.com/3a1oxLi.png)

## Interfaces

Tela de Autenticação:

![](https://i.imgur.com/cdxNlKs.png)

Tela Dashboard:

![](https://i.imgur.com/OeN0wzG.png)

Modal Tasks da Squad:

![](https://i.imgur.com/4COC7o6.png)

Modal Equipe da Squad:

![](https://i.imgur.com/wD7QpeO.png)
