# Especificação de layout do front-end

## 1. Objetivo

Este documento detalha a implementação do layout com base nas decisões de UI/UX já definidas. Ele deve orientar a construção real das telas no Angular 21 com Angular Material.

## 2. Shell autenticado

## 2.1 Estrutura base
O shell autenticado deve ser composto por:
- `Sidebar`
- `Header`
- `Main Content`

Estrutura visual conceitual:

```txt
+------------------------------------------------------------+
| Sidebar | Header                                           |
|         |--------------------------------------------------|
|         | Conteúdo da página                               |
|         |  - page header                                   |
|         |  - filtros / cards / formulários / tabelas       |
+------------------------------------------------------------+
```

## 2.2 Sidebar

### Largura
- expandida: 240px
- colapsada: 72px

### Conteúdo
- branding do sistema
- navegação principal
- estado ativo
- eventualmente versão do sistema no rodapé

### Navegação
Itens:
- Dashboard
- Clientes
- Tipos de Seguro
- Apólices

### Estado ativo
- fundo suave com `Primary 50`
- texto e ícone em `Primary 600/700`
- borda ou barra lateral opcional para reforçar item atual

## 2.3 Header

### Estrutura
- à esquerda: título da tela e breadcrumb opcional
- à direita: avatar/menu e logout

### Comportamento
- não sobrecarregar com recursos extras
- busca global é opcional e não deve virar distração
- manter topbar limpa e leve

## 2.4 Main Content
- fundo `#F8FAFC`
- padding `24px`
- conteúdo em blocos separados por `24px` ou `32px`
- page header no topo
- cards como superfícies primárias

## 3. Componentes visuais de layout

## 3.1 Page Header
Cada tela deve iniciar com um cabeçalho contendo:
- título
- descrição curta opcional
- ações principais à direita

Exemplo em clientes:
- título: `Clientes`
- descrição: `Gerencie os cadastros de clientes e seus dados principais`
- ação primária: `Novo cliente`

## 3.2 Card padrão
Todos os blocos visuais principais devem seguir o mesmo padrão:
- fundo branco
- borda `#E2E8F0`
- raio `14px`
- padding `24px`
- sombra suave

## 4. Especificação por tela

## 4.1 Login
- tela centrada vertical e horizontalmente
- card com largura máxima de 440px
- título do sistema
- subtítulo curto
- inputs e botão
- mensagem de erro
- loading no CTA principal

## 4.2 Dashboard
### Estrutura
1. page header
2. grid de metric cards
3. grid de gráficos
4. bloco com últimas apólices

### Metric cards
Cada card deve conter:
- label pequena
- número principal em destaque
- ícone sutil opcional

### Gráficos
- usar no máximo 2 blocos
- tipos sugeridos:
  - donut para status
  - barras horizontais para tipo de seguro

### Últimas apólices
- tabela resumida com informações suficientes para consulta rápida

## 4.3 Clientes - listagem
### Estrutura
1. page header
2. card de filtros
3. card da tabela
4. paginação

### Barra de filtros
- busca textual
- select de status
- limpar filtros

### Tabela
- colunas com boa legibilidade
- ações no menu de overflow
- status em badge

## 4.4 Clientes - formulário
### Estrutura
- page header
- card principal com seções internas

### Seções
1. Dados pessoais
2. Contato
3. Endereço

### Layout recomendado
- 2 colunas em desktop quando fizer sentido
- 1 coluna em telas menores

## 4.5 Tipos de seguro - listagem
Tela mais simples que clientes e apólices.

### Estrutura
- page header
- filtros simples
- tabela

## 4.6 Tipos de seguro - formulário
### Estrutura
- identificação
- regras básicas

Campos não devem ficar soltos em lista vertical sem agrupamento.

## 4.7 Apólices - listagem
Tela de maior densidade do sistema.

### Estrutura
- page header
- barra de filtros robusta
- tabela principal
- paginação

### Regras visuais
- foco em leitura rápida
- valores alinhados apropriadamente
- datas legíveis
- status destacado, mas sem excesso de cor

## 4.8 Apólices - formulário
### Estrutura
1. Relações
2. Dados da apólice
3. Valores
4. Vigência

## 5. Estados do layout

## 5.1 Loading
- skeleton para tabelas
- skeleton para cards do dashboard
- spinner em botões

## 5.2 Vazio
Cada tela de listagem deve possuir estado vazio completo com:
- título
- descrição
- ação principal

## 5.3 Erro
- card de erro contextual quando a tela não puder carregar
- toast/snackbar para erros de operação

## 6. Responsividade de layout

### Desktop
- sidebar fixa
- grid com múltiplas colunas
- tabelas completas

### Tablet
- sidebar em modo colapsável
- cards podem empilhar
- filtros quebram em linhas

### Mobile
- sidebar como drawer
- formulários em coluna única
- tabelas com scroll horizontal controlado ou simplificação da exibição
