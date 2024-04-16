import { useState } from 'react';
import { project_backend } from 'declarations/project_backend';
import CreateCampaign from "./pages/CreateCampaign";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main>
          <CreateCampaign />
        </main>
      </div>
    </div>
  );
}

export default App;
