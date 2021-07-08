import React, { useState } from 'react';

export function Products() {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // setFormValues ({});

    console.log(data);
  }

  return (
    <>
      <div className="nav-main">
        Produtos
      </div>

      <div className="content">

        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <label className="mb-2">Selecione o tipo de produto:</label>
                  <select name="tipo" className="form-control" onChange={handleInputChange} value={formValues.tipo || ''}>
                    <option value="eletronico">Eletrônico</option>
                    <option value="eletrodomestico">Eletrodoméstico</option>
                    <option value="movel">Móvel</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mt-4">
                  <label className="mb-2">Descrição do produto:</label>
                  <input type="text" name="descricao" className="form-control" onChange={handleInputChange} value={formValues.descricao || ''} />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mt-4">
                  <label className="mb-2">Valor:</label>
                  <input type="text" name="valor" className="form-control" onChange={handleInputChange} value={formValues.valor || ''} />
                </div>

                <div className="col-lg-6 mt-4">
                  <label className="mb-2">Quantidade:</label>
                  <input type="number" name="quantidade" className="form-control" onChange={handleInputChange} value={formValues.quantidade || ''} />
                </div>
              </div>

              <div className="row text-center">
                <div className="col-lg-12">
                  <button type="submit" className="btn btn-danger mt-4 mb-2">Cadastrar Produto</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-lg-12">

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
                <tr>
                  <td className="align-middle">1</td>
                  <td className="align-middle">Mesa Gamer</td>
                  <td className="align-middle">Móvel</td>
                  <td className="align-middle">150,00</td>
                  <td className="align-middle">10</td>
                  <td className="align-middle text-center">
                    <button className="btn btn-warning" onClick={handleInputChange}>Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
}