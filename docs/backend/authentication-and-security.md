# Autenticação e segurança

## 1. Objetivo

Definir a base de autenticação e segurança do MVP, sem extrapolar para uma arquitetura enterprise completa.

## 2. Autenticação

### Estratégia
- login via e-mail e senha
- emissão de JWT no back-end
- uso do token nas rotas protegidas

### Fluxo
1. usuário envia credenciais
2. back valida usuário e senha
3. senha é comparada com hash
4. back gera `accessToken`
5. token é usado nas chamadas subsequentes

## 3. Senha

- nunca armazenar senha em texto puro
- usar bcrypt para hash
- comparar com `bcrypt.compare`

## 4. JWT

### Payload sugerido
- `sub`
- `email`
- `name`

### Uso
- guard no Nest protege endpoints
- front injeta bearer token nas chamadas autenticadas

## 5. Rotas protegidas

Todos os módulos abaixo devem exigir autenticação:
- dashboard
- clients
- insurance-types
- policies

Auth é a única área pública no MVP.

## 6. ValidationPipe

A aplicação deve usar validação de DTOs para:
- formatos
- obrigatoriedade
- tipos
- enum values

## 7. Tratamento de erro

### 400
Payload inválido, campo ausente, enum inválido, data inconsistente etc.

### 401
Token ausente, inválido ou expirado; credenciais inválidas no login.

### 404
Registro não encontrado.

### 409
Conflito de unicidade, como CPF, e-mail ou número da apólice.

### 500
Erro inesperado.

## 8. CORS
O ambiente deve permitir configuração explícita de origem do front, sem liberalidade excessiva.

## 9. Boas práticas mínimas

- variáveis sensíveis em ambiente
- JWT secret fora do código
- hash de senha obrigatório
- sem dados sensíveis retornando em responses
- logs sem vazar senha/token

## 10. O que não entra no MVP
- refresh token
- revogação de sessão
- RBAC completo
- auditoria detalhada
- device/session management
