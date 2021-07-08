const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
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