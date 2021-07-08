import { BrowserRouter, Route } from 'react-router-dom';
import './styles/global.scss';

import { Layout } from './components/Layout';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Stock } from './pages/Stock';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/produtos" component={Products} />
        <Route path="/estoque" component={Stock} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;