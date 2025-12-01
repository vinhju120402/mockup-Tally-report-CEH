import React from 'react';
import BargeTable from './components/BargeTable';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-6 overflow-auto">
           <BargeTable />
        </main>
      </div>
    </div>
  );
};

export default App;