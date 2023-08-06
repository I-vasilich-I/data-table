import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Table from './components/Table/Table';
import { DATA } from './constants';
import { Reports } from './types';
import CustomSelect from './components/CustomSelect/CustomSelect';
import './index.scss';

const App = () => {
  const [report, setReport] = useState(Reports.DEFAULT);
  const options = useMemo(() => Object.values(Reports), []);
  const handleChange = (value: string) => {
    setReport(value as Reports);
  }

  return (
    <>
      <header>
        <nav>
          <CustomSelect 
            label="Select report:" 
            options={options} 
            onChange={handleChange}
          />
        </nav>
      </header>
      <main>
        <Table data={DATA[report]} />
      </main>
    </>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
