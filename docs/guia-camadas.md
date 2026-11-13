# Guia das camadas do JIM's

O código foi dividido para que cada parte tenha uma responsabilidade simples. As telas montam as páginas do aplicativo, os componentes reutilizáveis desenham controles comuns, os utilitários fazem cálculos e conversões, os contextos compartilham estado entre telas e os serviços cuidam da persistência.

## Camadas

- **Telas (`src/screens`)**: recebem os dados e ações dos contextos e montam Login, Home, Calendário, Gastos, Configurações e formulários. Aqui ficam interações específicas da página, como escolher o mês ou validar os campos antes de salvar.
- **Componentes (`src/components`)**: peças visuais usadas em mais de uma tela, como botões, campos, cartões, linhas de lançamento e gráfico. Isso evita repetir a construção dos mesmos controles.
- **Lógica de negócio (`src/utils`)**: funções sem interface para calcular saldos e totais, agrupar lançamentos por dia, converter datas e valores e selecionar traduções. Essa separação permite usar a mesma regra em diferentes telas.
- **Contextos (`src/context`)**: mantêm informações que várias telas precisam. `AuthContext` guarda o usuário e a sessão; `AppContext` carrega lançamentos/categorias e oferece ações compartilhadas; `ThemeContext` expõe tema, idioma e tradução.
- **Acesso a dados (`src/services`)**: centraliza operações assíncronas sobre usuários, categorias e lançamentos. `storage.ts` lê e grava os registros no AsyncStorage.
- **Tipos e tema (`src/types`, `src/theme`)**: descrevem os dados e as paletas/tokens visuais utilizados nas outras camadas.

## Caminho dos dados

1. Ao abrir o app, `AuthContext` consulta a sessão salva e encontra o usuário no serviço de armazenamento.
2. `AppContext` solicita ao serviço as categorias e os lançamentos desse usuário. O serviço lê o AsyncStorage e devolve objetos tipados.
3. O contexto converte os lançamentos para o formato usado pela interface e disponibiliza listas e ações pelo hook `useApp()`.
4. A tela usa esses dados. Quando precisa apresentar um resumo, chama funções de `src/utils`; quando a pessoa cria, edita ou remove um lançamento, chama a ação do contexto.
5. O contexto encaminha a alteração para `src/services/storage.ts`, que persiste a mudança no AsyncStorage. Após o sucesso, o contexto atualiza o estado compartilhado e as telas são renderizadas novamente com os dados atualizados.

Em forma resumida:

```text
AsyncStorage ⇄ services/storage.ts ⇄ contexts ⇄ screens ⇄ components
                                      ↕
                                  utils
```

O armazenamento é local ao dispositivo; o projeto não possui uma API remota nem sincronização de dados entre aparelhos.
