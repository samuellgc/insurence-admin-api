# Arquitetura do front-end

## 1. Stack do front-end

- Angular 21
- CSR only
- Standalone Components
- Angular Material
- Reactive Forms
- RxJS
- HttpClient
- Guards
- Interceptors

## 2. Objetivo arquitetural do front

O front deve ser uma SPA administrativa autenticada, orientada por features, com foco em:
- navegação clara
- reuso de componentes
- boa manutenção
- consistência visual
- eficiência operacional

## 3. Estratégia de renderização

### Decisão
O projeto usará **Client-Side Rendering (CSR)**.

### O que isso significa na prática
- toda renderização será feita no cliente
- dados da área autenticada serão buscados após login
- não haverá SSR
- não haverá rotas híbridas por enquanto

### Motivo
O projeto é um painel administrativo autenticado. A prioridade é produtividade e simplicidade da stack, não SEO.

## 4. Organização por pastas

Estrutura recomendada:

```txt
src/app/
  core/
    auth/
    guards/
    interceptors/
    layout/
    services/
  shared/
    components/
    enums/
    models/
    pipes/
    utils/
  features/
    auth/
    dashboard/
    clients/
    insurance-types/
    policies/
  app.routes.ts
  app.config.ts
  app.component.ts
```

## 5. Responsabilidade de cada área

### 5.1 `core/`
Contém infraestrutura de front transversal à aplicação:
- autenticação
- guards
- interceptors
- layout base
- serviços compartilhados de alto nível

Não deve conter componentes de negócio específicos de uma feature.

### 5.2 `shared/`
Contém elementos reutilizáveis:
- componentes genéricos
- enums
- interfaces
- utilitários
- pipes

`shared` não deve virar um depósito caótico. Só deve receber itens realmente reutilizáveis.

### 5.3 `features/`
Cada feature contém:
- páginas
- componentes específicos da feature
- services de API daquela área
- models específicos da feature

## 6. Rotas

### Públicas
- `/login`

### Privadas
- `/dashboard`
- `/clientes`
- `/clientes/novo`
- `/clientes/:id/editar`
- `/tipos-seguro`
- `/tipos-seguro/novo`
- `/tipos-seguro/:id/editar`
- `/apolices`
- `/apolices/nova`
- `/apolices/:id/editar`

## 7. Layout da área autenticada

As rotas privadas devem compartilhar um shell com:
- sidebar
- header
- área de conteúdo principal

Esse shell deve ser responsabilidade do `core/layout`.

## 8. Standalone Components

A aplicação deve adotar Standalone Components como padrão.

### Benefícios
- alinhamento com Angular moderno
- menor acoplamento ao modelo clássico de módulos
- configuração mais direta
- melhor organização por feature

## 9. Comunicação com a API

### Padrão
Cada feature deve ter seu próprio service para comunicação com a API.

Exemplos:
- `ClientsService`
- `InsuranceTypesService`
- `PoliciesService`
- `DashboardService`

### Regras
- services de API não devem conter lógica visual
- transformação leve de dados para consumo da UI pode existir
- lógica pesada ou duplicada deve ser abstraída

## 10. Autenticação no front

### Peças esperadas
- `AuthService`
- `AuthGuard`
- `HttpInterceptor`
- storage strategy coerente
- tratamento de sessão inválida

### Fluxo
1. usuário faz login
2. token é persistido
3. interceptor injeta token
4. guard protege rotas
5. logout limpa a sessão

## 11. Formulários

### Estratégia
Todos os formulários do projeto devem usar **Reactive Forms**.

### Motivos
- melhor controle de validação
- escalabilidade para formulários de negócio
- previsibilidade
- clareza no controle do estado do form

### Formulários do projeto
- login
- cliente
- tipo de seguro
- apólice

## 12. Tabelas

As listagens devem seguir um padrão consistente:
- barra de filtros
- tabela
- paginação
- estado vazio
- loading com skeleton
- ações por linha

Sempre que possível, padronizar uma toolbar reutilizável para filtros e ações.

## 13. Estado da aplicação

Para este MVP, não há necessidade de biblioteca global complexa de state management.

### Estratégia recomendada
- estado local por componente
- services por feature
- RxJS para fluxos reativos
- optional shared state apenas se necessário

## 14. Erros e feedback

A interface deve tratar consistentemente:
- loading
- erro
- sucesso
- vazio
- sem resultados

Feedbacks devem usar componentes padronizados:
- snackbar
- empty state
- alert card
- skeleton loaders

## 15. Responsividade

Desktop é prioridade. A arquitetura de layout deve, porém, prever:
- sidebar colapsável
- componentes que quebrem bem em tablet
- formulários em uma coluna no mobile
