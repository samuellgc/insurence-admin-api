# Visão geral do sistema

## 1. Arquitetura em alto nível

O projeto será dividido em duas aplicações principais:

### Front-end
- Angular 21
- CSR only
- Angular Material
- SPA administrativa autenticada

### Back-end
- Nest.js
- TypeORM
- PostgreSQL
- API REST com autenticação JWT

## 2. Fluxo macro da aplicação

1. O usuário acessa a aplicação Angular.
2. A tela inicial relevante é o login.
3. O front envia credenciais para o back.
4. O back autentica o usuário e retorna `accessToken`.
5. O front salva o token de acordo com a estratégia escolhida.
6. As rotas privadas passam a ser acessíveis.
7. O front consome a API autenticada para:
   - dashboard
   - clientes
   - tipos de seguro
   - apólices

## 3. Estratégia de renderização do front

### Decisão
O front será implementado como **Client-Side Rendering (CSR)**.

### Justificativa
- o projeto é um painel administrativo autenticado
- SEO não é prioridade
- a navegação depende de contexto do usuário logado
- SSR aumentaria complexidade sem ganho proporcional neste MVP

### Implicações
- não haverá SSR
- não haverá prerender
- não haverá preocupação de hydration no escopo do projeto
- o foco está em UX administrativa de SPA

## 4. Organização da solução

A solução deve ser pensada como um sistema com três camadas conceituais:

### 4.1 Camada de apresentação
Angular 21
- telas
- layout
- componentes
- formulários
- tabelas
- feedback visual
- navegação
- consumo da API

### 4.2 Camada de aplicação
Nest.js
- controllers
- DTOs
- services
- autenticação
- orquestração de regras
- paginação e filtros

### 4.3 Camada de persistência
PostgreSQL + TypeORM
- entidades
- relacionamentos
- migrations
- queries
- constraints

## 5. Módulos de negócio do sistema

O sistema é composto por cinco áreas funcionais:

- Auth
- Dashboard
- Clients
- Insurance Types
- Policies

Cada uma delas deve existir no front e no back como unidade organizacional clara.

## 6. Princípios arquiteturais

### 6.1 Clareza sobre complexidade
O projeto deve soar profissional, mas não deve ser superengenheirado. Priorizar:
- boa estrutura
- nomes claros
- separação por feature
- responsabilidade bem definida

### 6.2 Consistência entre front e back
Nomes de módulo, entidades, filtros, enums e rotas devem ser coerentes entre as duas camadas.

### 6.3 Foco em manutenção
A arquitetura precisa ser legível por alguém que acabou de entrar no projeto.

### 6.4 Interface orientada à operação
Como se trata de sistema administrativo, a arquitetura do front deve priorizar:
- eficiência operacional
- previsibilidade
- reuso de componentes de tabela, filtro, formulário e página

## 7. Integração externa

A integração externa prevista no MVP é com **ViaCEP**.

### Papel da integração
- enriquecer o cadastro de cliente
- demonstrar consumo de API externa no front

### Escopo dessa integração
- disparada a partir do formulário de cliente
- consulta via CEP
- preenchimento automático de campos de endereço
- tratamento de loading e erro

## 8. Considerações de segurança

### Front
- guard é mecanismo de UX, não segurança real
- interceptor deve enviar token nas chamadas autenticadas

### Back
- autenticação via JWT
- senhas com hash
- rotas protegidas
- validação de payload com DTOs
- tratamento consistente de erros

## 9. Considerações de UX arquitetural

A arquitetura do sistema deve apoiar as decisões de UX já definidas:

- layout com sidebar + header + área de conteúdo
- telas de listagem com cabeçalho, filtros, tabela e paginação
- formulários divididos em seções de negócio
- dashboard operacional enxuto
- estados de loading, erro e vazio previstos desde a estrutura de componentes

## 10. Escalabilidade controlada

Mesmo sendo um MVP, o sistema deve ser preparado para crescimento razoável sem refatoração total. Isso significa:
- módulos bem separados
- documentação clara
- componentes reutilizáveis no front
- entidades e relações bem modeladas no back
- migrations em vez de `synchronize` em produção
