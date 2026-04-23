# Convenções compartilhadas

## 1. Idioma

### Código
- inglês para nomes de entidades, classes, enums, DTOs, services e rotas

### Documentação
- português, com termos técnicos em inglês quando fizer sentido

### Interface
A interface pode permanecer em português para facilitar apresentação e coerência com o contexto local.

## 2. Nomenclatura de domínios

- `Client`
- `InsuranceType`
- `Policy`
- `User`

Evitar criar sinônimos concorrentes como:
- customer
- insuredClient
- insurancePlan
- contract

## 3. Datas

### Back-end
Retornar timestamps em formato ISO quando fizer sentido.

### Front-end
Formatar visualmente para o padrão local na interface.

## 4. Dinheiro

### Banco
- usar `decimal/numeric`

### API
- retornar número ou string conforme estratégia adotada
- manter consistência absoluta

### UI
- formatar como moeda local

## 5. Paginação

Todas as listagens principais devem seguir padrão:
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

## 6. Estados visuais obrigatórios
No front, toda tela de listagem deve prever:
- loading
- erro
- vazio
- sem resultados

## 7. Contratos de status

### ClientStatus
- `ACTIVE`
- `INACTIVE`

### PolicyStatus
- `PENDING`
- `ACTIVE`
- `CANCELED`
- `EXPIRED`

### InsuranceCategory
- `AUTO`
- `LIFE`
- `HOME`
- `BUSINESS`
- `TRAVEL`

Front e back devem compartilhar esses valores sem divergência.

## 8. Layout e experiência
Qualquer implementação de tela deve respeitar:
- page header padronizado
- cards como superfície principal
- paleta definida
- densidade média
- aparência corporativa limpa

## 9. Critério para novas abstrações
Só criar abstrações compartilhadas quando:
- houver reuso real
- a documentação apontar padrão consolidado
- a extração melhorar clareza e não só “organização aparente”
