import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { RecordsPage } from './pages/RecordsPage';
import { ConfigProvider } from 'antd';

function App() {

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#222609',
            colorPrimaryBorder: '#222609',
          },
          components: {
            Pagination: {

            }
          }
        }}
      >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={ < HomePage />} />
            <Route path="/records/:teamId" element={ < RecordsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>


    </>
  )
}

export default App
