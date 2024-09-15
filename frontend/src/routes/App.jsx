import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='h-screen lg:flex'>
      <Sidebar />
      <div className='lg:w-[82%] lg:ml-[18%] h-screen w-full md:overflow-y-auto pb-20 '>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
