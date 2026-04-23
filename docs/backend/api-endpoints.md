# Endpoints da API

## 1. Convenções gerais

### Base
Exemplo:
`/auth`, `/clients`, `/insurance-types`, `/policies`, `/dashboard`

### Formato
API REST JSON.

### Padrão de paginação sugerido
Query params:
- `page`
- `limit`
- filtros específicos por recurso

### Resposta paginada sugerida
```json
{
  "items": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

## 2. Auth

### POST /auth/login

#### Request
```json
{
  "email": "admin@insurance.com",
  "password": "123456"
}
```

#### Response 200
```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@insurance.com"
  }
}
```

#### Regras
- credenciais inválidas retornam 401
- nunca retornar password hash

## 3. Clients

### GET /clients
Lista clientes paginados.

#### Query params suportados
- `search`
- `status`
- `page`
- `limit`

#### Exemplo
`GET /clients?search=joao&status=ACTIVE&page=1&limit=10`

#### Response 200
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "João Silva",
      "cpf": "12345678900",
      "email": "joao@email.com",
      "phone": "85999999999",
      "city": "Fortaleza",
      "state": "CE",
      "status": "ACTIVE",
      "createdAt": "2026-04-23T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /clients/:id
Busca um cliente específico.

#### Response 200
```json
{
  "id": "uuid",
  "name": "João Silva",
  "cpf": "12345678900",
  "email": "joao@email.com",
  "phone": "85999999999",
  "birthDate": "1990-01-10",
  "cep": "60000000",
  "street": "Rua Exemplo",
  "number": "123",
  "district": "Centro",
  "city": "Fortaleza",
  "state": "CE",
  "status": "ACTIVE",
  "createdAt": "2026-04-23T10:00:00.000Z",
  "updatedAt": "2026-04-23T10:00:00.000Z"
}
```

### POST /clients
Cria cliente.

#### Request
```json
{
  "name": "João Silva",
  "cpf": "12345678900",
  "email": "joao@email.com",
  "phone": "85999999999",
  "birthDate": "1990-01-10",
  "cep": "60000000",
  "street": "Rua Exemplo",
  "number": "123",
  "district": "Centro",
  "city": "Fortaleza",
  "state": "CE",
  "status": "ACTIVE"
}
```

#### Response 201
Mesma estrutura do recurso criado.

### PATCH /clients/:id
Atualiza cliente.

### DELETE /clients/:id
Remove ou inativa cliente, conforme decisão final de implementação.

## 4. Insurance Types

### GET /insurance-types
#### Query params
- `search`
- `active`
- `category`
- `page`
- `limit`

### Response 200
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Seguro Auto",
      "category": "AUTO",
      "description": "Cobertura básica para veículos",
      "baseValue": 250.00,
      "active": true,
      "createdAt": "2026-04-23T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /insurance-types/:id
Busca tipo de seguro específico.

### POST /insurance-types
#### Request
```json
{
  "name": "Seguro Auto",
  "category": "AUTO",
  "description": "Cobertura básica para veículos",
  "baseValue": 250.00,
  "active": true
}
```

### PATCH /insurance-types/:id
Atualiza tipo de seguro.

### DELETE /insurance-types/:id
Remove ou inativa conforme estratégia adotada.

## 5. Policies

### GET /policies
#### Query params
- `search`
- `clientId`
- `insuranceTypeId`
- `status`
- `startDateFrom`
- `startDateTo`
- `page`
- `limit`

#### Exemplo
`GET /policies?status=ACTIVE&clientId=uuid&page=1&limit=10`

#### Response 200
```json
{
  "items": [
    {
      "id": "uuid",
      "policyNumber": "POL-2026-0001",
      "monthlyValue": 350.00,
      "coverageValue": 100000.00,
      "startDate": "2026-01-01",
      "endDate": "2026-12-31",
      "status": "ACTIVE",
      "client": {
        "id": "uuid-client",
        "name": "João Silva"
      },
      "insuranceType": {
        "id": "uuid-type",
        "name": "Seguro Auto",
        "category": "AUTO"
      },
      "createdAt": "2026-04-23T10:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### GET /policies/:id
Busca detalhe de apólice.

### POST /policies
#### Request
```json
{
  "clientId": "uuid-client",
  "insuranceTypeId": "uuid-type",
  "policyNumber": "POL-2026-0001",
  "monthlyValue": 350.00,
  "coverageValue": 100000.00,
  "startDate": "2026-01-01",
  "endDate": "2026-12-31",
  "status": "ACTIVE"
}
```

### PATCH /policies/:id
Atualiza apólice.

### DELETE /policies/:id
Remove ou altera status conforme estratégia adotada.

## 6. Dashboard

### GET /dashboard/summary

#### Response 200
```json
{
  "totalClients": 25,
  "totalActiveInsuranceTypes": 4,
  "totalActivePolicies": 19,
  "totalMonthlyValue": 15870.50,
  "policiesByStatus": [
    { "status": "ACTIVE", "count": 19 },
    { "status": "PENDING", "count": 4 },
    { "status": "CANCELED", "count": 2 }
  ],
  "policiesByInsuranceType": [
    { "type": "AUTO", "count": 10 },
    { "type": "LIFE", "count": 5 }
  ],
  "latestPolicies": [
    {
      "id": "uuid",
      "policyNumber": "POL-2026-0001",
      "clientName": "João Silva",
      "insuranceTypeName": "Seguro Auto",
      "status": "ACTIVE",
      "monthlyValue": 350.00,
      "createdAt": "2026-04-23T10:00:00.000Z"
    }
  ]
}
```

## 7. Erros padronizados sugeridos

### 400
```json
{
  "statusCode": 400,
  "message": [
    "cpf must be a string"
  ],
  "error": "Bad Request"
}
```

### 401
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 404
```json
{
  "statusCode": 404,
  "message": "Client not found",
  "error": "Not Found"
}
```

### 409
```json
{
  "statusCode": 409,
  "message": "CPF already exists",
  "error": "Conflict"
}
```
