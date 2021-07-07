export function Products() {
  return (
    <>
      <div class="nav-main">
        Produtos
      </div>

      <div class="content">
        <div class="row">
          <div class="col-lg-12">

            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Qtde</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mesa Gamer</td>
                  <td>Móvel</td>
                  <td>150,00</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
}