import Database from 'better-sqlite3';

const db = new Database('./database.sqlite');

// Create events table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date INTEGER NOT NULL,
    start_time TEXT,
    end_time TEXT,
    location TEXT,
    event_type TEXT NOT NULL,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_deadline INTEGER,
    is_registration_open INTEGER DEFAULT 1,
    organizer TEXT,
    is_active INTEGER DEFAULT 1,
    image_url TEXT,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    updated_at INTEGER DEFAULT (unixepoch() * 1000)
  );
`);

// Insert sample events
const events = [
  {
    title: 'Annual Fundraising Gala 2025',
    description: 'Join us for an elegant evening of dining, entertainment, and giving back to support our mission of empowering underprivileged children. The event will feature live music, silent auction, and inspiring stories from our beneficiaries.',
    event_date: new Date('2025-03-15 18:00:00').getTime(),
    start_time: '18:00',
    end_time: '22:00',
    location: 'Grand Ballroom, Hotel Taj Palace, Mumbai',
    event_type: 'fundraiser',
    max_participants: 200,
    current_participants: 85,
    registration_deadline: new Date('2025-03-10 23:59:59').getTime(),
    is_registration_open: 1,
    organizer: 'Samruddhi Service Society',
    image_url: '/api/placeholder/600/400'
  },
  {
    title: 'Educational Workshop: Digital Literacy for Rural Girls',
    description: 'A comprehensive workshop focused on introducing basic computer skills and digital literacy to rural girls aged 12-16. Participants will learn essential computer operations, internet safety, and basic coding concepts.',
    event_date: new Date('2025-02-20 10:00:00').getTime(),
    start_time: '10:00',
    end_time: '16:00',
    location: 'Community Center, Nashik',
    event_type: 'educational',
    max_participants: 30,
    current_participants: 18,
    registration_deadline: new Date('2025-02-15 23:59:59').getTime(),
    is_registration_open: 1,
    organizer: 'Dr. Priya Sharma',
    image_url: '/api/placeholder/600/400'
  },
  {
    title: 'Community Health Camp',
    description: 'Free health screening and medical checkup camp for the local community. Our medical team will provide consultations, basic treatments, and health awareness sessions. All age groups welcome.',
    event_date: new Date('2025-02-25 09:00:00').getTime(),
    start_time: '09:00',
    end_time: '17:00',
    location: 'Village Primary School, Aurangabad',
    event_type: 'community',
    max_participants: 150,
    current_participants: 45,
    registration_deadline: new Date('2025-02-22 23:59:59').getTime(),
    is_registration_open: 1,
    organizer: 'Medical Team Samruddhi',
    image_url: '/api/placeholder/600/400'
  },
  {
    title: 'Skill Development Workshop: Tailoring & Embroidery',
    description: 'Empowerment through skill development - learn traditional tailoring and embroidery techniques that can provide sustainable livelihood opportunities. Materials and refreshments provided.',
    event_date: new Date('2025-03-05 14:00:00').getTime(),
    start_time: '14:00',
    end_time: '18:00',
    location: 'Women Empowerment Center, Pune',
    event_type: 'workshop',
    max_participants: 25,
    current_participants: 12,
    registration_deadline: new Date('2025-03-01 23:59:59').getTime(),
    is_registration_open: 1,
    organizer: 'Reshma Devi',
    image_url: '/api/placeholder/600/400'
  },
  {
    title: 'Youth Leadership Summit 2025',
    description: 'A day-long summit bringing together young leaders, activists, and change-makers to discuss social issues, share experiences, and network. Features keynote speakers, panel discussions, and interactive workshops.',
    event_date: new Date('2025-04-12 09:00:00').getTime(),
    start_time: '09:00',
    end_time: '17:00',
    location: 'Convention Center, Delhi',
    event_type: 'community',
    max_participants: 100,
    current_participants: 67,
    registration_deadline: new Date('2025-04-05 23:59:59').getTime(),
    is_registration_open: 1,
    organizer: 'Youth Wing - Samruddhi',
    image_url: '/api/placeholder/600/400'
  },
  {
    title: 'Tree Plantation Drive',
    description: 'Join our environmental conservation initiative. Help us plant 500+ saplings in the community. Tools, saplings, and refreshments provided. A great way to contribute to a greener future.',
    event_date: new Date('2025-02-28 07:00:00').getTime(),
    start_time: '07:00',
    end_time: '11:00',
    location: 'Riverside Park, Nagpur',
    event_type: 'community',
    max_participants: 80,
    current_participants: 34,
    registration_deadline: new Date('2025-02-26 23:59:59').getTime(),
    is_registration_open: 1,
    organizer: 'Green Team Samruddhi',
    image_url: '/api/placeholder/600/400'
  }
];

const insertEvent = db.prepare(`
  INSERT INTO events (
    title, description, event_date, start_time, end_time, location, 
    event_type, max_participants, current_participants, registration_deadline, 
    is_registration_open, organizer, image_url
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

events.forEach(event => {
  insertEvent.run(
    event.title, event.description, event.event_date, event.start_time, event.end_time,
    event.location, event.event_type, event.max_participants, event.current_participants,
    event.registration_deadline, event.is_registration_open, event.organizer, event.image_url
  );
});

console.log(`Inserted ${events.length} events into the database`);
db.close();