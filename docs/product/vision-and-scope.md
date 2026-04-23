# Visão do produto e escopo

## 1. Visão geral

O **Insurance Admin System** é um sistema administrativo autenticado voltado à gestão operacional de seguros. O projeto foi pensado para simular um ambiente corporativo real, com foco em atividades comuns de operação e cadastro:

- autenticação do usuário
- gestão de clientes
- gestão de tipos de seguro
- gestão de apólices
- visualização de métricas operacionais em dashboard

O objetivo do projeto não é reproduzir a complexidade completa de uma seguradora real. O foco é construir uma aplicação enxuta, porém profissional, que demonstre domínio técnico de Angular + Nest em um cenário coerente com o domínio de seguros.

## 2. Objetivos do projeto

Este projeto precisa cumprir simultaneamente quatro objetivos:

### 2.1 Objetivo técnico
Servir como base prática para aprofundamento em:
- Angular 21
- Angular Material
- autenticação em SPA
- formulários reativos
- tabelas com filtros
- integração com APIs
- Nest.js
- TypeORM
- PostgreSQL
- modelagem relacional
- JWT
- estrutura modular

### 2.2 Objetivo de portfólio
Apresentar um sistema com:
- domínio de negócio coerente
- aparência profissional
- arquitetura organizada
- UI/UX consistente
- separação clara entre responsabilidades

### 2.3 Objetivo de entrevista
Permitir ao desenvolvedor explicar com segurança:
- por que escolheu Angular 21 + CSR
- como organizou a aplicação por feature
- como protegeu a área autenticada
- como modelou clientes, tipos de seguro e apólices
- como desenhou o dashboard
- como aplicou decisões visuais e de produto em um sistema administrativo

### 2.4 Objetivo de padronização
Criar uma base documental suficientemente detalhada para orientar agentes de IA, futuros desenvolvedores e qualquer evolução do projeto sem perda de consistência.

## 3. Escopo funcional do MVP

O MVP mínimo do projeto é composto pelos seguintes módulos:

### 3.1 Autenticação
- login
- logout
- proteção de rotas
- armazenamento de token
- acesso apenas à área autenticada

### 3.2 Clientes
- listar clientes
- filtrar clientes
- cadastrar cliente
- editar cliente
- visualizar dados de cliente
- inativar ou remover registro

### 3.3 Tipos de seguro
- listar tipos de seguro
- cadastrar tipo de seguro
- editar tipo de seguro
- ativar/inativar
- remover registro

### 3.4 Apólices
- listar apólices
- filtrar por cliente, tipo, status e período
- cadastrar apólice
- editar apólice
- visualizar detalhes
- alterar status

### 3.5 Dashboard
- total de clientes
- total de tipos de seguro ativos
- total de apólices ativas
- valor mensal total das apólices ativas
- distribuição de apólices por status
- distribuição de apólices por tipo
- últimas apólices cadastradas

## 4. O que está fora do escopo deste MVP

Para manter o projeto viável e evitar explosão de escopo, ficam explicitamente fora do MVP:

- gestão de sinistros
- análise atuarial
- motor de cálculo real de prêmio
- regras complexas de underwriting
- múltiplos perfis avançados de permissão
- refresh token e gestão avançada de sessão
- upload de documentos
- assinatura digital
- mensageria assíncrona
- notificações em tempo real
- auditoria detalhada
- histórico de alterações
- multiempresa real
- billing ou integração com gateway de pagamento

## 5. Público-alvo simulado

O sistema foi concebido para uso por um perfil administrativo/operacional, semelhante a usuários que trabalham com:

- cadastro de clientes
- manutenção de cadastros de produto/seguro
- consulta de apólices
- acompanhamento de status
- visualização de indicadores operacionais

Esse perfil exige:
- navegação previsível
- baixa curva de aprendizado
- clareza visual
- pouca fricção em formulários
- tabelas legíveis
- estados bem definidos
- ações principais sempre explícitas

## 6. Justificativa de tecnologia do front

### Angular 21
O projeto usará Angular 21 por ser a base mais prática e atual para estudo e implementação.

### Client-Side Rendering
A estratégia de renderização será **CSR only**.

Motivos:
- o sistema é uma SPA administrativa autenticada
- SEO não é prioridade do produto
- a maior parte do conteúdo depende do usuário logado
- o ganho de SSR neste contexto é baixo
- SSR adicionaria complexidade desnecessária ao MVP

Portanto:
- não haverá SSR
- não haverá prerender
- não haverá hydration como requisito do projeto

## 7. Objetivos de UX do produto

O produto precisa transmitir:
- confiança
- estabilidade
- controle operacional
- legibilidade
- organização
- aparência corporativa moderna

O sistema não deve parecer:
- experimental
- visualmente excessivo
- casual demais
- uma landing page
- um app de consumo

## 8. Resultado esperado ao final do MVP

Ao final do MVP, o projeto deve permitir:
- autenticação funcional
- navegação protegida
- CRUD de clientes
- CRUD de tipos de seguro
- CRUD de apólices
- dashboard operacional simples
- integração ViaCEP no cadastro de cliente
- base documental robusta
- padrão visual consistente
- arquitetura clara de front e back

Esse resultado já será suficiente para sustentar conversa técnica madura em contexto de entrevista e para servir de base de evolução futura.
