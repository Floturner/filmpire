import { Outlet } from 'react-router-dom';
import { Layout } from '../components';

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
