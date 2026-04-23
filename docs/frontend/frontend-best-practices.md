# Boas práticas de front-end

## 1. Objetivo

Padronizar a implementação Angular 21 para evitar:
- código acoplado
- telas inconsistentes
- forms difíceis de manter
- comunicação desorganizada com a API
- divergência visual entre páginas

## 2. Princípios gerais

### 2.1 Clareza acima de esperteza
Prefira código explícito e legível. O projeto deve ser compreensível por outra pessoa em leitura rápida.

### 2.2 Organização por feature
Componentes, services e models devem ficar próximos da feature que os utiliza.

### 2.3 Reutilização com critério
Não abstrair cedo demais. Só extrair para `shared` quando houver reuso real ou padrão consolidado.

## 3. Componentização

### Recomendado
- componentes pequenos e focados
- separar container/page de blocos reutilizáveis
- encapsular padrões recorrentes

### Evitar
- componente gigantesco fazendo tudo
- lógica de API, layout e transformação de dados tudo no mesmo arquivo

## 4. Formulários

### Padrão
Usar Reactive Forms em todos os formulários.

### Regras
- validators explícitos
- mensagens de erro padronizadas
- labels sempre visíveis
- helper text quando necessário
- mascarar CPF, telefone, CEP e valores monetários conforme estratégia adotada

### Organização
Separar:
- criação do form
- mapeamento de payload
- preenchimento em modo edição
- tratamento de submit

## 5. Consumo de API

### Regras
- cada feature com seu service
- nomes de métodos orientados ao negócio
- tratar paginação e filtros de forma consistente
- centralizar configuração base no ambiente/core

### Evitar
- chamar HttpClient diretamente em muitos componentes de página
- espalhar URLs hardcoded

## 6. Interceptor e autenticação

- interceptor deve anexar token às rotas protegidas
- tratamento de 401 deve seguir fluxo consistente
- logout deve ser simples, previsível e completo

## 7. Angular Material

### Estratégia
Usar Material como base funcional e customizar:
- tema
- tipografia
- spacing
- radius
- densidade visual

### Evitar
- aceitar aparência default de tudo
- misturar padrões visuais sem critério

## 8. Estilo e layout

- respeitar a paleta definida
- usar tokens de espaçamento
- manter consistência de page header
- usar cards como superfície principal
- não inventar uma tela com padrão visual diferente sem justificativa

## 9. Tabelas

- usar colunas relevantes
- evitar poluição com ações demais
- filtros sempre visíveis quando principais
- skeleton e empty state obrigatórios
- status como badge textual + cor

## 10. Estados da interface

Cada tela deve prever:
- loading
- erro
- vazio
- sucesso
- sem resultados

Tela sem esses estados está incompleta.

## 11. Nomenclatura

### Componentes
- nomes claros e orientados ao domínio
- ex.: `ClientListPageComponent`, `PolicyFormComponent`

### Services
- `ClientsService`
- `PoliciesService`

### Models
- nome alinhado ao domínio e contrato da API

## 12. Acessibilidade

- foco visível
- labels sempre presentes
- inputs semanticamente corretos
- teclado funcional
- contraste suficiente

## 13. Qualidade de código

- evitar lógica excessiva no template
- extrair métodos de apresentação quando necessário
- preferir nomes claros a abreviações opacas
- comentar apenas o que realmente precisa de contexto, não o óbvio

## 14. Checklist mínimo antes de concluir uma tela

- respeita o layout e a direção visual?
- usa os componentes do design system/wrappers?
- possui loading, erro e vazio?
- segue nomes do domínio?
- está coerente com endpoints e contratos documentados?
- está pronta para desktop e aceitável em tablet/mobile?
