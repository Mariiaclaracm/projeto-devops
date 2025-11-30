const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const client = require('prom-client');
require('dotenv').config();

// Configurar métricas do Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métricas customizadas
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route']
});

register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware para métricas
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({ method: req.method, route: req.route?.path || req.path, status_code: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route: req.route?.path || req.path }, duration);
  });
  
  next();
});

// Configuração do banco de dados
const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'devops_user',
    password: process.env.DB_PASSWORD || 'devops_password',
    database: process.env.DB_NAME || 'devops_db',
    port: process.env.DB_PORT || 3306
};

// Middleware para conectar ao banco
app.use(async (req, res, next) => {
    try {
        req.db = await mysql.createConnection(dbConfig);
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// Rotas
// GET - Listar todos os usuários
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await req.db.execute('SELECT * FROM users');
        res.json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Buscar usuário por ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const [rows] = await req.db.execute(
            'SELECT * FROM users WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Criar novo usuário
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const [result] = await req.db.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                id: result.insertId,
                name,
                email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT - Atualizar usuário
app.put('/api/users/:id', async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.params.id;

        const [result] = await req.db.execute(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE - Deletar usuário
app.delete('/api/users/:id', async (req, res) => {
    try {
        const [result] = await req.db.execute(
            'DELETE FROM users WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint de métricas para Prometheus
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'backend-api'
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});