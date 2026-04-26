import { useState, useEffect, useRef } from 'react';
import BookingList from './components/BookingList';
import BookingForm from './components/BookingForm';

function App() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
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

  return (
    <div>
      <h1>Tattoo Booking Manager</h1>

      <BookingForm
        onSave={handleSave}
        editingBooking={editingBooking}
        onCancel={() => setEditingBooking(null)}
      />

      {loading && <p className="status-message">Loading bookings...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && (
        <BookingList
          bookings={bookings}
          onDelete={handleDelete}
          onEdit={setEditingBooking}
        />
      )}
    </div>
  );
}

export default App;
