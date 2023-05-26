import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [amount, setAmount] = useState('');
  const [donation, setDonation] = useState({ user: 0, amount: 0 });

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
      });

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      <h3>Total amount: {amount}</h3>
      <h3>Total user: {donation.user}</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor='amout'></label>
        <input
          type='number'
          id='amount'
          value={amount}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type='submit'>Add</button>&nbsp;&nbsp;&nbsp;
        <button>Clear</button>
      </form>
    </div>
  );
};

export default Dashboard;
