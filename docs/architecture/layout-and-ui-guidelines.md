# Layout e diretrizes de UI/UX

## 1. Objetivo deste documento

Este documento transforma as decisões de design e experiência em regras práticas para implementação. Ele é a referência principal para qualquer discussão sobre:
- aparência do sistema
- cores
- tipografia
- layout autenticado
- comportamento de tabelas
- comportamento de formulários
- organização das telas
- adaptação do Angular Material

O conteúdo abaixo foi definido com base no contexto do projeto e deve ser tratado como especificação de produto, não apenas inspiração visual.

## 2. Direção visual geral

### 2.1 Estilo visual
O sistema deve ter aparência de:
- dashboard corporativo moderno
- admin clean
- sistema interno confiável
- produto B2B com baixa ornamentação e alta utilidade

### 2.2 Sensação transmitida
A interface deve transmitir:
- confiança
- estabilidade
- previsibilidade
- legibilidade
- controle operacional

### 2.3 O que evitar
Evitar visual:
- casual demais
- com excesso de cor
- com gradientes desnecessários
- gamer ou futurista
- muito “marketing”
- com exagero de animações
- excessivamente experimental

## 3. Paleta de cores oficial

### 3.1 Cores primárias
- `Primary 600`: `#1D4ED8`
- `Primary 700`: `#1E40AF`
- `Primary 50`: `#EFF6FF`

Uso principal:
- botões primários
- links
- itens ativos
- foco visual
- destaque de ação
- indicadores principais do dashboard

### 3.2 Cores secundárias
- `Secondary`: `#475569`
- `Secondary Light`: `#64748B`

Uso:
- textos auxiliares
- ícones secundários
- subtítulos
- estados neutros

### 3.3 Neutros e superfícies
- `Background App`: `#F8FAFC`
- `Surface`: `#FFFFFF`
- `Surface Alt`: `#F1F5F9`
- `Border`: `#E2E8F0`
- `Divider`: `#CBD5E1`

### 3.4 Tipografia
- `Text Primary`: `#0F172A`
- `Text Secondary`: `#475569`
- `Text Muted`: `#64748B`

### 3.5 Cores de status
- `Success`: `#16A34A`
- `Success Light`: `#DCFCE7`
- `Warning`: `#D97706`
- `Warning Light`: `#FEF3C7`
- `Error`: `#DC2626`
- `Error Light`: `#FEE2E2`
- `Info`: `#0284C7`
- `Info Light`: `#E0F2FE`

### 3.6 Racional da paleta
O domínio de seguros pede sobriedade. Azul institucional com base branca e neutros frios reforça:
- confiança
- seriedade
- estabilidade
- maturidade do produto

## 4. Tipografia

### 4.1 Fonte principal
Recomendação prioritária:
- **Inter**

Alternativas aceitáveis:
- Roboto
- IBM Plex Sans

### 4.2 Hierarquia
- Título de página: `28px`, `700`, `36px`
- Heading 1: `24px`, `700`, `32px`
- Heading 2: `20px`, `600`, `28px`
- Heading 3: `18px`, `600`, `26px`
- Body: `14px`, `400`, `22px`
- Body small: `13px`, `400`, `20px`
- Label/caption: `12px`, `500/600`, `16px`

### 4.3 Regras de legibilidade
- 14px é a base visual do sistema
- labels de formulário devem ficar acima do campo
- números de KPI no dashboard devem ter maior destaque
- evitar blocos longos de texto na interface

## 5. Espaçamento, raios e sombras

### 5.1 Escala base
Usar escala de 4px:
- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40

### 5.2 Aplicação prática
- padding interno padrão de card: `24px`
- gap entre campos: `16px`
- gap entre seções: `24px`
- gap entre blocos grandes: `32px`
- padding de página em desktop: `24px`

### 5.3 Raios
- inputs e botões: `10px`
- cards: `14px`

### 5.4 Sombras
Card padrão:
`0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.04)`

Modal/dropdown:
`0 8px 24px rgba(15, 23, 42, 0.12)`

## 6. Layout global autenticado

## 6.1 Sidebar
Sidebar fixa à esquerda.

### Larguras
- expandida: `240px`
- colapsada: `72px`

### Conteúdo
- nome/logo do sistema
- navegação principal
- opcional: versão do sistema no rodapé

### Itens
- Dashboard
- Clientes
- Tipos de Seguro
- Apólices

### Comportamento
- item ativo com fundo primário suave e texto forte
- hover discreto
- ícone + label
- em tablet/mobile, deve poder virar drawer

## 6.2 Header / topbar
Topbar simples e funcional.

### Esquerda
- título da página
- breadcrumb secundário quando necessário

### Direita
- busca global opcional
- avatar/menu do usuário
- logout

### Regra
Não sobrecarregar a barra superior. O sistema não precisa parecer um cockpit.

## 6.3 Área de conteúdo
- fundo geral neutro
- páginas compostas por cards e blocos bem espaçados
- cabeçalho de página com título, descrição curta e ações
- conteúdo com largura fluida, mas respeitando boa leitura em formulários

## 7. Especificação das telas

## 7.1 Login

### Objetivo
Permitir autenticação rápida e segura.

### Estrutura
- fundo neutro claro
- card centralizado com largura entre `380px` e `440px`
- branding discreto
- formulário simples

### Hierarquia visual
1. nome do sistema
2. pequena descrição
3. campos
4. botão principal
5. feedback de erro

### Componentes
- input de e-mail
- input de senha
- toggle mostrar senha
- botão entrar
- feedback de erro
- loading no botão

