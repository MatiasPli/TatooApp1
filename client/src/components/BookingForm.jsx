import { useState, useEffect } from 'react';

const emptyForm = {
  clientId: '',
  artistId: '',
  date: '',
  sessionDuration: 1,
  depositPaid: false,
  status: 'pending',
  tattooDescription: '',
};

function BookingForm({ onSave, editingBooking, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [clients, setClients] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('/api/clients').then((r) => r.json()).then(setClients);
    fetch('/api/artists').then((r) => r.json()).then(setArtists);
  }, []);

  useEffect(() => {
    if (editingBooking) {
      setForm({
        clientId: editingBooking.clientId?._id || '',
        artistId: editingBooking.artistId?._id || '',
        date: editingBooking.date?.slice(0, 10) || '',
        sessionDuration: editingBooking.sessionDuration,
        depositPaid: editingBooking.depositPaid,
        status: editingBooking.status,
        tattooDescription: editingBooking.tattooDescription,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingBooking]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>{editingBooking ? 'Edit Booking' : 'New Booking'}</h3>

      <select name="clientId" value={form.clientId} onChange={handleChange} required>
        <option value="">Select client</option>
        {clients.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>{' '}

      <select name="artistId" value={form.artistId} onChange={handleChange} required>
        <option value="">Select artist</option>
        {artists.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
      </select>{' '}

      <input type="date" name="date" value={form.date} onChange={handleChange} required />{' '}

      <input
        type="number" name="sessionDuration" value={form.sessionDuration}
        onChange={handleChange} min="1" max="8" placeholder="Hours (1-8)" required
      />{' '}

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>{' '}

      <label>
        <input type="checkbox" name="depositPaid" checked={form.depositPaid} onChange={handleChange} />
        {' '}Deposit Paid
      </label>{' '}

      <input
        type="text" name="tattooDescription" value={form.tattooDescription}
        onChange={handleChange} placeholder="Tattoo description" required
        style={{ width: '250px' }}
      />{' '}

      <button type="submit">{editingBooking ? 'Update' : 'Create'}</button>{' '}
      {editingBooking && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default BookingForm;
