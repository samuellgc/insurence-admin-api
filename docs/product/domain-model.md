# Modelo de domínio

## 1. Entidades principais

O domínio do MVP é propositalmente enxuto. Há quatro entidades principais:

- User
- Client
- InsuranceType
- Policy

## 2. User

Representa o usuário autenticado do sistema administrativo.

### Responsabilidade
- realizar login
- acessar a área protegida
- operar o sistema

### Campos recomendados
- `id`
- `name`
- `email`
- `password`
- `createdAt`
- `updatedAt`

### Observações
Neste MVP, a entidade User não precisa ser ligada diretamente às demais entidades por ownership. O foco não é multi-tenant real, e sim uma base administrativa autenticada.

## 3. Client

Representa o cliente da operação de seguros.

### Responsabilidade
- armazenar dados cadastrais e de contato
- servir como vínculo principal para apólices

### Campos recomendados
- `id`
- `name`
- `cpf`
- `email`
- `phone`
- `birthDate`
- `cep`
- `street`
- `number`
- `district`
- `city`
- `state`
- `status`
- `createdAt`
- `updatedAt`

### Papel no domínio
Sem cliente, não existe apólice. Portanto, `Client` é uma entidade central do fluxo de cadastro.

## 4. InsuranceType

Representa o tipo de seguro oferecido internamente para contratação no sistema.

### Responsabilidade
- categorizar o produto segurado
- fornecer uma referência de produto para as apólices

### Campos recomendados
- `id`
- `name`
- `category`
- `description`
- `baseValue`
- `active`
- `createdAt`
- `updatedAt`

### Papel no domínio
É a entidade que dá contexto de produto à apólice.

## 5. Policy

Representa a apólice contratada.

### Responsabilidade
- consolidar a relação entre cliente e tipo de seguro
- armazenar vigência, status e valores operacionais

### Campos recomendados
- `id`
- `policyNumber`
- `monthlyValue`
- `coverageValue`
- `startDate`
- `endDate`
- `status`
- `clientId`
- `insuranceTypeId`
- `createdAt`
- `updatedAt`

### Papel no domínio
É a entidade mais importante do sistema. O dashboard, as consultas principais e parte do valor percebido da aplicação giram em torno da apólice.

## 6. Relacionamentos

### 6.1 Client -> Policy
- um cliente pode ter muitas apólices
- uma apólice pertence a um único cliente

**Relação:** `OneToMany / ManyToOne`

### 6.2 InsuranceType -> Policy
- um tipo de seguro pode estar presente em muitas apólices
- uma apólice pertence a um único tipo de seguro

**Relação:** `OneToMany / ManyToOne`

## 7. Enums do domínio

### 7.1 ClientStatus
- `ACTIVE`
- `INACTIVE`

### 7.2 InsuranceCategory
- `AUTO`
- `LIFE`
- `HOME`
- `BUSINESS`
- `TRAVEL`

### 7.3 PolicyStatus
- `PENDING`
- `ACTIVE`
- `CANCELED`
- `EXPIRED`

## 8. Diagrama textual de relacionamento

```txt
User
 └─ autentica acesso ao sistema

Client
 └─ 1:N -> Policy

InsuranceType
 └─ 1:N -> Policy

Policy
 ├─ N:1 -> Client
 └─ N:1 -> InsuranceType
```

## 9. Regras importantes derivadas do modelo

- Cliente e tipo de seguro são dependências obrigatórias para criação de apólice.
- O número da apólice deve ser único.
- O CPF do cliente deve ser único.
- O dashboard depende principalmente da entidade Policy.
- InsuranceType precisa existir mesmo que ainda não tenha sido usado em apólice.
- Client e InsuranceType devem poder permanecer no histórico mesmo se ficarem inativos.

## 10. Futuras extensões possíveis

Este modelo foi desenhado para aceitar crescimento sem quebrar a base atual. Evoluções possíveis:

- `Claim` para sinistro
- `PolicyHistory` para histórico de status
- `UserRole` para permissões
- `Address` como value object ou tabela separada
- `AuditLog`
- `Company` para multiempresa
- `DocumentAttachment`

Essas extensões não fazem parte do MVP, mas a organização modular já deve deixar espaço para elas.
