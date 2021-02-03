import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Container } from 'react-bootstrap';
import ProductScreen from './screens/ProductScreen';
import cartScreen from './screens/cartScreen';

function App() {
  return (
    <Router>
      <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
           {/*  We make the id optional for the cart route
            because it's not needed when we just go to the cart main screen */}
            <Route path="/cart/:id?" component={cartScreen} />
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
