@echo off
echo ========================================
echo    INICIANDO MONITORAMENTO DEVOPS
echo ========================================

echo.
echo [1/3] Parando containers existentes...
docker-compose down 2>nul
docker-compose -f docker-compose.monitoring.yml down 2>nul

echo.
echo [2/3] Iniciando aplicacao principal...
docker-compose up -d --build

echo.
echo [3/3] Iniciando monitoramento...
docker-compose -f docker-compose.monitoring.yml up -d

echo.
echo ========================================
echo           DEPLOY CONCLUIDO!
echo ========================================
echo.
echo 🚀 APLICACAO:     http://localhost
echo 📊 BACKEND API:   http://localhost:3000
echo 📈 PROMETHEUS:    http://localhost:9090
echo 📊 GRAFANA:       http://localhost:3001
echo.
echo 📋 CREDENCIAIS GRAFANA:
echo    Usuario: admin
echo    Senha:   admin
echo.
echo ✅ Todos os servicos estao rodando!
echo ========================================

pause