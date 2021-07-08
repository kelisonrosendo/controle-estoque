import React, { useState, useEffect } from 'react';
import api from '../services/api';

export function Stock() {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { codigo } = formValues;

    const formData = new FormData(e.target);
    const { tipo, descricao, valor, quantidade } = Object.fromEntries(formData);

    if (!codigo) {
      await api.post('produtos/insert', { tipo, descricao, valor, quantidade });
    } else {
      await api.put(`produtos/update/${codigo}`, { tipo, descricao, valor, quantidade });
      setEdit(false);
    }

    setFormValues({});
    handleProducts();
  }

  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    await api.get('produtos').then(response => {
      setProducts(response.data);
    });
  }

  const [edit, setEdit] = useState(false);

  const handleEditProduct = (product) => {
    setEdit(true);
    setFormValues(product);
  }

  useEffect(() => {
    handleProducts()
  }, [])

  return (
    <>
      <div className="nav-main">
        Movimentação de Estoque
      </div>

      <div className="content">

        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-12">
                  <label className="mb-2"><b>Selecione o tipo de movimentação:</b></label>
                  <select name="tipo" className="form-control" required onChange={handleInputChange} value={formValues.tipo || ''}>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mt-4">
                  <label className="mb-2"><b>Selecione o produto:</b></label>
                  <select name="tipo" className="form-control" required onChange={handleInputChange} value={formValues.tipo || ''}>
                    <option value="eletronico">Eletrônico</option>
                    <option value="eletrodomestico">Eletrodoméstico</option>
                    <option value="movel">Móvel</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mt-4">
                  <label className="mb-2"><b>Valor:</b></label>
                  <input type="text" name="valor" className="form-control" required onChange={handleInputChange} value={formValues.valor || ''} />
                </div>

                <div className="col-lg-6 mt-4">
                  <label className="mb-2"><b>Quantidade:</b></label>
                  <input type="number" name="quantidade" className="form-control" required onChange={handleInputChange} value={formValues.quantidade || ''} />
                </div>
              </div>

              <div className="row text-center">
                <div className="col-lg-12">
                  {edit ? (
                    <button type="submit" className="btn btn-info mt-4 mb-2">Editar Produto</button>
                  ) : (
                    <button type="submit" className="btn btn-success mt-4 mb-2">Cadastrar Produto</button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-lg-12 table-responsive">

            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Qtde</th>
                  <th className="text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {!products.length ? (
                  <tr>
                    <td colSpan="6">Nenhum produto cadastrado.</td>
                  </tr>
                ) : (
                  products.map(product => {
                    return (
                      <tr key={product.codigo}>
                        <td className="align-middle">{product.codigo}</td>
                        <td className="align-middle">{product.descricao}</td>
                        <td className="align-middle">{product.tipo}</td>
                        <td className="align-middle">{product.valor}</td>
                        <td className="align-middle">{product.quantidade}</td>
                        <td className="align-middle text-center">
                          <button className="btn btn-sm btn-warning" onClick={() => handleEditProduct(product)}>Editar</button>
                        </td>
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