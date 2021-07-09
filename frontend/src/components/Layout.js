import '../styles/layout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faLaptop, faSync, faChartArea } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import ProfileImg from '../images/profile.jpg';

export function Layout({ children }) {
  return (
    <div className="container-app">
      <input type="checkbox" id="toggle-menu" />

      <aside>
        <div className="profile">
          <img src={ProfileImg} alt="Imagem do Perfil" />
          <Link to="/">Kélison Rosendo</Link>
        </div>

        <div className="menu">
          <ul>
            <li className="menu-item">
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>

            <li className="menu-item">
              <Link to="produtos">
                <FontAwesomeIcon icon={faLaptop} /> Produtos
              </Link>
            </li>

            <li className="menu-item">
              <Link to="estoque">
                <FontAwesomeIcon icon={faSync} /> Movimentações
              </Link>
            </li>

            <li className="menu-item">
              <Link to="relatorios">
                <FontAwesomeIcon icon={faChartArea} /> Relatórios
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="container-main">
        <header>
          <div className="header-left">
            <label htmlFor="toggle-menu">
              <FontAwesomeIcon icon={faBars} />
            </label>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>

    </div>
  );
}