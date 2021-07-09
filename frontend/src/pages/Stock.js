import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { toast } from 'react-toastify';

export function Stock() {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    let qtdProduto = 0;

    const { codigo } = formValues;

    const formData = new FormData(e.target);
    const { tipo, produto, valor, quantidade } = Object.fromEntries(formData);

    await api.get(`produtos/${produto}`).then(response => {
      qtdProduto = response.data[0].quantidade;
    });

    if (tipo === 'saida' && qtdProduto < parseInt(quantidade)) {
      return toast.error("Opa, estoque insuficiente!");
    }

    if (tipo === 'entrada' && !edit) {
      qtdProduto += parseInt(quantidade);
    } else if (tipo === 'saida' && !edit) {
      qtdProduto -= parseInt(quantidade);
    }

    if (!codigo) {
      await api.post('estoque/insert', { tipo, produto, valor, quantidade });
    } else {
      await api.put(`estoque/update/${codigo}`, { tipo, produto, valor, quantidade });
      setEdit(false);
    }

    await api.put(`produtos/update-quantity/${produto}`, { qtdProduto });

    setFormValues({});
    handleProducts();
    handleListStock();
  }

  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    await api.get('produtos').then(response => {
      setProducts(response.data);
    });
  }

  const [edit, setEdit] = useState(false);

  // const handleEditStock = (stock) => {
  //   const newData = {
  //     codigo: stock.codigo,
  //     tipo: stock.tipo,
  //     produto: stock.codigo_produto,
  //     valor: stock.valor,
  //     quantidade: stock.quantidade
  //   };

  //   setEdit(true);
  //   setFormValues(newData);
  // }

  const [listStock, setListStock] = useState([]);

  const handleListStock = async () => {
    await api.get('estoque').then(response => {
      setListStock(response.data);
    });
  }

  useEffect(() => {
    handleProducts()
    handleListStock()
  }, [])

  return (
    <>
      <div className="nav-main">
        Movimentações de Estoque
      </div>

      <div className="content">

        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-12">
                  <label className="mb-2"><b>Selecione o tipo de movimentação:</b></label>
                  <select name="tipo" className="form-control" required onChange={handleInputChange} value={formValues.tipo || ''}>
                    <option value="">Selecione uma opção</option>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mt-4">
                  <label className="mb-2"><b>Selecione um produto:</b></label>
                  <select name="produto" className="form-control" required onChange={handleInputChange} value={formValues.produto || ''}>
                    <option value="">Selecione uma opção</option>
                    {products.map(product => <option key={product.codigo} value={product.codigo}>{product.descricao} ({product.quantidade} em estoque)</option>)}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 mt-4">
                  <label className="mb-2"><b>Valor:</b></label>
                  <input type="number" name="valor" className="form-control" required onChange={handleInputChange} value={formValues.valor || ''} />
                </div>

                <div className="col-sm-6 mt-4">
                  <label className="mb-2"><b>Quantidade:</b></label>
                  <input type="number" name="quantidade" min="1" className="form-control" required onChange={handleInputChange} value={formValues.quantidade || ''} />
                </div>
              </div>

              <div className="row text-center">
                <div className="col-lg-12">
                  {edit ? (
                    <button type="submit" className="btn btn-info mt-4 mb-2">Editar Movimentação</button>
                  ) : (
                    <button type="submit" className="btn btn-success mt-4 mb-2">Cadastrar Movimentação</button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-lg-12 table-responsive">

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th>Produto</th>
                  <th>Tipo Produto</th>
                  <th>Valor</th>
                  <th className="text-center">Qtde</th>
                  {/* <th className="text-center">Ação</th> */}
                </tr>
              </thead>
              <tbody>
                {!listStock.length ? (
                  <tr>
                    <td colSpan="7">Nenhuma movimentação realizada.</td>
                  </tr>
                ) : (
                  listStock.map(stock => {
                    return (
                      <tr key={stock.codigo} className={stock.tipo === 'entrada' ? 'text-success' : 'text-danger'}>
                        <td className="align-middle">{stock.tipo}</td>
                        <td className="align-middle">{stock.data}</td>
                        <td className="align-middle">{stock.descricao_produto}</td>
                        <td className="align-middle">{stock.tipo_produto}</td>
                        <td className="align-middle">R${stock.valor}</td>
                        <td className="text-center align-middle">{stock.quantidade}</td>
                        {/* <td className="align-middle text-center">
                          <button className="btn btn-sm btn-warning" onClick={() => handleEditStock(stock)}>Editar</button>
                        </td> */}
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
}