import React from 'react';

import Layout from './components/Layout/Layout';
import Burger from './containers/BurgerBuilder/BurgerBuilder'


function App() {
  return (
    <div >
      <Layout>
        <Burger />
      </Layout>
    </div>
  );
}

export default App;
