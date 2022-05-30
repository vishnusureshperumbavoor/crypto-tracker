import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import {makeStyles} from '@material-ui/core'
import Header from "./Header/Header";
function App() {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:'100vh'
    }
  }))
  const classes = useStyles()
  return (
    <Router>
      <div className={classes.App}>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} exact />
          <Route path="/coins/:id" element={<CoinPage/>} />  
        </Routes>
      </div> 
    </Router>
  );
}

export default App;
