# Documentação do projeto

Esta pasta centraliza todo o contexto necessário para desenvolvimento consistente do **Insurance Admin System**.

O objetivo desta documentação é evitar:
- decisões de implementação sem contexto
- inconsistência entre front-end e back-end
- divergência entre regra de negócio e UI
- criação de telas ou endpoints fora do escopo
- perda das definições visuais e arquiteturais já acordadas

## Estrutura

### `product/`
Documentos de produto e negócio:
- visão do sistema
- escopo mínimo
- regras de negócio
- modelo de domínio

### `architecture/`
Documentos de arquitetura e experiência:
- visão sistêmica
- decisões técnicas globais
- layout e diretrizes de UI/UX

### `frontend/`
Documentos específicos do front-end:
- arquitetura Angular 21
- estrutura de rotas e módulos por feature
- especificação de layout
- boas práticas de implementação

### `backend/`
Documentos específicos do back-end:
- arquitetura Nest.js
- entidades e relacionamentos
- autenticação e segurança
- endpoints, filtros, respostas e erros
- boas práticas de implementação

### `shared/`
Convenções compartilhadas entre front e back:
- nomenclatura
- contratos
- padronização de datas, enums e responses
- princípios de consistência entre camadas

## Ordem sugerida de leitura para qualquer pessoa ou agente

1. `product/vision-and-scope.md`
2. `product/business-rules.md`
3. `architecture/system-overview.md`
4. `architecture/layout-and-ui-guidelines.md`
5. documentação específica do front ou back
6. `shared/conventions.md`

## Decisões já fechadas

- O projeto é um **painel administrativo autenticado**
- O domínio é **gestão de seguros**
- O front será feito em **Angular 21**
- A estratégia de renderização do front será **CSR only**
- **SSR não será utilizado** neste MVP
- O back será feito em **Nest.js + TypeORM + PostgreSQL**
- O projeto deve ter aparência de **sistema corporativo moderno**, com foco em legibilidade, confiabilidade, clareza operacional e viabilidade de implementação com Angular Material
