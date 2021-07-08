const express = require('express');
const app = express();

app.use(express.json());

const Produtos = require('./controllers/Produtos');

app.post('/produtos/insert', Produtos.insert);
app.put('/produtos/update/:id', Produtos.update);
app.get('/produtos', Produtos.findAll);
app.get('/produtos/:id', Produtos.findById);
app.delete('/produtos/delete/:id', Produtos.delete);

app.listen(3333, () => {
    console.log(3333);
});