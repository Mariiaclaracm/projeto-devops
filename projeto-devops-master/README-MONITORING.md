# 📊 MONITORAMENTO - PROMETHEUS + GRAFANA

## 🚀 DEPLOY RÁPIDO
```bash
# Execute o script automatizado
start-monitoring.bat
```

## 📋 ACESSOS
- **Aplicação**: http://localhost
- **Backend API**: http://localhost:3000
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001

## 🔑 CREDENCIAIS
- **Grafana**: admin / admin

## 📈 MÉTRICAS DISPONÍVEIS
- `http_requests_total` - Total de requisições HTTP
- `http_request_duration_seconds` - Duração das requisições
- `process_cpu_seconds_total` - Uso de CPU
- `process_resident_memory_bytes` - Uso de memória

## 🎯 CONFIGURAÇÃO GRAFANA
1. Acesse http://localhost:3001
2. Login: admin / admin
3. Add Data Source → Prometheus
4. URL: http://prometheus:9090
5. Save & Test

## ✅ VERIFICAÇÃO
```bash
# Testar métricas
curl http://localhost:3000/metrics

# Health check
curl http://localhost:3000/health
```

## 🔧 COMANDOS ÚTEIS
```bash
# Parar tudo
docker-compose down
docker-compose -f docker-compose.monitoring.yml down

# Ver logs
docker-compose logs -f
docker-compose -f docker-compose.monitoring.yml logs -f

# Rebuild
docker-compose up -d --build
```