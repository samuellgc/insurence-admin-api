# Regras de negócio

## 1. Princípios gerais

As regras abaixo representam o comportamento de negócio esperado para o MVP. Nem todas precisam virar validação de banco; parte delas deve ser garantida no service do back-end e parte refletida na UX do front.

## 2. Regras de autenticação

### 2.1 Login
- O usuário deve fornecer e-mail e senha válidos.
- O login só é bem-sucedido se o e-mail existir e a senha estiver correta.
- Senhas devem ser armazenadas no banco com hash, nunca em texto puro.
- O back-end deve retornar um `accessToken` e os dados básicos do usuário autenticado.

### 2.2 Área protegida
- Rotas privadas do front exigem token válido.
- Endpoints privados do back exigem autenticação JWT.
- O front pode usar `AuthGuard` para UX, mas a segurança real deve ser garantida no back-end.

## 3. Regras de clientes

### 3.1 Cadastro
Um cliente deve possuir no mínimo:
- nome
- CPF
- e-mail
- telefone
- status

Campos de endereço e data de nascimento podem ser obrigatórios ou opcionais conforme a implementação final, mas a documentação recomenda capturá-los para dar consistência ao domínio.

### 3.2 Unicidade
- O CPF do cliente deve ser único.
- Recomenda-se que o e-mail do cliente também seja único, ou ao menos tratado como potencial conflito.

### 3.3 Status de cliente
Status permitidos:
- `ACTIVE`
- `INACTIVE`

Regras:
- clientes inativos podem continuar aparecendo em listagens
- a UI deve sinalizar claramente o status
- um cliente inativo não deveria ser a escolha preferencial para novas apólices, salvo decisão explícita de produto

### 3.4 Endereço via CEP
- Ao informar CEP, o sistema pode consultar ViaCEP para preencher:
  - logradouro
  - bairro
  - cidade
  - estado
- O preenchimento automático não deve bloquear edição manual posterior.
- Se o CEP não for encontrado, o usuário deve receber erro claro, sem impedir edição manual.

## 4. Regras de tipos de seguro

### 4.1 Estrutura mínima
Um tipo de seguro deve possuir:
- nome
- categoria
- valor base
- status de ativo/inativo

### 4.2 Categorias aceitas
Categorias padrão do MVP:
- `AUTO`
- `LIFE`
- `HOME`
- `BUSINESS`
- `TRAVEL`

Pode haver descrição livre para contextualização.

### 4.3 Valor base
- O valor base deve ser maior que zero.
- O valor base é um dado de referência de produto, não necessariamente o valor final da apólice.

### 4.4 Status ativo
- Tipos de seguro inativos continuam existindo historicamente.
- Um tipo inativo não deve ser a opção padrão para criação de novas apólices.
- A edição de registros existentes continua permitida conforme política do projeto.

## 5. Regras de apólices

## 5.1 Estrutura mínima
Toda apólice deve conter:
- cliente
- tipo de seguro
- número da apólice
- valor mensal
- valor de cobertura
- data de início
- data de fim
- status

## 5.2 Relacionamentos obrigatórios
- Toda apólice pertence a exatamente um cliente.
- Toda apólice pertence a exatamente um tipo de seguro.

## 5.3 Número da apólice
- O número da apólice deve ser único.
- O campo deve aceitar valor controlado por máscara ou por texto simples, desde que tenha validação de presença e unicidade.

## 5.4 Valores
- `monthlyValue` deve ser maior que zero.
- `coverageValue` deve ser maior que zero.

## 5.5 Vigência
- `startDate` é obrigatória.
- `endDate` é obrigatória.
- `endDate` deve ser maior que `startDate`.

## 5.6 Status de apólice
Status permitidos:
- `PENDING`
- `ACTIVE`
- `CANCELED`
- `EXPIRED`

Interpretação:
- `PENDING`: cadastrada, mas ainda não tratada como ativa
- `ACTIVE`: vigente e operacional
- `CANCELED`: encerrada manualmente ou descontinuada
- `EXPIRED`: vigência encerrada pelo tempo

## 5.7 Coerência entre status e vigência
Recomendação de regra:
- apólices com `endDate` passada podem ser marcadas como `EXPIRED`
- o sistema pode deixar essa evolução manual no MVP, mas a modelagem deve permitir futura automação

## 6. Regras do dashboard

O dashboard deve ser operacional, não executivo complexo. Ele deve responder rapidamente:

- quantos clientes existem
- quantos tipos de seguro ativos existem
- quantas apólices estão ativas
- qual o valor mensal agregado das apólices ativas
- como as apólices estão distribuídas por status
- como estão distribuídas por tipo de seguro
- quais foram as últimas apólices cadastradas

## 7. Regras de exclusão

### 7.1 Abordagem recomendada
Para o MVP, pode-se usar exclusão física em cadastros simples, mas a documentação recomenda avaliar exclusão lógica onde houver impacto histórico.

### 7.2 Cuidados
- excluir um cliente com apólices vinculadas pode gerar inconsistência histórica
- excluir um tipo de seguro com apólices vinculadas também pode gerar perda de referência
- em contexto mais realista, o ideal seria inativar em vez de apagar

## 8. Regras de usabilidade derivadas do negócio

Estas regras nascem do contexto administrativo do sistema:

- ações principais devem ser sempre visíveis
- status devem ser legíveis e textuais, não apenas coloridos
- listagens devem suportar filtro e paginação
- formulários devem ser organizados por seções lógicas
- erros devem explicar o problema em linguagem direta
- o usuário não deve precisar editar um registro apenas para consultá-lo, quando uma tela de detalhes fizer sentido

## 9. Seed inicial recomendada

Para dar contexto imediato ao sistema:
- 1 usuário admin
- 4 ou 5 tipos de seguro
- 5 clientes
- 8 apólices

Essa massa inicial permite:
- dashboard útil desde o primeiro acesso
- demonstração mais convincente
- validação visual do layout e das tabelas
