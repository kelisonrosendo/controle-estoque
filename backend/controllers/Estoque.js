const db = require('../config/db');

module.exports = {
    async insert(req, res) {
        const data = {
            "tipo": req.body.tipo,
            "codigo_produto": req.body.produto,
            "valor": req.body.valor,
            "quantidade": req.body.quantidade,
            "data": new Date()
        }

        try {
            const response = await db.query('insert into estoque set ?', [data]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },

    async update(req, res) {
        const id = req.params.id;

        const data = {
            "tipo": req.body.tipo,
            "codigo_produto": req.body.produto,
            "valor": req.body.valor,
            "quantidade": req.body.quantidade,
            "data": new Date()
        }

        try {
            const response = await db.query('update estoque set ? where codigo = ?', [data, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },

    async findAll(req, res) {
        try {
            const response = await db.query('select estoque.codigo, estoque.tipo, date_format(estoque.data, "%d/%m/%Y %H:%i:%s") data, produtos.codigo codigo_produto, produtos.descricao descricao_produto, produtos.tipo tipo_produto, estoque.valor, estoque.quantidade from estoque inner join produtos on produtos.codigo = estoque.codigo_produto order by data desc');
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    }
}