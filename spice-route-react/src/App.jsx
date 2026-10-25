import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Bill from './pages/Bill';
import Kitchen from './pages/Kitchen';
import Tables from './pages/Tables';
import Registration from './pages/Registeration';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Route>
    </Routes>
  );
}