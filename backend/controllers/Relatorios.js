const db = require('../config/db');

module.exports = {
    async report(req, res) {
        
        const relatorio = req.params.id;
        
        try {
            if (parseInt(relatorio) === 1) {
                // produto
                const response = await db.query('select produtos.tipo tipo_produto, sum(estoque.quantidade) quantidade_saida, sum(produtos.quantidade) quantidade_disponivel from estoque inner join produtos on produtos.codigo = estoque.codigo_produto where estoque.tipo = "saida" group by produtos.tipo');
                res.json(response[0]);
            } else if (parseInt(relatorio) === 2) {
                // lucro
                const response = await db.query('select produtos.descricao produto, format(produtos.valor,2,"de_DE") valor_fornecedor, format(estoque.valor,2,"de_DE") valor_venda, estoque.quantidade, format((estoque.valor - produtos.valor)*estoque.quantidade,2,"de_DE") lucro_prejuizo from estoque inner join produtos on produtos.codigo = estoque.codigo_produto where estoque.tipo = "saida" order by data desc');
                res.json(response[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }
}