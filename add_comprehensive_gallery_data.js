
const Database = require('better-sqlite3');

const db = new Database('./samruddhi.sqlite');

// Clear existing data first
db.prepare('DELETE FROM photo_gallery').run();

// Add comprehensive photo gallery data with working Unsplash images
const photoGalleryData = [
  // Education Photos
  {
    title: "Girls Studying in Hostel Library",
    description: "Students from rural areas studying together in our well-equipped library facility",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Daily Study Sessions",
    date: "2024-12-01",
    photographer: "Staff Photographer"
  },
  {
    title: "Special Education Class Activity",
    description: "Children with special needs engaged in interactive learning activities",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "special_education",
    event: "IDC Program Session",
    date: "2024-11-28",
    photographer: "Volunteer Team"
  },
  {
    title: "Computer Training Program",
    description: "Girls learning essential computer skills for future employment",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Digital Literacy Program",
    date: "2024-11-25",
    photographer: "Tech Volunteer"
  },
  {
    title: "Classroom Learning Session",
    description: "Interactive classroom session with dedicated teachers",
    imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Regular Classes",
    date: "2024-11-20",
    photographer: "Education Team"
  },

  // Events Photos
  {
    title: "Annual Cultural Festival 2024",
    description: "Students performing traditional dance at our annual cultural celebration",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Cultural Festival 2024",
    date: "2024-10-15",
    photographer: "Event Photographer"
  },
  {
    title: "Sports Day Championship",
    description: "Girls participating in various sports competitions and winning medals",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Annual Sports Day",
    date: "2024-09-20",
    photographer: "Sports Coordinator"
  },
  {
    title: "Fundraising Gala Evening",
    description: "Community members and donors gathered for our annual fundraising event",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "fundraising",
    event: "Hope & Harmony Gala 2024",
    date: "2024-08-10",
    photographer: "Professional Photographer"
  },
  {
    title: "Award Ceremony Recognition",
    description: "Students receiving academic excellence awards for their outstanding performance",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Excellence Awards 2024",
    date: "2024-07-30",
    photographer: "Awards Team"
  },

  // Programs Photos
  {
    title: "Mid-Day Meal Distribution",
    description: "Nutritious meals being served to children as part of our nutrition program",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Daily Nutrition Program",
    date: "2024-12-05",
    photographer: "Program Staff"
  },
  {
    title: "Medical Health Checkup",
    description: "Regular health screening and medical care for all students",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "healthcare",
    event: "Monthly Health Camp",
    date: "2024-11-15",
    photographer: "Medical Team"
  },
  {
    title: "Karate Self-Defense Training",
    description: "Rural girls learning self-defense through our free karate coaching program",
    imageUrl: "https://images.unsplash.com/photo-1555597408-c3e2e66b6f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "skill_development",
    event: "Self-Defense Program",
    date: "2024-11-10",
    photographer: "Karate Instructor"
  },
  {
    title: "Tailoring Skills Workshop",
    description: "Women learning valuable tailoring skills for economic empowerment",
    imageUrl: "https://images.unsplash.com/photo-1445904527702-5d6ee7ecf4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "skill_development",
    event: "Women Empowerment Workshop",
    date: "2024-10-25",
    photographer: "Skills Trainer"
  },

  // Community Photos
  {
    title: "Village Water Project Inauguration",
    description: "Community celebrating the completion of clean water access project",
    imageUrl: "https://images.unsplash.com/photo-1541186353-d3ac7d1a0c05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Water Project Launch",
    date: "2024-09-05",
    photographer: "Project Team"
  },
  {
    title: "Tree Plantation Drive",
    description: "Students and community members planting trees for environmental conservation",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Green Earth Initiative",
    date: "2024-08-15",
    photographer: "Environmental Team"
  },
  {
    title: "Elder Care Program",
    description: "Students visiting and caring for elderly community members",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Senior Citizens Day",
    date: "2024-07-20",
    photographer: "Care Team"
  },
  {
    title: "Women Leadership Meeting",
    description: "Rural women discussing community development and leadership opportunities",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Women Empowerment Summit",
    date: "2024-06-30",
    photographer: "Leadership Team"
  }
];

// Insert the data
const insert = db.prepare(`
  INSERT INTO photo_gallery (title, description, imageUrl, category, event, date, photographer)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

photoGalleryData.forEach(photo => {
  insert.run(
    photo.title,
    photo.description,
    photo.imageUrl,
    photo.category,
    photo.event,
    photo.date,
    photo.photographer
  );
});

console.log(`✅ Successfully added ${photoGalleryData.length} photos to gallery!`);
console.log('Categories included:');
console.log('📚 Education & Special Education');
console.log('🎉 Events & Cultural Programs');
console.log('🏥 Healthcare & Skill Development');
console.log('🌍 Community Development');

db.close();
