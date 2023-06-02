import {Route, Routes} from 'react-router-dom';
import {DefaultLayout} from './layouts';
import {publicRoutes} from './routes';
import {App as NotificateApp} from 'antd';

function App() {
  let Layout = DefaultLayout;

  return (
    <NotificateApp>
      <Routes>
        {publicRoutes.map((route) => {
          const Page = route.element;
          if (route.layout) Layout = route.layout;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </NotificateApp>
  );
}

export default App;
