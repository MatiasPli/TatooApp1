function BookingRow({ booking, onDelete, onEdit }) {
  const client = booking.clientId;
  const artist = booking.artistId;
  const date = new Date(booking.date).toLocaleDateString();

  return (
    <tr>
      <td>{client?.name || 'Unknown'}</td>
      <td>{artist?.name || 'Unknown'}</td>
      <td>{artist?.speciality}</td>
      <td>{date}</td>
      <td>{booking.sessionDuration}h</td>
      <td>{booking.depositPaid ? 'Yes' : 'No'}</td>
      <td>{booking.status}</td>
      <td>{booking.tattooDescription}</td>
      <td>
        <button onClick={() => onEdit(booking)}>Edit</button>{' '}
        <button onClick={() => onDelete(booking._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default BookingRow;
