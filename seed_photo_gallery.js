
import { db } from './server/db.ts';
import { photoGallery } from './shared/schema.ts';

const photoGalleryData = [
  // Education Category
  {
    title: "Girls' Hostel Study Time",
    description: "Students from our free girls' hostel engaged in evening study sessions",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Daily Study Program",
    date: "2024-12-20",
    photographer: "Hostel Staff"
  },
  {
    title: "Interactive Learning Session",
    description: "Children with special needs engaged in interactive learning at our IDC center",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "special_education",
    event: "IDC Daily Sessions",
    date: "2024-12-18",
    photographer: "Dr. Priya Sharma"
  },
  {
    title: "Classroom Activities",
    description: "Rural girls participating in educational activities at our learning center",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Weekly Classes",
    date: "2024-12-15",
    photographer: "Education Team"
  },
  {
    title: "Computer Training Program",
    description: "Women learning computer skills as part of our digital literacy program",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Digital Literacy",
    date: "2024-12-10",
    photographer: "Skills Team"
  },

  // Events Category
  {
    title: "Hope & Harmony Gala 2024",
    description: "300+ supporters gathered for our annual fundraising event that raised ₹12 lakhs",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "fundraising",
    event: "Annual Gala Night",
    date: "2024-11-18",
    photographer: "Event Photography"
  },
  {
    title: "Cultural Performance",
    description: "Girls from our hostel performing traditional dances during the annual celebration",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Hostel Annual Day",
    date: "2024-12-05",
    photographer: "Cultural Team"
  },
  {
    title: "Community Leadership Meeting",
    description: "Local leaders and beneficiaries discussing program expansion initiatives",
    imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Leadership Development",
    date: "2024-12-08",
    photographer: "Community Team"
  },
  {
    title: "Karate Championship Celebration",
    description: "Celebrating our girls who won gold medals at Maharashtra State Karate Championship",
    imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Sports Achievement",
    date: "2024-11-25",
    photographer: "Sports Team"
  },

  // Programs Category
  {
    title: "Mid-Day Meal Program",
    description: "Volunteers preparing nutritious meals for 800+ children across 15 village schools",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Nutrition Program",
    date: "2024-12-22",
    photographer: "Kitchen Staff"
  },
  {
    title: "Medical Camp in Villages",
    description: "Free healthcare services provided to 500+ patients in remote villages",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "healthcare",
    event: "Medical Outreach",
    date: "2024-12-12",
    photographer: "Medical Team"
  },
  {
    title: "Tailoring Skills Training",
    description: "Women learning tailoring and embroidery skills for economic independence",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "skill_development",
    event: "Women Empowerment",
    date: "2024-12-08",
    photographer: "Skills Team"
  },
  {
    title: "Art Therapy Session",
    description: "Creative expression through art helps children develop motor skills and confidence",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0a9ba3e6d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "therapy",
    event: "IDC Therapy Program",
    date: "2024-12-05",
    photographer: "Therapy Team"
  },

  // Community Category
  {
    title: "Village Water Project",
    description: "Clean water access established for 2,000+ residents across 5 villages through new bore wells",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Water Access Project",
    date: "2024-11-30",
    photographer: "Infrastructure Team"
  },
  {
    title: "Tree Plantation Drive",
    description: "5,000 native trees planted across 10 villages with students as environmental guardians",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Environmental Conservation",
    date: "2024-11-20",
    photographer: "Environment Team"
  },
  {
    title: "Women Entrepreneurs Meet",
    description: "Successful women graduates sharing their business experiences with new participants",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Microfinance Launch",
    date: "2024-12-10",
    photographer: "Business Team"
  },
  {
    title: "Elder Care Day Center",
    description: "Senior citizens enjoying recreational activities at our new day care facility",
    imageUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Elderly Care",
    date: "2024-12-05",
    photographer: "Care Staff"
  },

  // Additional Mixed Categories
  {
    title: "Volunteer Training Workshop",
    description: "New volunteers learning about our programs and community engagement techniques",
    imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Volunteer Orientation",
    date: "2024-12-01",
    photographer: "Training Team"
  },
  {
    title: "Success Stories Documentation",
    description: "Former beneficiaries sharing their transformation journeys during impact assessment",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Impact Stories",
    date: "2024-11-28",
    photographer: "Documentation Team"
  }
];

async function seedPhotoGallery() {
  console.log('Starting photo gallery seeding...');
  
  try {
    // Clear existing photo gallery data
    await db.delete(photoGallery);
    console.log('Cleared existing photo gallery data');

    // Insert new photo gallery data
    for (const photo of photoGalleryData) {
      const insertData = {
        ...photo,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(photoGallery).values(insertData);
      console.log(`✓ Inserted: ${photo.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${photoGalleryData.length} photos!`);
    console.log('Photo gallery content is now available at /api/photo-gallery');
    
  } catch (error) {
    console.error('Error seeding photo gallery data:', error);
    throw error;
  }
}

// Run the seeding function
seedPhotoGallery()
  .then(() => {
    console.log('Photo gallery seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Photo gallery seeding failed:', error);
    process.exit(1);
  });
