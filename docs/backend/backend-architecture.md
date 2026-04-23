# Arquitetura do back-end

## 1. Stack do back-end

- Nest.js
- TypeORM
- PostgreSQL
- JWT
- bcrypt
- class-validator
- class-transformer

## 2. Objetivo arquitetural

O back-end deve fornecer uma API REST organizada, modular e legível, capaz de sustentar:
- autenticação
- CRUD de clientes
- CRUD de tipos de seguro
- CRUD de apólices
- agregações simples para dashboard

## 3. Estrutura de módulos

Estrutura recomendada:

```txt
src/
  main.ts
  app.module.ts
  common/
  config/
  database/
  auth/
  users/
  clients/
  insurance-types/
  policies/
  dashboard/
```

## 4. Responsabilidade dos módulos

### 4.1 Auth
- login
- validação de credenciais
- emissão de JWT
- guardas e strategy

### 4.2 Users
- leitura/manutenção do usuário autenticável
- apoio ao fluxo de auth

### 4.3 Clients
- CRUD de clientes
- filtros e paginação
- validações de unicidade

### 4.4 Insurance Types
- CRUD de tipos de seguro
- filtros e paginação

### 4.5 Policies
- CRUD de apólices
- validações relacionais
- filtros e paginação
- integridade de vigência e status

### 4.6 Dashboard
- agregações e resumos operacionais
- endpoint próprio para cards e blocos analíticos

## 5. Padrão de camadas

O back deve seguir, no mínimo, esta separação:

### Controller
- recebe request
- valida DTO
- delega para service
- não concentra regra de negócio

### Service
- concentra regra de negócio
- orquestra repositórios
- trata validações semânticas
- monta retornos de domínio/aplicação

### Entity / Repository
- mapeamento relacional
- persistência
- consultas e relacionamentos

## 6. TypeORM

### Estratégia
O projeto usará TypeORM por seu encaixe natural em sistemas corporativos orientados a entidades, relacionamentos e repositórios.

### Diretrizes
- usar entities claras
- definir relations explicitamente
- usar migrations
- `synchronize: false`
- não misturar regra de negócio dentro da entity

## 7. Banco de dados

### Banco
- PostgreSQL

### Motivos
- ambiente relacional consistente
- bom suporte no ecossistema Nest + TypeORM
- aderência a sistemas corporativos

## 8. Entidades principais
- User
- Client
- InsuranceType
- Policy

## 9. Segurança

### Autenticação
- JWT
- senha hasheada com bcrypt

### Autorização
Neste MVP, o foco é autenticação simples. Não há RBAC completo.

### Proteção de endpoints
Todos os endpoints privados devem exigir guard JWT.

## 10. Erros

O back-end deve retornar erros claros, previsíveis e coerentes.

Exemplos:
- 400 para payload inválido
- 401 para autenticação ausente ou inválida
- 404 para recurso inexistente
- 409 para conflitos de unicidade
- 500 para falhas inesperadas

## 11. Dashboard como módulo próprio

O dashboard não deve ser montado no front a partir de múltiplos endpoints independentes no MVP.

### Motivo
- simplifica front
- centraliza regra agregada
- permite otimização futura

Portanto, deve existir um endpoint como:
- `GET /dashboard/summary`

## 12. Evolução futura

A arquitetura deve permitir, no futuro:
- RBAC
- auditoria
- histórico
- sinistros
- multiempresa
- integrações adicionais

Sem obrigar reescrita total do núcleo atual.
