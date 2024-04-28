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
  const [showPersistentAlert, setShowPersistentAlert] = useState(false);
  const [persistentAlertInfo, setPersistentAlertInfo] = useState({});

  function showLoading(bool) {
    setLoading(bool);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAlert = (type, message, seconds = 4) => {
    setAlertinfo({ message, type });
    setShowAlert(true);

    if (seconds > 0) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, seconds * 1000);
      return () => clearTimeout(timer);
    }
  }

  const handlePersistentAlert = (type, message, show) => {
    setPersistentAlertInfo({ message, type });
    setShowPersistentAlert(show);
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
        {showPersistentAlert && <div className="alert"><Alert message={persistentAlertInfo.message} type={persistentAlertInfo.type} /></div>}
        <Routes>
          <Route exact path="/" element={<Download setProgress={setProgress} alert={handleAlert} showLoading={showLoading} handlePersistentAlert={handlePersistentAlert} />} />
          <Route exact path="/home" element={<Download setProgress={setProgress} alert={handleAlert} showLoading={showLoading} handlePersistentAlert={handlePersistentAlert} />} />
          <Route exact path="/guide" element={<Guide showLoading={showLoading} />} />
        </Routes>
        <Read />
      </Router>
    </div>
  );
}

export default App;
