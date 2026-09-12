<div align="center">
  <img src='https://fumechub.vercel.app/logo.png' width="250px" />

  <h2>Plataforma de comunicação acadêmica para estudantes da Universidade FUMEC.</h2>
</div>

---

# 📇 Índice
- [🧠 Sobre o projeto](#-sobre-o-projeto)
- [📱 Filosofia de desenvolvimento](#-filosofia-de-desenvolvimento)
- [♾️ Fluxo de desenvolvimento (Git Flow simplificado)](#️-fluxo-de-desenvolvimento-git-flow-simplificado)
- [⚙️ Tecnologias utilizadas](#️-tecnologias-utilizadas)
- [🏗️ Arquitetura](#️-arquitetura)
- [🔐 Autenticação](#-autentica%C3%A7%C3%A3o)
- [🚀 Deploy](#-deploy)
- [🚀 Como rodar o projeto](#-como-rodar-o-projeto)
---

## 🧠 Sobre o projeto

O **Fumec Hub** é uma aplicação web desenvolvida para facilitar a comunicação e a interação entre estudantes da Universidade FUMEC.

A plataforma permite que os usuários encontrem outros estudantes, enviem solicitações de amizade e mantenham conversas em tempo real através de um sistema de chat.

Entre as principais funcionalidades estão:

- 🔐 Cadastro e autenticação de usuários
- 👥 Sistema de amizades
- 💬 Chat em tempo real
- 🔔 Notificações de novas mensagens
- 📱 Interface responsiva e Mobile First
- 👤 Perfil de usuário
- 🎓 Identificação do curso do estudante

---

## 📱 Filosofia de desenvolvimento

O projeto segue a abordagem Mobile First, onde a interface é desenvolvida inicialmente pensando em dispositivos móveis e posteriormente adaptada para telas maiores.

Isso garante:

- Melhor experiência em dispositivos móveis
- Interface mais limpa e objetiva
- Responsividade para diferentes tamanhos de tela
- Facilidade de adaptação para desktop
---

## ♾️ Fluxo de desenvolvimento (Git Flow simplificado)

O projeto segue um fluxo organizado para garantir segurança e qualidade no código.

```text
feature/* → development → main
```

## 🧠 Estrutura das branches
- main → versão estável (produção)
- development → integração e testes
- feature/* → novas funcionalidades
- fix/* → correções de bugs

### 1° ➝‬ Criar branch a partir da development

```bash
git checkout development
git checkout -b feature/nova-funcionalidade
```


#### 2° ➝‬ Desenvolver a funcionalidade

#### 3° ➝‬ Fazer commit das alterações

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade"
```

#### 4° ➝‬ Enviar para o repositório
```bash
git push origin feature/nova-funcionalidade
```

#### 5° ➝‬ Abrir Pull Request
```text
feature/* → development
```

#### 6° ➝‬ Merge final
```text
development → main
```

### ⚠️ Regras importantes
- ❌ Nunca fazer push direto na main
- ✔ Sempre passar por development
- ✔ Cada feature deve ser pequena e focada
- ✔ Pull Requests devem ser claros e descritivos

---

## ⚙️ Tecnologias utilizadas

### Front-End

<img src="https://skillicons.dev/icons?i=html,css,angular,ts,materialui" title="HTML5, CSS3, Angular, TypeScript e MaterialUI" />

### Back-End

<img src="https://skillicons.dev/icons?i=nodejs,express,sequelize" title="Node.js, Express.js, Sequelize" />

### Banco de dados

<img src="https://skillicons.dev/icons?i=postgres,supabase" title="PostgreSQL e Supabase" />

## Autenticação e comunicação

- JWT — autenticação baseada em tokens
- HTTP Cookies — armazenamento seguro dos tokens
- WebSocket — comunicação em tempo real
- REST API — comunicação entre frontend e backend

## Design

<img src="https://skillicons.dev/icons?i=figma" title="Figma" />


## Tools

<img src="https://skillicons.dev/icons?i=vscode,git,github,vercel,render" title="VSCode, Git, GitHub, Vercel e Render" />

---

## 🏗️ Arquitetura

O projeto é dividido em duas aplicações principais:
```text
Fumec Hub
│
├── Front-end
│   └── Angular
│
└── Back-end
    └── Node.js + Express
         │
         ├── REST API
         ├── WebSocket
         └── PostgreSQL
```
O frontend se comunica com a API através de requisições HTTP e utiliza WebSocket para funcionalidades que precisam de comunicação em tempo real.

---

## 🔐 Autenticação

A autenticação utiliza JWT (JSON Web Token) armazenado em cookies HttpOnly.

O sistema utiliza:

- Access Token
- Refresh Token
- Cookies HttpOnly
- Middleware de autenticação
- Guards no Angular
- Restrição de acesso para usuários autenticados

---

## 🚀 Deploy
## Front-end

- Hospedado na Vercel: https://fumechub.vercel.app/

## Back-end

- Hospedado no Render. Acesso o repositório em: https://github.com/jpjotz/Fumec-Hub-BackEnd

## Banco de dados

- Utiliza PostgreSQL através do Supabase.

---

## 🚀 Como rodar o projeto

```bash
1- clonar o repositório
git clone git@github.com:jpjotz/Fumec-Hub-FrontEnd.git

2- entrar na pasta do projeto
cd FumecHub-FrontEnd

3- instalar as dependências
npm install

4- Iniciar o projeto
ng serve
```

- O frontend estará disponível em: http://localhost:4200
- O back-end deve estar configurado e em execução para que os recursos da aplicação funcionem corretamente.
