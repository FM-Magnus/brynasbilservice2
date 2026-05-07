require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;
const { format } = require('date-fns');

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the public folder (client build)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Routes
app.get('/', (req, res) => {
  res.send('Brynäs Bilservice API is running.');
});

// Fetch services
app.get('/api/services', (req, res) => {
  const query = 'SELECT * FROM services';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Failed to fetch services' });
    } else {
      res.json(results);
    }
  });
});

// Fetch available dates
app.get('/api/available-dates', (req, res) => {
  const query = 'SELECT DISTINCT date FROM bookings WHERE available = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching available dates:', err);
      res.status(500).json({ error: 'Failed to fetch available dates' });
    } else {
      res.json(results.map(row => row.date));
    }
  });
});

// Submit booking
app.post('/api/bookings', (req, res) => {
  const { customerName, customerEmail, customerPhone, serviceId, date, time } = req.body; // Added time field
  console.log('Received booking data:', req.body);
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  // Check if customer exists or insert new customer
  const customerQuery = 'SELECT id FROM customers WHERE email = ?';
  db.query(customerQuery, [customerEmail], (err, customerResults) => {
    if (err) {
      console.error('Error checking customer:', err);
      return res.status(500).json({ error: 'Failed to process booking' });
    }

    let customerId;
    if (customerResults.length > 0) {
      // Customer exists
      customerId = customerResults[0].id;
      insertBooking(customerId);
    } else {
      // Insert new customer
      const insertCustomerQuery = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
      db.query(insertCustomerQuery, [customerName, customerEmail, customerPhone], (err, insertResults) => {
        if (err) {
          console.error('Error inserting customer:', err);
          return res.status(500).json({ error: 'Failed to process booking' });
        }
        customerId = insertResults.insertId;
        insertBooking(customerId);
      });
    }
  });

  function insertBooking(customerId) {
    const bookingQuery = 'INSERT INTO bookings (customer_id, customer_name, service, date, time) VALUES (?, ?, ?, ?, ?)'; // Added time field
    db.query(bookingQuery, [customerId, customerName, serviceId, formattedDate, time], (err, results) => {
      if (err) {
        console.error('Error submitting booking:', err);
        console.error('Database error details:', err.sqlMessage);
        res.status(500).json({ error: 'Failed to submit booking' });
      } else {
        res.status(201).json({ message: 'Booking submitted successfully', bookingId: results.insertId });
      }
    });
  }
});

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  // Check for admin authentication header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  // In a real implementation, you would verify the token with a secret key
  // For now, we'll use a simple check for demonstration purposes
  if (token !== 'admin-secret-token') {
    return res.status(403).json({ error: 'Invalid token.' });
  }
  
  next();
};

// Admin API routes
// Get all bookings
app.get('/api/admin/bookings', authenticateAdmin, (req, res) => {
  const query = `
    SELECT b.id, c.name as customer_name, c.email as customer_email, c.phone as customer_phone, s.name as service_name, s.price_hourly as service_price, s.price_starting as service_price_starting, b.date, b.time, b.status, b.created_at, b.comment_customer, b.comment_admin
    FROM bookings b
    JOIN customers c ON b.customer_id = c.id
    JOIN services s ON b.service = s.id
    WHERE b.status != 'erased'
    ORDER BY b.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    } else {
      res.json(results);
    }
  });
});

// Update booking status
app.put('/api/admin/bookings/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const query = 'UPDATE bookings SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err, results) => {
    if (err) {
      console.error('Error updating booking:', err);
      res.status(500).json({ error: 'Failed to update booking' });
    } else {
      res.json({ message: 'Booking updated successfully' });
    }
  });
});

// Soft-delete booking (set status to 'erased')
app.delete('/api/admin/bookings/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  
  const query = 'UPDATE bookings SET status = ? WHERE id = ?';
  db.query(query, ['erased', id], (err, results) => {
    if (err) {
      console.error('Error erasing booking:', err);
      res.status(500).json({ error: 'Failed to erase booking' });
    } else {
      res.json({ message: 'Booking erased successfully' });
    }
  });
});

// Get all services
app.get('/api/admin/services', authenticateAdmin, (req, res) => {
  const query = 'SELECT * FROM services ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Failed to fetch services' });
    } else {
      res.json(results);
    }
  });
});

// Create service
app.post('/api/admin/services', authenticateAdmin, (req, res) => {
  const { name, description, price_starting, price_hourly } = req.body;
  
  const query = 'INSERT INTO services (name, description, price_starting, price_hourly) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, price_starting || null, price_hourly], (err, results) => {
    if (err) {
      console.error('Error creating service:', err);
      res.status(500).json({ error: 'Failed to create service' });
    } else {
      res.status(201).json({ id: results.insertId, message: 'Service created successfully' });
    }
  });
});

// Update service
app.put('/api/admin/services/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { name, description, price_starting, price_hourly } = req.body;
  
  const query = 'UPDATE services SET name = ?, description = ?, price_starting = ?, price_hourly = ? WHERE id = ?';
  db.query(query, [name, description, price_starting || null, price_hourly, id], (err, results) => {
    if (err) {
      console.error('Error updating service:', err);
      res.status(500).json({ error: 'Failed to update service' });
    } else {
      res.json({ message: 'Service updated successfully' });
    }
  });
});

// Delete service
app.delete('/api/admin/services/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM services WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting service:', err);
      res.status(500).json({ error: 'Failed to delete service' });
    } else {
      res.json({ message: 'Service deleted successfully' });
    }
  });
});

// Add endpoint to fetch customer details
app.get('/api/admin/customers', authenticateAdmin, (req, res) => {
  const query = 'SELECT id, name, email, phone, created_at FROM customers ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      res.status(500).json({ error: 'Failed to fetch customers' });
    } else {
      res.json(results);
    }
  });
});

// Catch-all route - serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});