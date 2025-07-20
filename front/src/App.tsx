import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@store/index";
import Layout from "@components/Layout/Layout";
import SongList from "@components/Songs/SongList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <SongList />
      </Layout>
    </Provider>
  );
};

export default App;
