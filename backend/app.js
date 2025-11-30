const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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