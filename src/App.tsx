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
            colorPrimary: '#484640',
            colorPrimaryBorder: '#222609',
            fontFamily: "'Lato', sans-serif",
          },
          components: {
            Button: {
              primaryColor: '#f0ead6',
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
