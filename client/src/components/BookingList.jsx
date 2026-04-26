import BookingRow from './BookingRow';

function BookingList({ bookings, onDelete, onEdit }) {
  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Client</th>
          <th>Artist</th>
          <th>Speciality</th>
          <th>Date</th>
          <th>Duration</th>
          <th>Deposit Paid</th>
          <th>Status</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <BookingRow
            key={booking._id}
            booking={booking}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default BookingList;
