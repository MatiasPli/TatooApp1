const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
require('dotenv').config();

const Client = require('./models/Client');
const Artist = require('./models/Artist');
const Booking = require('./models/Booking');

const clients = [
  {
    name: 'Anna Kowalski',
    email: 'anna.kowalski@gmail.com',
    phone: '+48 601 234 567',
    skinNotes: 'Sensitive skin, avoid red ink. Apply numbing cream 1 hour before session.',
  },
  {
    name: 'James Thornton',
    email: 'james.thornton@outlook.com',
    phone: '+44 7911 123456',
    skinNotes: 'No known allergies. Heals quickly, good candidate for fine line work.',
  },
  {
    name: 'Sofia Reyes',
    email: 'sofia.reyes@gmail.com',
    phone: '+34 612 345 678',
    skinNotes: 'Darker skin tone — needs artist experienced with contrast on dark skin.',
  },
  {
    name: 'Mikael Lindqvist',
    email: 'mikael.lindqvist@hotmail.com',
    phone: '+46 70 345 6789',
    skinNotes: 'Keloid prone on chest area. Only book for arms or legs.',
  },
  {
    name: 'Zoe Patel',
    email: 'zoe.patel@yahoo.com',
    phone: '+44 7700 987654',
    skinNotes: 'First tattoo. Nervous — recommend shorter sessions max 2 hours.',
  },
  {
    name: 'Lucas Mendes',
    email: 'lucas.mendes@gmail.com',
    phone: '+55 11 91234 5678',
    skinNotes: 'Experienced client, 8 existing tattoos. No special requirements.',
  },
];

const artists = [
  {
    name: 'Kaito Nakamura',
    speciality: 'Japanese',
    hourlyRate: 150,
  },
  {
    name: 'Petra Voss',
    speciality: 'Blackwork & Geometric',
    hourlyRate: 120,
  },
  {
    name: 'Diego Fuentes',
    speciality: 'Realism & Portraits',
    hourlyRate: 180,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { tlsAllowInvalidCertificates: true });
  console.log('Connected to MongoDB');

  // Clear existing data
  await Client.deleteMany({});
  await Artist.deleteMany({});
  await Booking.deleteMany({});
  console.log('Cleared existing data');

  const insertedClients = await Client.insertMany(clients);
  const insertedArtists = await Artist.insertMany(artists);
  console.log('Inserted clients and artists');

  const bookings = [
    {
      clientId: insertedClients[0]._id,
      artistId: insertedArtists[0]._id,
      date: new Date('2025-06-10'),
      sessionDuration: 4,
      depositPaid: true,
      status: 'completed',
      tattooDescription: 'Full sleeve koi fish with cherry blossoms, right arm',
    },
    {
      clientId: insertedClients[1]._id,
      artistId: insertedArtists[2]._id,
      date: new Date('2025-07-15'),
      sessionDuration: 3,
      depositPaid: true,
      status: 'completed',
      tattooDescription: 'Realistic portrait of grandfather on upper left arm',
    },
    {
      clientId: insertedClients[2]._id,
      artistId: insertedArtists[1]._id,
      date: new Date('2025-08-03'),
      sessionDuration: 2,
      depositPaid: true,
      status: 'confirmed',
      tattooDescription: 'Geometric mandala on left shoulder blade',
    },
    {
      clientId: insertedClients[3]._id,
      artistId: insertedArtists[0]._id,
      date: new Date('2025-08-20'),
      sessionDuration: 5,
      depositPaid: false,
      status: 'pending',
      tattooDescription: 'Dragon wrapping around forearm, traditional Japanese style',
    },
    {
      clientId: insertedClients[4]._id,
      artistId: insertedArtists[1]._id,
      date: new Date('2025-09-05'),
      sessionDuration: 1,
      depositPaid: true,
      status: 'confirmed',
      tattooDescription: 'Small minimalist wave on inner wrist — first tattoo',
    },
    {
      clientId: insertedClients[5]._id,
      artistId: insertedArtists[2]._id,
      date: new Date('2025-09-18'),
      sessionDuration: 6,
      depositPaid: true,
      status: 'confirmed',
      tattooDescription: 'Hyper-realistic wolf head on upper back',
    },
    {
      clientId: insertedClients[0]._id,
      artistId: insertedArtists[1]._id,
      date: new Date('2025-10-02'),
      sessionDuration: 2,
      depositPaid: false,
      status: 'pending',
      tattooDescription: 'Blackwork floral pattern on left calf',
    },
    {
      clientId: insertedClients[2]._id,
      artistId: insertedArtists[0]._id,
      date: new Date('2025-10-25'),
      sessionDuration: 3,
      depositPaid: true,
      status: 'confirmed',
      tattooDescription: 'Phoenix rising from flames, back piece continuation',
    },
  ];

  await Booking.insertMany(bookings);
  console.log('Inserted 8 bookings');
  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
