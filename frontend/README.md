
# Carrinho de Compras Completo - Next.js + Java

Este é um projeto completo de **carrinho de compras** com front-end em **Next.js** e back-end em **Java**. Ele implementa todas as operações básicas de CRUD (Criar, Ler, Atualizar e Deletar itens do carrinho) e utiliza gerenciamento de estado no front-end com **Zustand**.

---

## 📌 Funcionalidades

- **Adicionar itens** ao carrinho  
- **Listar itens** do carrinho  
- **Atualizar quantidade** de itens  
- **Remover itens** do carrinho  
- **Sincronização** entre front-end e back-end  
- **Gerenciamento de estado** no front-end usando Zustand  
- **Backend em Java** com rotas RESTful  

---

## ⚙️ Tecnologias

**Front-end:**
- Next.js  
- React  
- Zustand (gerenciamento de estado)  
- Axios (consumo de API)  

**Back-end:**
- Java 17+  
- Spring Boot  
- REST API  
- Maven  

---

## 🚀 Funcionalidades CRUD

**1. Criar (Adicionar item)**  
- Front-end envia um POST para o back-end com os dados do item  
- Back-end adiciona o item ao banco de dados ou lista em memória  

**2. Ler (Listar itens)**  
- Front-end faz GET para obter todos os itens do carrinho  
- Back-end retorna a lista completa  

**3. Atualizar (Alterar quantidade)**  
- Front-end envia PUT ou PATCH com a nova quantidade  
- Back-end atualiza o item correspondente  

**4. Deletar (Remover item)**  
- Front-end envia DELETE com o ID do item  
- Back-end remove o item do carrinho  

---

## 💻 Como Rodar o Projeto

### Backend (Java)
1. Clone o repositório:
```bash
git clone https://github.com/pedrodevsz/carrinho-de-compras.git
cd carrinho-de-compras/backend
````

2. Instale dependências e rode o projeto:

```bash
mvn clean install
mvn spring-boot:run
```

3. API rodando em `http://localhost:8080/cart`

---

### Frontend (Next.js)

1. Abra outro terminal na pasta `frontend`:

```bash
cd carrinho-de-compras/frontend
npm install
npm run dev
```

2. Acesse o site em `http://localhost:3000`

---

## 🔧 Observações

* O **Zustand** mantém o estado do carrinho no front-end, permitindo que você adicione ou remova itens sem recarregar a página.
* O **back-end em Java** pode ser facilmente conectado a um banco de dados real (MySQL, PostgreSQL) substituindo a lista em memória.
* Todas as operações CRUD estão implementadas de forma **simples e modular**, facilitando futuras melhorias.

---

## 📖 Possíveis Melhorias

* Persistência de dados em banco relacional
* Autenticação de usuários
* Histórico de compras
* Integração com gateway de pagamento

---
