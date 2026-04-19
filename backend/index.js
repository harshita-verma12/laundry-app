const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// In-memory storage
let orders = [];

// Price list
const PRICE_LIST = {
  Shirt: 10,
  Pants: 15,
  Saree: 20
};

// Valid statuses
const VALID_STATUS = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

// ✅ Create Order
app.post('/orders', (req, res) => {
  const { customerName, phone, garments } = req.body;

  if (!customerName || !phone || !garments) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  let total = 0;

  garments.forEach(item => {
    const price = PRICE_LIST[item.type] || 0;
    total += price * item.quantity;
  });

  const order = {
    id: uuidv4(),
    customerName,
    phone,
    garments,
    total,
    status: 'RECEIVED',
    createdAt: new Date()
  };

  orders.push(order);
  res.json(order);
});

// ✅ Get Orders (with filters)
app.get('/orders', (req, res) => {
  const { status, search } = req.query;

  let result = orders;

  if (status) {
    result = result.filter(o => o.status === status);
  }

  if (search) {
    const s = search.toLowerCase();
    result = result.filter(o =>
      o.customerName.toLowerCase().includes(s) ||
      o.phone.includes(s)
    );
  }

  res.json(result);
});

// ✅ Update Status
app.put('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!VALID_STATUS.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  res.json(order);
});

// ✅ Dashboard
app.get('/dashboard', (req, res) => {
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statusCount = {
    RECEIVED: 0,
    PROCESSING: 0,
    READY: 0,
    DELIVERED: 0
  };

  orders.forEach(o => {
    statusCount[o.status]++;
  });

  res.json({
    totalOrders,
    totalRevenue,
    statusCount
  });
});

// ✅ Start server (IMPORTANT LAST LINE)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});