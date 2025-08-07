import { db } from './server/db.ts';
import { events } from './shared/schema.ts';

const currentDate = Date.now();
const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = 7 * oneDay;
const oneMonth = 30 * oneDay;

const eventsData = [
  // PAST EVENTS (5)
  {
    title: "Annual Fundraising Gala 2024 - Hope & Harmony",
    description: "Our biggest fundraising event of the year featuring cultural performances by hostel girls, success story presentations, and community celebrations. The evening raised ₹12 lakhs for our programs through generous donations and sponsorships from local businesses and supporters.",
    eventDate: currentDate - (45 * oneDay), // 45 days ago
    startTime: "18:00",
    endTime: "22:00",
    location: "Community Hall, Nashik District",
    eventType: "fundraising",
    maxParticipants: 300,
    currentParticipants: 285,
    registrationDeadline: currentDate - (50 * oneDay),
    isRegistrationOpen: false,
    organizer: "Samruddhi Service Society",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  {
    title: "Girls' Hostel 10th Annual Day Celebration",
    description: "A joyous celebration marking the 10th anniversary of our Girls' Hostel program. Students showcased their talents through dance, music, and drama performances. Parents from nearby villages attended to witness their daughters' achievements and academic progress.",
    eventDate: currentDate - (30 * oneDay), // 30 days ago
    startTime: "14:00",
    endTime: "18:00",
    location: "Samruddhi Girls' Hostel, Pimpri Village",
    eventType: "celebration",
    maxParticipants: 150,
    currentParticipants: 142,
    registrationDeadline: currentDate - (35 * oneDay),
    isRegistrationOpen: false,
    organizer: "Girls' Hostel Team",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  {
    title: "Free Medical Camp - Rural Health Initiative",
    description: "Comprehensive medical camp conducted across three remote villages providing free health checkups, eye examinations, women's health consultations, and child vaccination drives. Over 500 patients received treatment and free medicines worth ₹75,000.",
    eventDate: currentDate - (21 * oneDay), // 21 days ago
    startTime: "08:00",
    endTime: "17:00",
    location: "Multiple Villages: Pimpri, Kasara, Bhandardara",
    eventType: "healthcare",
    maxParticipants: 600,
    currentParticipants: 523,
    registrationDeadline: currentDate - (28 * oneDay),
    isRegistrationOpen: false,
    organizer: "Healthcare Team & District Hospital",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  {
    title: "Skill Development Program Graduation Ceremony",
    description: "Graduation ceremony for 35 women who successfully completed our 6-month tailoring and embroidery training program. Participants showcased their handmade garments and received certificates. Many graduates shared their success stories of achieving financial independence.",
    eventDate: currentDate - (14 * oneDay), // 14 days ago
    startTime: "15:00",
    endTime: "18:00",
    location: "Skill Development Center, Nashik",
    eventType: "graduation",
    maxParticipants: 100,
    currentParticipants: 87,
    registrationDeadline: currentDate - (17 * oneDay),
    isRegistrationOpen: false,
    organizer: "Skill Development Team",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  {
    title: "Environmental Conservation Tree Plantation Drive",
    description: "Monsoon season tree plantation initiative where 5,000 native trees were planted across 10 villages in collaboration with local schools. Students adopted trees as part of environmental education program and committed to monitoring their growth.",
    eventDate: currentDate - (7 * oneDay), // 7 days ago
    startTime: "07:00",
    endTime: "12:00",
    location: "10 Villages across Nashik District",
    eventType: "environmental",
    maxParticipants: 200,
    currentParticipants: 184,
    registrationDeadline: currentDate - (10 * oneDay),
    isRegistrationOpen: false,
    organizer: "Environmental Team & Local Schools",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  
  // UPCOMING EVENTS (3)
  {
    title: "Youth Leadership Summit 2025",
    description: "An empowering summit designed for rural youth aged 16-25 to develop leadership skills, learn about career opportunities, and network with successful professionals. Sessions include personality development, communication skills, and entrepreneurship guidance from industry experts.",
    eventDate: currentDate + (14 * oneDay), // 14 days from now
    startTime: "09:00",
    endTime: "17:00",
    location: "Samruddhi Training Center, Nashik",
    eventType: "workshop",
    maxParticipants: 80,
    currentParticipants: 42,
    registrationDeadline: currentDate + (10 * oneDay),
    isRegistrationOpen: true,
    organizer: "Youth Development Team",
    imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  {
    title: "Women Entrepreneurs Meet & Microfinance Launch",
    description: "Launch event for our new microfinance program supporting women entrepreneurs. Meet existing successful women from our programs, learn about available loans (₹10,000-₹50,000), attend financial literacy workshops, and network with potential business mentors.",
    eventDate: currentDate + (28 * oneDay), // 28 days from now
    startTime: "10:00",
    endTime: "16:00",
    location: "Community Center, Pimpri Village",
    eventType: "business",
    maxParticipants: 60,
    currentParticipants: 23,
    registrationDeadline: currentDate + (21 * oneDay),
    isRegistrationOpen: true,
    organizer: "Women Empowerment Team",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  },
  {
    title: "Annual Sports Day & Cultural Festival 2025",
    description: "Our biggest celebration of the year featuring sports competitions, cultural performances, and exhibitions showcasing work from all our programs. Special karate demonstrations by our state champion girls, art exhibitions by IDC children, and traditional dances by hostel students.",
    eventDate: currentDate + (45 * oneDay), // 45 days from now
    startTime: "08:00",
    endTime: "19:00",
    location: "District Sports Complex, Nashik",
    eventType: "festival",
    maxParticipants: 500,
    currentParticipants: 127,
    registrationDeadline: currentDate + (35 * oneDay),
    isRegistrationOpen: true,
    organizer: "Samruddhi Service Society",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    isActive: true
  }
];

async function seedEvents() {
  console.log('Starting events seeding...');
  
  try {
    // Clear existing events data
    await db.delete(events);
    console.log('Cleared existing events data');

    // Insert new events data
    for (const event of eventsData) {
      const insertData = {
        ...event,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(events).values(insertData);
      const eventType = event.eventDate < currentDate ? 'PAST' : 'UPCOMING';
      console.log(`✓ Inserted ${eventType}: ${event.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${eventsData.length} events!`);
    console.log('- 5 Past Events (completed)');
    console.log('- 3 Upcoming Events (registration open)');
    console.log('Events content is now available at /api/events');
    
  } catch (error) {
    console.error('Error seeding events data:', error);
    throw error;
  }
}

// Run the seeding function
seedEvents()
  .then(() => {
    console.log('Events seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Events seeding failed:', error);
    process.exit(1);
  });