const db = require('../config/db');

module.exports = {
    async insert(req, res) {
        const data = {
            "tipo": req.body.tipo,
            "descricao": req.body.descricao,
            "valor": req.body.valor,
            "quantidade": req.body.quantidade,
        }

        try {
            const response = await db.query('insert into produtos set ?', [data]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },

    async update(req, res) {
        const id = req.params.id;

        const data = {
            "tipo": req.body.tipo,
            "descricao": req.body.descricao,
            "valor": req.body.valor,
            "quantidade": req.body.quantidade
        }

        try {
            const response = await db.query('update produtos set ? where codigo = ?', [data, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },

    async findAll(req, res) {
        try {
            const response = await db.query('select * from produtos');
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },

    async findById(req, res) {
        const id = req.params.id;

        try {
            const response = await db.query(`select * from produtos where codigo = ${id}`);
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const response = await db.query(`delete from produtos where codigo = ${id} and codigo not in (select codigo_produto from estoque where codigo_produto = ${id})`);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },

    async updateQuantity(req, res) {
        const id = req.params.id;

        const data = {
            "quantidade": req.body.qtdProduto
        }

        try {
            const response = await db.query('update produtos set ? where codigo = ?', [data, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }    
}