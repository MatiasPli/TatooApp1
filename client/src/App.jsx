import { useState, useEffect, useRef } from 'react';
import BookingList from './components/BookingList';
import BookingForm from './components/BookingForm';

function App() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const bookingsRef = useRef([]);

  const fetchBookings = (showSpinner = false) => {
    if (showSpinner) setLoading(true);

    fetch('/api/bookings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then((data) => {
        const newJSON = JSON.stringify(data);
        const oldJSON = JSON.stringify(bookingsRef.current);
        if (newJSON !== oldJSON) {
          bookingsRef.current = data;
          setBookings(data);
        }
        if (showSpinner) setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        if (showSpinner) setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings(true);
    const interval = setInterval(fetchBookings, 100000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = (form) => {
    const url = editingBooking ? `/api/bookings/${editingBooking._id}` : '/api/bookings';
    const method = editingBooking ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        setEditingBooking(null);
        fetchBookings(false);
      })
      .catch((err) => setError(err.message));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this booking?')) return;
    fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      .then(() => fetchBookings(false))
      .catch((err) => setError(err.message));
  };

  const filtered = bookings
    .filter((b) => !statusFilter || b.status === statusFilter)
    .filter((b) => {
      const q = search.toLowerCase();
      return (
        b.clientId?.name?.toLowerCase().includes(q) ||
        b.artistId?.name?.toLowerCase().includes(q) ||
        b.tattooDescription?.toLowerCase().includes(q)
      );
    });

  return (
    <div>
      <h1>Tattoo Booking Manager</h1>

      <BookingForm
        onSave={handleSave}
        editingBooking={editingBooking}
        onCancel={() => setEditingBooking(null)}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search by client, artist or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading && <p className="status-message">Loading bookings...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        <BookingList
          bookings={filtered}
          onDelete={handleDelete}
          onEdit={setEditingBooking}
        />
      )}
    </div>
  );
}

export default App;
