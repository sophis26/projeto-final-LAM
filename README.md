# JIM's — Gerenciador de gastos

O JIM's é um aplicativo móvel de educação financeira e controle do orçamento doméstico. Ele ajuda cada pessoa a registrar receitas e despesas, acompanhar o saldo e comparar os gastos com o orçamento mensal. Os dados ficam armazenados localmente no dispositivo.

## Problema que resolve

Despesas do dia a dia podem ficar dispersas e difíceis de comparar com a renda e o orçamento planejado. O JIM's reúne esses registros em um só lugar e apresenta resumos por mês, categoria e dia, para apoiar a organização financeira pessoal.

## Funcionalidades

- Cadastro e login com e-mail e senha; a senha é armazenada como hash.
- Configuração inicial de motivos de uso, origem e orçamento mensal.
- Cadastro, edição e exclusão de receitas e despesas, com categoria e data.
- Resumo mensal com saldo, uso do orçamento e gráfico de despesas por categoria.
- Calendário com indicadores dos dias que têm lançamentos e resumo diário.
- Preferências de tema claro/escuro e idioma português/inglês.
- Edição de nome, orçamento e senha, seção de ajuda e encerramento da sessão.
- Armazenamento local usando AsyncStorage; não há servidor ou sincronização entre dispositivos.

## Tecnologias e bibliotecas

| Tecnologia/biblioteca | Uso no projeto |
| --- | --- |
| React | Componentes e estado da interface. |
| React Native | Interface móvel multiplataforma. |
| Expo | Execução e ferramentas de desenvolvimento do app. |
| TypeScript | Tipos e validação estática do código. |
| `@react-navigation/native` | Contêiner e integração da navegação. |
| `@react-navigation/native-stack` | Navegação em pilha para autenticação, onboarding e formulário. |
| `@react-navigation/bottom-tabs` | Abas principais: Início, Calendário, Gastos e Configurações. |
| `@react-native-async-storage/async-storage` | Persistência local de usuários, sessão, categorias e lançamentos. |
| `expo-crypto` | Geração de hash da senha antes de armazená-la. |
| `react-native-svg` | Desenho do gráfico de pizza da Home. |
| `@expo/vector-icons` | Ícones usados em botões, categorias e navegação. |
| `expo-status-bar` | Aparência da barra de status, adaptada ao tema. |
| `react-native-safe-area-context` | Espaço seguro para conteúdo junto às bordas do dispositivo. |
| `react-native-screens` | Integração de telas nativas usada pela navegação. |
| `react-dom` e `react-native-web` | Suporte à execução web fornecida pelo Expo. |

## Estrutura de pastas

```text
.
├── App.tsx                 # Providers globais e barra de status
├── index.ts                # Entrada do Expo
├── assets/                 # Ícones e imagens do app
├── docs/
│   └── guia-camadas.md     # Guia simples da arquitetura e fluxo dos dados
└── src/
    ├── components/         # Componentes reutilizáveis da interface
    ├── context/            # Autenticação, dados compartilhados, tema e idioma
    ├── navigation/         # Stack e abas do aplicativo
    ├── screens/            # Telas completas
    ├── services/           # Persistência e operações de dados
    ├── theme/              # Paletas e tokens visuais
    ├── types/              # Tipos TypeScript do domínio
    └── utils/               # Cálculos, datas, formatação, categorias e traduções
```

## Instalar e executar com Expo Go

1. Instale o [Node.js](https://nodejs.org/) e o aplicativo Expo Go no celular.
2. Baixe ou clone o projeto e abra um terminal na pasta que contém `package.json`.
3. Instale as dependências declaradas no lockfile:

   ```bash
   npm ci
   ```

4. Inicie o servidor do Expo:

   ```bash
   npx expo start
   ```

5. Conecte o computador e o celular à mesma rede Wi-Fi. Leia o QR code exibido no terminal com a câmera (iOS) ou com o Expo Go (Android).
6. Para uma rede que não permite conexão direta, inicie com:

   ```bash
   npx expo start --tunnel
   ```

Os dados ficam no armazenamento local do aplicativo. Desinstalar o app ou limpar os dados do Expo Go pode removê-los. O Expo Go precisa ser compatível com a versão do SDK declarada em `package.json`/`app.json`.

## Integrantes da equipe

Os nomes dos integrantes não constam nos arquivos consultados do repositório. Preencher antes da entrega: **[nomes completos dos integrantes do grupo]**.

## Arquitetura

Consulte [Guia das camadas e fluxo dos dados](docs/guia-camadas.md), preparado como base para a seção 3.2 do relatório.
