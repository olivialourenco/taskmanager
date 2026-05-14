# Task Manager — Full Stack

<div align="center">

![Java](https://img.shields.io/badge/Java-21-ed8936?logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.14-6db33f?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.6-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)

**Um sistema robusto de gestão de tarefas com arquitetura desacoplada, high-performance e UX moderna.**

</div>

---

## 📋 Sobre o Projeto

O **Task Manager** é um aplicativo full-stack de gestão de tarefas desenvolvido com tecnologias modernas e boas práticas de engenharia de software. A arquitetura desacoplada entre backend e frontend garante escalabilidade, manutenibilidade e separação clara de responsabilidades.

O projeto demonstra expertise em:
- ✅ Implementação de APIs RESTful robustas com Spring Boot
- ✅ Frontend reativo com Next.js e React moderna
- ✅ Validação de dados em camadas (Backend + Frontend)
- ✅ Tratamento global de exceções
- ✅ Experiência do usuário aprimorada com Dark Mode e animações suaves
- ✅ Componentes customizados (Modal sem diálogo nativo do browser)

---

## 🎯 Funcionalidades

### ✨ CRUD Completo de Tarefas

| Funcionalidade | Descrição |
|---|---|
| 🆕 **Criação** | Adicione tarefas com título e descrição. Validação robusta via **Bean Validation** (título mín. 3 caracteres, descrição mín. 5 caracteres) |
| 📖 **Listagem** | Visualize todas as tarefas em tempo real com feedback visual e animações suaves |
| ✏️ **Edição** | Atualize título e descrição diretamente no formulário integrado com persistência automática |
| ✅ **Status** | Marque tarefas como Concluída/Pendente com toggle visual e feedback imediato |
| 🗑️ **Exclusão** | Delete tarefas com segurança através de Modal de confirmação customizado |

### 🌙 Dark Mode Inteligente

- 🎨 Detecção automática da preferência do sistema operacional
- 💾 Persistência da escolha do usuário (localStorage)
- 🔄 Alternância suave entre temas claro e escuro
- ✨ Estilos otimizados com Tailwind CSS para ambos os temas

### 🎪 Modal Customizado

- ❌ Substitui completamente o diálogo nativo do browser
- ⌨️ Suporte a tecla ESC para fechar
- 🎨 Integrado com Dark Mode
- 🖱️ Backdrop com blur efeito
- 🔐 Confirmação segura antes de exclusões

### 📱 Interface Responsiva

- 🖥️ Totalmente responsiva (mobile, tablet, desktop)
- ⚡ Performance otimizada com React Server Components
- 🎭 Animações com Framer Motion
- 🎯 Acessibilidade (a11y) integrada

---

## 🛠️ Stack Tecnológica

### Backend

| Tecnologia | Versão | Descrição |
|---|---|---|
| **Java** | 21 | Runtime moderno com features avançadas (Records, Sealed Classes) |
| **Spring Boot** | 3.5.14 | Framework web robusto com autoconfiguration |
| **Spring Data JPA** | 3.5.14 | ORM simplificado para persistência de dados |
| **Spring Validation** | 3.5.14 | Bean Validation com suporte a constraints customizados |
| **PostgreSQL** | 15+ | Banco de dados relacional robusto |
| **Lombok** | Latest | Redução de boilerplate com anotações |
| **Maven** | 3.x | Gerenciamento de dependências e build |

### Frontend

| Tecnologia | Versão | Descrição |
|---|---|---|
| **Next.js** | 16.2.6 | React framework com App Router (SSR/SSG) |
| **React** | 19.2.4 | Biblioteca UI com Concurrent Features |
| **TypeScript** | 5 | Tipagem estática para JavaScript |
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **Axios** | 1.16.1 | HTTP client para integração com API |
| **Framer Motion** | 12.38.0 | Biblioteca de animações avançadas |
| **Lucide React** | 1.14.0 | Ícones SVG customizáveis |
| **React Icons** | 5.6.0 | Pacote adicional de ícones |

### Infraestrutura

- **CORS Config**: Configuração centralizada para requisições cross-origin
- **Global Exception Handler**: Tratamento centralizado de erros HTTP
- **DTOs**: Transfer Objects para desacoplamento entre camadas

---

## 🚀 Configuração e Instalação

### 📦 Requisitos

- **Java Development Kit (JDK)** 21+
- **Node.js** 18+ com npm ou yarn
- **PostgreSQL** 15+
- **Git**

### 📥 Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager
```

### 🔧 Configuração do Backend

#### 1. Configurar o Banco de Dados

Abra `backend/src/main/resources/application.properties` e configure:

```properties
# Conexão com PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager_db
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

#### 2. Criar Banco de Dados (PostgreSQL)

```sql
CREATE DATABASE task_manager_db;
```

#### 3. Iniciar o Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

### 🎨 Configuração do Frontend

#### 1. Instalar Dependências

```bash
cd frontend
npm install
```

#### 2. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

#### 3. Build para Produção

```bash
npm run build
npm start
```

#### 4. Linting

```bash
npm run lint
```

---

## 💡 Diferenciais Técnicos

### Arquitetura Backend

#### DTOs (Data Transfer Objects)
```
TaskRequestDTO → desacopla a representação externa (API) da entidade interna
└─ Validação automática com @Valid e Bean Validation
```

#### Global Exception Handler
- ✅ Tratamento centralizado de exceções HTTP
- ✅ Respostas padronizadas em JSON
- ✅ Logging automático de erros

#### Persistência com JPA
- ✅ Entidades mapeadas com `@Entity` e `@Table`
- ✅ Relacionamentos gerenciados automaticamente
- ✅ Queries otimizadas com Spring Data repositories

### Arquitetura Frontend

#### Componentes Reutilizáveis
- **`AddTaskForm`**: Formulário dual (create/edit) com validação cliente
- **`TaskCard`**: Componente de tarefa com ações (edit/delete/toggle)
- **`Modal`**: Componente de diálogo customizado com acessibilidade
- **`Header`**: Barra de navegação com toggle de Dark Mode

#### Hooks Customizados
- ✅ Gerenciamento de estado com `useState`
- ✅ Efeitos colaterais com `useEffect`
- ✅ Integração com API via Axios

#### Portals para Modal
- ✅ Renderização fora da hierarquia DOM
- ✅ Sobreposição segura com z-index
- ✅ Backdrop com blur efeito

#### TypeScript + Type Safety
```typescript
// Tipagem forte em toda a aplicação
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}
```

### Integração API

**Base URL**: `http://localhost:8080`

#### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/tasks` | Lista todas as tarefas |
| `GET` | `/tasks/{id}` | Obtém uma tarefa específica |
| `POST` | `/tasks` | Cria nova tarefa |
| `PUT` | `/tasks/{id}` | Atualiza uma tarefa |
| `DELETE` | `/tasks/{id}` | Deleta uma tarefa |

#### Exemplo de Requisição

```javascript
// Criar tarefa
const response = await api.post('/tasks', {
  title: 'Minha Tarefa',
  description: 'Descrição detalhada'
});

// Atualizar status
await api.put(`/tasks/${id}`, {
  title: task.title,
  description: task.description,
  completed: !task.completed
});

// Deletar
await api.delete(`/tasks/${id}`);
```

---

## 📊 Estrutura do Projeto

```
task-manager/
├── backend/
│   ├── src/main/java/com/olivia/taskmanager/
│   │   ├── controller/         # Endpoints REST
│   │   ├── service/            # Lógica de negócio
│   │   ├── entity/             # Modelos JPA
│   │   ├── repository/         # Data Access Objects
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── exception/          # Tratamento de erros
│   │   └── config/             # Configurações (CORS, etc)
│   ├── pom.xml                 # Dependências Maven
│   └── application.properties   # Configuração da aplicação
│
└── frontend/
    ├── app/
    │   ├── page.tsx            # Página principal
    │   ├── layout.tsx          # Layout global
    │   └── globals.css         # Estilos globais
    ├── components/             # Componentes React reutilizáveis
    ├── services/               # Integração com API (axios)
    ├── types/                  # Definições TypeScript
    ├── package.json            # Dependências npm
    ├── tsconfig.json           # Configuração TypeScript
    ├── tailwind.config.ts      # Configuração Tailwind CSS
    └── next.config.ts          # Configuração Next.js
```

---

## 🎓 Boas Práticas Implementadas

✅ **Separação de Responsabilidades**: Controller → Service → Repository
✅ **Princípio DRY**: Componentes reutilizáveis e lógica centralizada
✅ **Type Safety**: TypeScript em 100% do frontend
✅ **Validação em Camadas**: Frontend + Backend
✅ **Error Handling**: Global Exception Handler no backend
✅ **Responsividade**: Mobile-first com Tailwind CSS
✅ **Acessibilidade**: Semântica HTML e ARIA labels
✅ **Performance**: Code splitting, lazy loading, otimizações CSS
✅ **Segurança**: CORS configurado, validação de entrada
✅ **Documentação**: Comentários e estrutura clara

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Olívia Graciana Lourenço Neta**

- 🐙 GitHub: [@seu-github](https://github.com)
- 💼 LinkedIn: [Seu LinkedIn](https://linkedin.com)
- 📧 Email: seu-email@exemplo.com

---

<div align="center">

### ⭐ Se este projeto foi útil, considere deixar uma estrela!

**Desenvolvido com ❤️ em 2026**

</div>