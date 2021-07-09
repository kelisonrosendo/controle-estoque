const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Produtos
const Produtos = require('./controllers/Produtos');

app.post('/produtos/insert', Produtos.insert);
app.put('/produtos/update/:id', Produtos.update);
app.get('/produtos', Produtos.findAll);
app.get('/produtos/:id', Produtos.findById);
app.delete('/produtos/delete/:id', Produtos.delete);
app.put('/produtos/update-quantity/:id', Produtos.updateQuantity);

// Estoque
const Estoque = require('./controllers/Estoque');

app.post('/estoque/insert', Estoque.insert);
app.put('/estoque/update/:id', Estoque.update);
app.get('/estoque', Estoque.findAll);

// Relatórios
const Relatorios = require('./controllers/Relatorios');

app.get('/relatorios/:id', Relatorios.report);

app.listen(3333, () => {
    console.log(3333);
});