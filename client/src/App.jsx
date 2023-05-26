import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [donation, setDonation] = useState({ user: 0, amount: 0 });
  useEffect(() => {
    const source = new EventSource(`http://localhost:8000/stream`);

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      console.log(e.data);
      const data = JSON.parse(e.data);

      setDonation(data);
    });

    source.addEventListener('error', (e) => {
      console.error('Error: ', e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div>
      <h1>Donation status</h1>
      <hr />
      <h3>Total amount: {donation.amount}</h3>
      <h3>Total user: {donation.user}</h3>
    </div>
  );
}

export default App;
