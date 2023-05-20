import {LoginForm} from './components/LoginForm';
import {MainDashboard} from './components/dashboard/MainDashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useCookies } from 'react-cookie';


function App() {

  const [cookies] = useCookies(['itlappContrasenia']);


  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"/>

    <Router>
      <Routes>
        {
          cookies.itlappContrasenia ?
          <Route exact path="/" element={<Navigate replace to="/dashboard" />}/> :
          <Route path="/" element={<LoginForm/>} />
        }
        <Route path="/dashboard" element={<MainDashboard/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
