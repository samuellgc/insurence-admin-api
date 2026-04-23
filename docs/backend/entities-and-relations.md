# Entidades e relacionamentos

## 1. Visão geral

Este documento detalha a modelagem recomendada com TypeORM.

## 2. User

### Objetivo
Representar o usuário que autentica no sistema.

### Campos recomendados
- `id: uuid`
- `name: string`
- `email: string`
- `password: string`
- `createdAt: Date`
- `updatedAt: Date`

### Regras
- `email` único
- `password` armazena hash

## 3. Client

### Objetivo
Representar o cliente cadastrado.

### Campos recomendados
- `id: uuid`
- `name: string`
- `cpf: string`
- `email: string`
- `phone: string`
- `birthDate: Date | null`
- `cep: string | null`
- `street: string | null`
- `number: string | null`
- `district: string | null`
- `city: string | null`
- `state: string | null`
- `status: ClientStatus`
- `createdAt: Date`
- `updatedAt: Date`

### Regras
- `cpf` único
- `email` idealmente único ou ao menos validado contra duplicidade
- `status` enum

## 4. InsuranceType

### Objetivo
Representar o tipo de seguro ofertado no sistema.

### Campos recomendados
- `id: uuid`
- `name: string`
- `category: InsuranceCategory`
- `description: string | null`
- `baseValue: decimal`
- `active: boolean`
- `createdAt: Date`
- `updatedAt: Date`

### Regras
- `baseValue` maior que zero
- `category` enum
- `active` default true

## 5. Policy

### Objetivo
Representar a apólice.

### Campos recomendados
- `id: uuid`
- `policyNumber: string`
- `monthlyValue: decimal`
- `coverageValue: decimal`
- `startDate: Date`
- `endDate: Date`
- `status: PolicyStatus`
- `clientId: uuid`
- `insuranceTypeId: uuid`
- `createdAt: Date`
- `updatedAt: Date`

### Regras
- `policyNumber` único
- `monthlyValue` > 0
- `coverageValue` > 0
- `endDate` > `startDate`

## 6. Relacionamentos TypeORM

### Client
```ts
@OneToMany(() => Policy, (policy) => policy.client)
policies: Policy[];
```

### InsuranceType
```ts
@OneToMany(() => Policy, (policy) => policy.insuranceType)
policies: Policy[];
```

### Policy -> Client
```ts
@ManyToOne(() => Client, (client) => client.policies, { nullable: false })
@JoinColumn({ name: 'client_id' })
client: Client;
```

### Policy -> InsuranceType
```ts
@ManyToOne(() => InsuranceType, (insuranceType) => insuranceType.policies, { nullable: false })
@JoinColumn({ name: 'insurance_type_id' })
insuranceType: InsuranceType;
```

## 7. Enums

### ClientStatus
- `ACTIVE`
- `INACTIVE`

### InsuranceCategory
- `AUTO`
- `LIFE`
- `HOME`
- `BUSINESS`
- `TRAVEL`

### PolicyStatus
- `PENDING`
- `ACTIVE`
- `CANCELED`
- `EXPIRED`

## 8. Observações de modelagem

- usar `uuid` como identificador é recomendável
- campos monetários devem ser tratados com atenção (`decimal`)
- evitar `float` para valores financeiros
- timestamps devem ser padronizados
- nomes de coluna podem seguir snake_case no banco e camelCase na aplicação

## 9. Integridade referencial

- não permitir policy sem client
- não permitir policy sem insuranceType
- tratar exclusão de client/insuranceType com atenção, preferindo inativação em contextos com histórico
