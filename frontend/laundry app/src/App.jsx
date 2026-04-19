import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';er deployment

function App() {
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    try {
      let url = `${API}/orders`;
      const params = [];

      if (statusFilter) params.push(`status=${statusFilter}`);
      if (search) params.push(`search=${search}`);

      if (params.length) {
        url += '?' + params.join('&');
      }

      const res = await axios.get(url);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const createOrder = async () => {
    if (!name || !phone) return alert('Enter name and phone');

    try {
      await axios.post(`${API}/orders`, {
        customerName: name,
        phone,
        garments: [
          { type: 'Shirt', quantity: 2 },
          { type: 'Pants', quantity: 1 }
        ]
      });

      setName('');
      setPhone('');
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="container">
    <h1>🧺 Laundry Management</h1>

    {/* Create Order */}
    <div className="card">
      <h3>Create Order</h3>
      <input
        className="input"
        placeholder="Customer Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button className="button" onClick={createOrder}>
        Create Order
      </button>
    </div>

    {/* Filters */}
    <div className="card">
      <h3>Filters</h3>
      <select
        className="input"
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="RECEIVED">RECEIVED</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="READY">READY</option>
        <option value="DELIVERED">DELIVERED</option>
      </select>

      <input
        className="input"
        placeholder="Search name/phone"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button className="button" onClick={fetchOrders}>
        Apply Filters
      </button>
    </div>

    {/* Orders */}
    <h3>Orders</h3>

    {orders.length === 0 && <p>No orders found</p>}

    {orders.map(o => (
      <div key={o.id} className="orderCard">
        <p>
          <b>{o.customerName}</b> ({o.phone})
        </p>
        <p>Total: ₹{o.total}</p>
        <p>Status: <b>{o.status}</b></p>

        <div>
          <button
            className="smallBtn"
            onClick={() => updateStatus(o.id, 'PROCESSING')}
          >
            PROCESSING
          </button>
          <button
            className="smallBtn"
            onClick={() => updateStatus(o.id, 'READY')}
          >
            READY
          </button>
          <button
            className="smallBtn"
            onClick={() => updateStatus(o.id, 'DELIVERED')}
          >
            DELIVERED
          </button>
        </div>
      </div>
    ))}
  </div>
  );
}

export default App;