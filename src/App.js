import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Download from './components/Download';
import Guide from './components/Guide';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import './App.css'
import Read from './components/Read';
import LoadingBar from 'react-top-loading-bar'


function App() {
  document.body.style.backgroundColor = "#111827";
  const [showAlert, setShowAlert] = useState(false);
  const [alertinfo, setAlertinfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  function showLoading(bool) {
    setLoading(bool);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAlert = (type, message, seconds = 4) => {
    setAlertinfo({ message, type });
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, seconds * 1000);

    return () => clearTimeout(timer);
  }

  return (
    <div className="App dark">
      <Router>
        <LoadingBar
            height={3}
            color='#4f46e5'
            progress={progress}
          />
        <Navbar />
        {loading && <Loading />}
        {showAlert && <div className="alert"><Alert message={alertinfo.message} type={alertinfo.type} /></div>}
        <Routes>
          <Route exact path="/" element={<Download setProgress={setProgress} alert={handleAlert} showLoading={showLoading} />} />
          <Route exact path="/home" element={<Download setProgress={setProgress} alert={handleAlert} showLoading={showLoading} />} />
          <Route exact path="/guide" element={<Guide showLoading={showLoading}/>} />
        </Routes>
        <Read />
      </Router>
    </div>
  );
}

export default App;
