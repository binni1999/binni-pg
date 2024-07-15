import { Container } from "react-bootstrap";
import Header from "./components/Header";
import '../src/assets/styles/font.css'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
