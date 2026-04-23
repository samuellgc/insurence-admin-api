# Boas práticas de back-end

## 1. Objetivo

Padronizar a implementação Nest.js + TypeORM para manter:
- legibilidade
- consistência
- previsibilidade
- baixo acoplamento
- aderência ao domínio

## 2. Padrões gerais

### 2.1 Controller magro
Controller não deve:
- validar regra de negócio complexa
- montar query complexa sem necessidade
- conhecer detalhes de persistência além do necessário

### 2.2 Service como centro de regra
Service deve:
- validar semântica de negócio
- verificar existência de entidades relacionadas
- tratar conflitos
- coordenar operações

### 2.3 DTOs explícitos
- um DTO por operação relevante
- nomes claros
- decorators de validação coerentes

## 3. TypeORM

### Regras
- preferir entities simples
- relations explícitas
- migrations obrigatórias
- não usar `synchronize: true` fora de contexto controlado de desenvolvimento local

### Valores monetários
- usar tipo decimal/numeric no banco
- não usar float para dinheiro

## 4. Queries

### Padrão
- paginação clara
- filtros documentados
- ordenação previsível

### Evitar
- carregar relacionamentos desnecessários
- query gigante sem encapsulamento
- lógica ad hoc repetida entre services

## 5. Erros de domínio

### Exemplos
- CPF duplicado -> conflito
- policyNumber duplicado -> conflito
- clientId inexistente -> not found ou bad request conforme abordagem
- endDate menor que startDate -> bad request

## 6. Segurança

- nunca retornar password
- nunca logar senha
- JWT secret em env
- tratar 401 claramente
- usar hash com bcrypt

## 7. Padronização de respostas

- listagens paginadas seguem contrato comum
- resources retornam nomes previsíveis
- dashboard tem endpoint próprio

## 8. Organização por módulo

Cada módulo deve conter:
- DTOs
- entity
- controller
- service
- module

Não misturar responsabilidades de domínios diferentes sem necessidade.

## 9. Nomes

- usar inglês técnico no código e rotas conforme já definido
- manter coerência entre nomes de entity, DTO, service e endpoint

## 10. Testabilidade
Mesmo sem construir suíte completa agora, a organização deve facilitar:
- testes de service
- validação de regras
- mocks de repositório

## 11. Comentários
Só comentar o que traz contexto de regra, decisão ou caveat importante. Não comentar o óbvio.