### Regras de UX
- foco inicial no campo e-mail
- enter deve submeter
- botão primário desabilitado até os campos mínimos estarem válidos
- erro de autenticação visível no card

## 7.2 Dashboard

### Objetivo
Oferecer visão operacional resumida.

### Estrutura
#### Linha 1
4 cards principais:
- Total de clientes
- Tipos de seguro ativos
- Apólices ativas
- Valor mensal total

#### Linha 2
2 blocos analíticos:
- apólices por status
- apólices por tipo de seguro

#### Linha 3
- tabela/lista das últimas apólices

### Regras
- no máximo 4 KPIs visíveis na primeira linha
- no máximo 2 gráficos
- foco em operação, não em BI complexo
- visual limpo, sem saturação de informação

## 7.3 Listagem de clientes

### Estrutura
1. cabeçalho da página
2. barra de filtros
3. tabela principal
4. paginação

### Filtros
- busca textual por nome/CPF/e-mail
- filtro por status
- limpar filtros

### Colunas
- nome
- CPF
- e-mail
- telefone
- cidade
- status
- ações

### Ações
- novo cliente
- visualizar
- editar
- ativar/inativar

## 7.4 Formulário de cliente

### Seções
#### Dados pessoais
- nome
- CPF
- data de nascimento
- status

#### Contato
- e-mail
- telefone

#### Endereço
- CEP
- logradouro
- número
- bairro
- cidade
- estado

### UX do CEP
- busca ao sair do campo ou por ação dedicada
- loading discreto
- preenchimento automático
- edição manual permitida
- erro amigável quando CEP não for encontrado

## 7.5 Listagem de tipos de seguro

### Estrutura
- header com ação principal
- filtros simples
- tabela enxuta

### Colunas
- nome
- categoria
- valor base
- ativo
- ações

## 7.6 Formulário de tipo de seguro

### Estrutura
#### Identificação
- nome
- categoria
- ativo

#### Regras básicas
- valor base
- descrição

### Observações
- descrição em textarea
- valor base com máscara monetária
- ativo pode ser switch ou select, desde que a leitura seja explícita

## 7.7 Listagem de apólices

### Estrutura
- cabeçalho
- barra de filtros mais robusta
- tabela principal

### Filtros
- cliente
- tipo de seguro
- status
- período
- número da apólice

### Colunas
- número da apólice
- cliente
- tipo de seguro
- valor mensal
- valor de cobertura
- início
- fim
- status
- ações

### Papel
É a tela de maior densidade informacional do sistema. Deve ser clara, densa e controlada.

## 7.8 Formulário de apólice

### Seções
#### Relações principais
- cliente
- tipo de seguro

#### Dados da apólice
- número da apólice
- status

#### Valores
- valor mensal
- valor de cobertura

#### Vigência
- data de início
- data de fim

### Regras de UX
- validação explícita para data final maior que a inicial
- campos monetários com formatação
- selects pesquisáveis para cliente e tipo de seguro

## 8. Diretrizes para tabelas

### Densidade
- média
- linhas entre `48px` e `56px`
- leitura confortável sem parecer planilha antiga

### Ordenação
Permitir ordenação nas colunas relevantes:
- nome
- data
- valor
- status

### Paginação
- opções: 10, 20 e 50 itens
- total de itens visível
- manter filtros ao paginar

### Ações por linha
- menu de overflow preferencial
- evitar excesso de botões inline

### Empty state
Cada listagem deve ter:
- título curto
- explicação objetiva
- CTA principal

### Loading
- skeleton em vez de spinner global
- manter layout estável

## 9. Diretrizes para formulários

### Estrutura
- dividir em seções por lógica de negócio
- evitar uma coluna infinita de campos sem agrupamento

### Labels
- sempre visíveis
- acima do campo
- claras e objetivas

### Placeholders
- complementares
- nunca substituem label

### Erros
- abaixo do campo
- linguagem direta
- só exibir após interação ou submissão

### Ações
- salvar como CTA primária
- cancelar/voltar como secundária
- posição consistente

## 10. Estados da interface

### Loading
- skeleton para cards e tabelas
- spinner em botões

### Erro
- mensagem clara
- ação de tentar novamente quando aplicável

### Vazio
- mensagem amigável
- CTA associado

### Sucesso
- snackbar discreto
- sem interromper fluxo

### Sem resultados
- mensagem contextual
- botão limpar filtros

### Desabilitado
- contraste suficiente
- razão visível quando necessário

## 11. Responsividade

### Desktop
É o foco principal:
- sidebar fixa
- múltiplas colunas
- tabelas completas

### Tablet
- sidebar colapsável
- cards empilhando
- filtros quebrando em mais linhas

### Mobile
- login plenamente funcional
- dashboard simplificado
- formulários com uma coluna
- listagens com scroll horizontal controlado ou adaptação para cards

## 12. Acessibilidade

- contraste AA ou superior
- foco visível
- labels explícitos
- navegação por teclado coerente
- erros e estados não dependem só de cor
- tabelas com cabeçalhos claros
- mensagens de erro vinculadas aos campos

## 13. Angular Material

### Estratégia
Usar Angular Material como base funcional, mas customizado para evitar aparência genérica.

### Customizações prioritárias
1. tema de cor
2. tipografia
3. raios
4. paddings
5. sombras
6. inputs e botões
7. tabela

### Wrappers recomendados
- `app-page-header`
- `app-status-badge`
- `app-metric-card`
- `app-data-table-toolbar`
- `app-empty-state`

Esses wrappers ajudam a manter produtividade sem perder identidade visual.
