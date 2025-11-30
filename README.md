🚀 PROJETO DEVOPS - GUIA DE INSTALAÇÃO COMPLETO
markdown
# 🚀 Projeto Final de DevOps

## 📋 Pré-requisitos
Antes de começar, verifique se você tem instalado:
- ✅ **Docker** ([Download aqui](https://docs.docker.com/get-docker/))
- ✅ **Docker Compose** ([Instalação](https://docs.docker.com/compose/install/))
- ✅ **Git** ([Download](https://git-scm.com/downloads))

### 🧪 Verificar instalações
```bash
docker --version
docker compose version
git --version
🎯 COMEÇAR AQUI - Passo a Passo
🔽 1. CLONAR O PROJETO
bash
# Abra o terminal e execute:
git clone https://github.com/seu-usuario/projeto-devops.git
cd projeto-devops
🐳 2. EXECUTAR A APLICAÇÃO
bash
# Este comando vai baixar todas as imagens e iniciar os containers
docker compose up -d --build

# Aguarde alguns minutos para tudo inicializar
🔍 3. VERIFICAR SE ESTÁ TUDO RODANDO
bash
# Verifique o status dos containers
docker compose ps

# Deve mostrar algo como:
# NAME              STATUS                      PORTS
# devops_backend    Up 1 minute (healthy)      0.0.0.0:3000->3000/tcp
# devops_frontend   Up 1 minute                0.0.0.0:80->80/tcp  
# devops_mysql      Up 1 minute (healthy)      0.0.0.0:3306->3306/tcp
🌐 ACESSAR A APLICAÇÃO
🖥️ FRONTEND (Interface Web)
URL: http://localhost

O que você vai ver: Sistema completo de gerenciamento de usuários

Funcionalidades: Adicionar, editar, listar e excluir usuários

🔧 BACKEND API
URL: http://localhost:3000

Health Check: http://localhost:3000/health

API Users: http://localhost:3000/api/users

🗄️ BANCO DE DADOS
MySQL: localhost:3306

Database: devops_db

Usuário: devops_user

Senha: devops_password

🧪 TESTAR SE ESTÁ FUNCIONANDO
✅ Teste Rápido pelo Terminal
bash
# Testar se o backend responde
curl http://localhost:3000/health

# Deve retornar: {"status":"OK","timestamp":"...","service":"backend-api"}

# Testar a API de usuários
curl http://localhost:3000/api/users

# Deve retornar lista de usuários em JSON
✅ Teste pelo Navegador
Abra seu navegador

Acesse: http://localhost

Você deve ver: Uma interface azul com formulário de usuários

Teste: Clique em "Atualizar Lista" para ver usuários cadastrados

📊 O QUE VOCÊ VAI VER NO FRONTEND
➕ Formulário para adicionar novos usuários

📝 Lista de usuários cadastrados

✏️ Botão editar (ícone de lápis) em cada usuário

🗑️ Botão excluir (ícone de lixeira) em cada usuário

🔄 Botão atualizar para recarregar a lista

🛠️ COMANDOS ÚTEIS PARA GERENCIAR
📝 Ver logs da aplicação
bash
# Ver todos os logs em tempo real
docker compose logs -f

# Ver logs específicos do backend
docker compose logs backend -f

# Ver logs do banco de dados
docker compose logs mysql -f
⏸️ Parar a aplicação
bash
# Parar todos os containers
docker compose down

# Parar e remover volumes também
docker compose down -v
🔄 Reiniciar a aplicação
bash
# Reiniciar tudo
docker compose restart

# Reiniciar apenas o backend
docker compose restart backend
🧹 Limpar tudo
bash
# Parar e remover tudo
docker compose down -v

# Limpar imagens não usadas
docker system prune -f
🐛 SOLUÇÃO DE PROBLEMAS COMUNS
❌ Erro: "Port already in use"
bash
# Ver qual processo está usando a porta
sudo lsof -i :80
sudo lsof -i :3000

# Parar o processo ou usar portas diferentes
❌ Erro: "Cannot connect to Docker"
bash
# Reiniciar o Docker
sudo systemctl restart docker

# Verificar se Docker está rodando
sudo systemctl status docker
❌ Backend mostra "unhealthy"
bash
# Aguarde 1-2 minutos (é normal no início)
# Ou reinicie o backend
docker compose restart backend
❌ Containers não sobem
bash
# Ver logs detalhados
docker compose logs

# Reconstruir as imagens
docker compose up -d --build --force-recreate
📁 ESTRUTURA DO PROJETO
text
projeto-devops/
├── 🐳 docker-compose.yml          # Orquestração principal
├── 📁 backend/                    # API em Node.js
│   ├── 🐳 Dockerfile
│   ├── 📄 app.js                 # Servidor principal
│   └── 📄 package.json           # Dependências
├── 📁 frontend/                   # Interface web
│   ├── 🐳 Dockerfile
│   └── 📄 index.html             # Página única
├── 📁 database/                   # Banco MySQL
│   ├── 🐳 Dockerfile
│   └── 📄 init.sql               # Dados iniciais
└── 📁 .github/workflows/         # CI/CD (GitHub Actions)
    └── 📄 deploy.yml
🎯 O QUE ESTE PROJETO FAZ
Este é um sistema completo de gerenciamento de usuários que demonstra:

✅ Frontend moderno e responsivo

✅ Backend API REST com Node.js

✅ Banco de dados MySQL com persistência

✅ Containerização com Docker

✅ Orquestração com Docker Compose

✅ Health checks automáticos

✅ Versionamento com Git

🔄 FLUXO DE DESENVOLVIMENTO
Para desenvolver:
bash
# 1. Faça suas alterações no código
# 2. Reconstrua os containers
docker compose up -d --build

# 3. Teste as mudanças
# 4. Commit e push
git add .
git commit -m "minha feature"
git push origin develop
📞 PRECISA DE AJUDA?
Verifique nesta ordem:
✅ Docker está instalado e rodando?

✅ Portas 80 e 3000 estão livres?

✅ Tem pelo menos 2GB de RAM disponível?

✅ Executou docker compose up -d --build?

Se ainda tiver problemas:
bash
# Mostre os logs completos
docker compose logs

# Verifique o uso de recursos
docker system df
docker stats
🎉 PRONTO!
Se você seguiu todos os passos, agora deve ter:

🌐 Frontend rodando em http://localhost

🔧 Backend API em http://localhost:3000

🗄️ Banco MySQL na porta 3306

Divirta-se explorando o sistema! 🚀