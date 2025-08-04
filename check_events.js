import Database from 'better-sqlite3';

const db = new Database('./samruddhi.sqlite');

// Check events table structure
console.log('=== EVENTS TABLE STRUCTURE ===');
const tableInfo = db.prepare("PRAGMA table_info(events)").all();
console.log(tableInfo);

console.log('\n=== EVENTS COUNT ===');
const count = db.prepare("SELECT COUNT(*) as count FROM events").get();
console.log(`Total events: ${count.count}`);

console.log('\n=== ALL EVENTS ===');
const events = db.prepare("SELECT * FROM events ORDER BY event_date DESC").all();
events.forEach((event, index) => {
  console.log(`${index + 1}. ${event.title}`);
  console.log(`   Date: ${new Date(event.event_date).toLocaleDateString()}`);
  console.log(`   Type: ${event.event_type}`);
  console.log(`   Location: ${event.location}`);
  console.log(`   Participants: ${event.current_participants}/${event.max_participants}`);
  console.log(`   Registration Open: ${event.is_registration_open ? 'Yes' : 'No'}`);
  console.log('');
});

console.log('\n=== EVENTS BY TYPE ===');
const types = db.prepare("SELECT event_type, COUNT(*) as count FROM events GROUP BY event_type").all();
types.forEach(type => {
  console.log(`${type.event_type}: ${type.count} events`);
});

db.close();