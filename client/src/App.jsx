import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Execute from './pages/Execute';
import Report from './pages/Report';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/execute" element={<Execute />} />
                <Route path="/report/:sessionId" element={<Report />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;