# AGENTS.md - Back-end

## Objetivo

Este arquivo define as instruções obrigatórias para qualquer agente de IA que vá atuar no back-end do projeto.

O agente deve sempre ler o contexto documental antes de criar entidades, endpoints, DTOs, serviços, migrations ou regras.

## Ordem obrigatória de leitura

Antes de qualquer ação no back-end, ler nesta ordem:

1. `./docs/README.md`
2. `./docs/product/vision-and-scope.md`
3. `./docs/product/business-rules.md`
4. `./docs/product/domain-model.md`
5. `./docs/architecture/system-overview.md`
6. `./docs/backend/backend-architecture.md`
7. `./docs/backend/entities-and-relations.md`
8. `./docs/backend/authentication-and-security.md`
9. `./docs/backend/api-endpoints.md`
10. `./docs/backend/backend-best-practices.md`
11. `./docs/shared/conventions.md`

## Decisões obrigatórias já fechadas

- Back-end em **Nest.js**
- Persistência com **TypeORM**
- Banco **PostgreSQL**
- Autenticação com **JWT**
- Hash de senha com **bcrypt**
- Migrations obrigatórias
- `synchronize: false`

## Domínio fechado do MVP

- Auth
- Clients
- Insurance Types
- Policies
- Dashboard

O agente não deve inventar novos módulos fora do escopo sem instrução explícita.

## Regras de implementação

### 1. Estrutura modular
Separar:
- DTOs
- entities
- controllers
- services
- modules

### 2. Regras de negócio
Seguir estritamente `../docs/product/business-rules.md`.

Exemplos importantes:
- CPF único
- número da apólice único
- policy precisa de client e insurance type válidos
- endDate maior que startDate
- valores monetários positivos

### 3. Endpoints
Seguir `../docs/backend/api-endpoints.md` para:
- nomes
- filtros
- paginação
- formatos de resposta

### 4. Segurança
- nunca retornar password
- rotas privadas protegidas com JWT
- tratar 401, 404, 409 e 400 corretamente
- JWT secret em env

### 5. Banco e modelagem
- usar decimal/numeric para dinheiro
- usar relações explícitas
- evitar modelagem frouxa que enfraqueça integridade

## O que o agente não deve fazer

- usar Prisma
- usar `synchronize: true` como padrão
- misturar regra de negócio forte dentro do controller
- criar contratos diferentes dos documentados
- usar nomes de domínio inconsistentes
- ignorar paginação nas listagens principais

## Checklist antes de finalizar qualquer entrega de back

- leu os docs obrigatórios?
- está usando Nest + TypeORM + PostgreSQL?
- os DTOs refletem o domínio documentado?
- as regras de negócio estão aplicadas?
- os endpoints seguem o contrato?
- responses e erros estão consistentes?
- as entidades estão coerentes com os relacionamentos?
