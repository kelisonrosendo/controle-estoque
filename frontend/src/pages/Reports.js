import React, { useState, useEffect } from 'react';
import api from '../services/api';

import { toast } from 'react-toastify';

export function Reports() {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    setReportData([]);

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const [reportData, setReportData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { relatorio } = Object.fromEntries(formData);

    await api.get(`relatorios/${relatorio}`).then(response => {
      setReportData(response.data)
      toast.info("Os dados do relatório foram carregados!");
    });
  }

  return (
    <>
      <div className="nav-main">
        Relatórios do Sistema
      </div>

      <div className="content">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="row">
                <div className="col-lg-12">
                  <label className="mb-2"><b>Selecione um relatório:</b></label>
                  <select name="relatorio" className="form-control" required onChange={handleInputChange} value={formValues.relatorio || ''}>
                    <option value="">Selecione uma opção</option>
                    <option value="1">Saída de produtos por tipo</option>
                    <option value="2">Lucro por produto vendido</option>
                  </select>
                </div>
              </div>

              <div className="row text-center">
                <div className="col-lg-12">
                  <button type="submit" className="btn btn-info mt-4 mb-2">Exibir Consulta</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {parseInt(formValues.relatorio) === 1 ? (
          <div className="row mt-2">
            <div className="col-lg-12 table-responsive">

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tipo de Produto</th>
                    <th>Quantidade Saída</th>
                    <th>Quantidade Disponível</th>
                  </tr>
                </thead>
                <tbody>
                  {!reportData.length ? (
                    <tr>
                      <td colSpan="3">Os dados ainda não foram carregados.</td>
                    </tr>
                  ) : (
                    reportData.map((report, key) => {
                      return (
                        <tr key={key}>
                          <td className="align-middle">{report.tipo_produto}</td>
                          <td className="align-middle">{report.quantidade_saida}</td>
                          <td className="align-middle">{report.quantidade_disponivel}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>

            </div>
          </div>
        ) : parseInt(formValues.relatorio) === 2 ? (
          <div className="row mt-2">
            <div className="col-lg-12 table-responsive">

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade Saída</th>
                    <th>Valor Fornecedor (Un.)</th>
                    <th>Valor Venda (Un.)</th>
                    <th>Total Lucro/Prejuízo</th>
                  </tr>
                </thead>
                <tbody>
                  {!reportData.length ? (
                    <tr>
                      <td colSpan="5">Os dados ainda não foram carregados.</td>
                    </tr>
                  ) : (
                    reportData.map((report, key) => {
                      return (
                        <tr key={key}>
                          <td className="align-middle">{report.produto}</td>
                          <td className="align-middle">{report.quantidade}</td>
                          <td className="align-middle">R${report.valor_fornecedor}</td>
                          <td className="align-middle">R${report.valor_venda}</td>
                          <td className="align-middle">R${report.lucro_prejuizo}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>

            </div>
          </div>
        ) : (
          ''
        )}

      </div>
    </>
  );
}