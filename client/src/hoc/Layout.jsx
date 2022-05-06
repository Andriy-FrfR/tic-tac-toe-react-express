import Navbar from '../components/Navbar/Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
