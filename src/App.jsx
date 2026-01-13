import { useState } from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import ToolPanel from './components/Layout/ToolPanel';
import RoomCanvas from './components/Canvas/RoomCanvas';
import AIPromptBar from './components/AI/AIPromptBar';
import WelcomeModal from './components/UI/WelcomeModal';
import useDesignStore from './store/useDesignStore';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const viewMode = useDesignStore((state) => state.viewMode);
  const selectedId = useDesignStore((state) => state.selectedId);

  return (
    <div className="app">
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      <Header />

      <div className="app-body">
        <Sidebar />

        <main className="main-canvas-area">
          <AIPromptBar />
          <RoomCanvas />
        </main>

        {selectedId && viewMode === 'edit' && <ToolPanel />}
      </div>
    </div>
  );
}

export default App;
