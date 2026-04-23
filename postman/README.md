# Postman

Arquivos para importar no Postman:

- `insurance-admin-api.collection.json`
- `insurance-admin-api.environment.json`

Ordem recomendada:

1. Importe a collection e o environment.
2. Selecione o environment `Insurance Admin API - Local`.
3. Garanta que a API esteja rodando e que o seed do usuario de teste tenha sido executado.
4. Execute os requests na ordem das pastas:
   - `00 Auth`
   - `01 Clients`
   - `02 Insurance Types`
   - `03 Policies`
   - `04 Dashboard`

Observacoes:

- O request `Login - Success` salva `accessToken` automaticamente.
- Os requests de criacao salvam os ids em variaveis do environment:
  - `clientId`
  - `clientId2`
  - `insuranceTypeId`
  - `insuranceTypeDisposableId`
  - `policyId`
- Os requests de erro assumem que os requests de sucesso anteriores foram executados antes.
- O environment usa por padrao:
  - `baseUrl = http://localhost:3000`
  - `seedUserEmail = admin@insurance.com`
  - `seedUserPassword = 123456`
