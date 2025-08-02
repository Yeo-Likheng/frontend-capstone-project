import "../index.css";
import Nav from "./Nav";
import CallToAction from "./CallToAction";
import Specials from "./Specials";
import CustomersSay from "./CustomersSay";
import Chicago from "./Chicago";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div className="app">
        <header>
            <Nav />
        </header>
      <main>
        <CallToAction />
        <Specials />
        <CustomersSay />
        <Chicago />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;