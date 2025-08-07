import { db } from './server/db.ts';
import { photoGallery, mediaCoverage } from './shared/schema.ts';

const currentDate = Date.now();
const oneDay = 24 * 60 * 60 * 1000;
const oneMonth = 30 * oneDay;

// Photo Gallery Data - 20 diverse photos covering all programs and events
const photoGalleryData = [
  // Girls' Hostel Photos
  {
    title: "Girls' Hostel Study Time",
    description: "Students engaged in their evening study session at our residential facility",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Daily Life",
    date: "2024-11-15",
    photographer: "Samruddhi Staff"
  },
  {
    title: "Hostel Annual Day Cultural Performance",
    description: "Traditional dance performance by hostel girls during the 10th anniversary celebration",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Girls' Hostel 10th Annual Day",
    date: "2024-12-01",
    photographer: "Event Team"
  },
  {
    title: "Nutritious Meals at Hostel",
    description: "Fresh, healthy meals prepared daily for our 65+ hostel residents",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Daily Operations",
    date: "2024-11-20",
    photographer: "Hostel Staff"
  },

  // IDC Special Education Photos
  {
    title: "Special Education Classroom Activity",
    description: "Children with special needs engaged in interactive learning at our IDC center",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Daily Learning",
    date: "2024-11-10",
    photographer: "IDC Team"
  },
  {
    title: "Art Therapy Session",
    description: "Creative expression through art helps children develop motor skills and confidence",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0a9ba3e6d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Therapy Program",
    date: "2024-11-05",
    photographer: "Dr. Priya Sharma"
  },

  // Skill Development Photos
  {
    title: "Tailoring Workshop in Progress",
    description: "Women learning advanced stitching techniques in our skill development center",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Training Session",
    date: "2024-11-25",
    photographer: "Training Team"
  },
  {
    title: "Graduation Day Celebration",
    description: "35 women proudly displaying their handmade garments at graduation ceremony",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Skill Development Graduation",
    date: "2024-12-20",
    photographer: "Ceremony Team"
  },

  // Healthcare Photos
  {
    title: "Free Medical Camp Setup",
    description: "Medical professionals preparing for community health checkup drive",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Rural Health Initiative",
    date: "2024-12-15",
    photographer: "Healthcare Team"
  },
  {
    title: "Child Health Checkup",
    description: "Young patients receiving free health screening at our mobile clinic",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Community Healthcare",
    date: "2024-11-30",
    photographer: "Dr. Rajesh Kulkarni"
  },

  // Environmental Conservation Photos
  {
    title: "Tree Plantation Drive",
    description: "Students and volunteers planting native trees during monsoon plantation drive",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Environmental Conservation Drive",
    date: "2024-12-27",
    photographer: "Environmental Team"
  },
  {
    title: "Young Environmental Champions",
    description: "School children adopting trees as part of our environmental education program",
    imageUrl: "https://images.unsplash.com/photo-1500581949512-67b3b4e5f3e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Green Education",
    date: "2024-12-28",
    photographer: "Mr. Suresh Mane"
  },

  // Karate & Sports Photos
  {
    title: "State Championship Gold Medalists",
    description: "Priya and Sneha showcasing their gold medals from Maharashtra State Karate Championship",
    imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "success_story",
    event: "Sports Achievement",
    date: "2024-11-08",
    photographer: "Sports Team"
  },
  {
    title: "Karate Training Session",
    description: "Rural girls learning self-defense techniques in our free karate coaching program",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Daily Training",
    date: "2024-11-12",
    photographer: "Karate Instructor"
  },

  // Community Events Photos
  {
    title: "Annual Fundraising Gala",
    description: "Community gathering during Hope & Harmony fundraising event that raised ₹12 lakhs",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Hope & Harmony Gala 2024",
    date: "2024-11-18",
    photographer: "Event Photographer"
  },
  {
    title: "Women Entrepreneurs Meet",
    description: "Successful women graduates sharing their business experiences with new participants",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Microfinance Launch",
    date: "2024-12-10",
    photographer: "Business Team"
  },

  // General Program Activities
  {
    title: "Leadership Training Workshop",
    description: "Young participants engaged in leadership development activities and team building",
    imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Youth Development",
    date: "2024-11-22",
    photographer: "Youth Team"
  },
  {
    title: "Community Kitchen Operations",
    description: "Volunteers preparing nutritious meals for mid-day meal program serving 800+ children",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Nutrition Program",
    date: "2024-11-28",
    photographer: "Kitchen Staff"
  },
  {
    title: "Elder Care Day Center",
    description: "Senior citizens enjoying recreational activities at our new day care facility",
    imageUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "program",
    event: "Elderly Care",
    date: "2024-12-05",
    photographer: "Care Staff"
  },
  {
    title: "Success Stories Documentation",
    description: "Former beneficiaries sharing their transformation journeys during impact assessment",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "success_story",
    event: "Impact Documentation",
    date: "2024-12-12",
    photographer: "Documentation Team"
  },
  {
    title: "Volunteer Appreciation Event",
    description: "Recognizing dedicated volunteers who support our programs throughout the year",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "general",
    event: "Volunteer Recognition",
    date: "2024-12-18",
    photographer: "Admin Team"
  }
];

// Media Coverage Data - 15 diverse media items including videos, articles, interviews
const mediaCoverageData = [
  // Video Content
  {
    type: "video",
    title: "Transforming Rural Lives Through Education - Documentary",
    description: "A comprehensive 15-minute documentary showcasing how Samruddhi Service Society is changing lives through education and empowerment in rural Maharashtra. Features interviews with beneficiaries, their families, and success stories.",
    thumbnailUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=sample-documentary",
    publishedDate: currentDate - (15 * oneDay),
    source: "Educational Media House",
    author: "Rajesh Patil"
  },
  {
    type: "video",
    title: "Success Story: From Hostel Student to College Graduate",
    description: "Inspiring journey of Priya Devi, who went from being a shy village girl in our hostel to becoming a college graduate and now a teacher in her village school. A testament to the power of education.",
    thumbnailUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=priya-success-story",
    publishedDate: currentDate - (8 * oneDay),
    source: "Impact Stories Channel",
    author: "Sunita Sharma"
  },
  {
    type: "video",
    title: "Karate Champions: Rural Girls Breaking Barriers",
    description: "Feature story on Priya Jadhav and Sneha Patil, two rural girls who won gold medals at Maharashtra State Karate Championship, showcasing how sports can build confidence and break social barriers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=karate-champions",
    publishedDate: currentDate - (5 * oneDay),
    source: "Sports Today",
    author: "Amit Kulkarni"
  },
  {
    type: "video",
    title: "Women Entrepreneurs: Achieving Financial Independence",
    description: "Powerful stories of women who transformed from being dependent to becoming successful entrepreneurs through our skill development and microfinance programs. Features real earnings and business growth.",
    thumbnailUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=women-entrepreneurs",
    publishedDate: currentDate - (3 * oneDay),
    source: "Women Empowerment Network",
    author: "Kavita Jadhav"
  },

  // News Articles & Interviews
  {
    type: "article",
    title: "NGO's Innovative Approach to Rural Girls' Education Featured in National Magazine",
    description: "Rural Development Today magazine highlights Samruddhi Service Society's unique residential education model and its impact on reducing dropout rates among rural girls. Features statistical analysis of our success rates.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (20 * oneDay),
    source: "Rural Development Today",
    author: "Dr. Meera Joshi"
  },
  {
    type: "interview",
    title: "Founder's Vision: 29 Years of Empowering Rural Communities",
    description: "Exclusive interview with our founder about the journey from a small initiative in 1995 to a comprehensive organization serving 50+ children. Discusses challenges, successes, and future expansion plans.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (25 * oneDay),
    source: "Social Impact Quarterly",
    author: "Ravi Mehta"
  },
  {
    type: "article",
    title: "Medical Camps Bring Healthcare to Remote Villages",
    description: "District newspaper coverage of our comprehensive medical camps that served 500+ patients across three remote villages, highlighting the critical healthcare gap in rural areas and our solution.",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (10 * oneDay),
    source: "Nashik District News",
    author: "Dr. Ashok Patil"
  },
  {
    type: "article",
    title: "Environmental Heroes: NGO Plants 5,000 Trees in Single Season",
    description: "Environmental magazine features our monsoon tree plantation initiative, interviewing participating students and highlighting the environmental education component that ensures long-term tree survival.",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (7 * oneDay),
    source: "Green Maharashtra",
    author: "Priya Sharma"
  },

  // Documentary & Feature Stories
  {
    type: "documentary",
    title: "Breaking Barriers: Special Education in Rural India",
    description: "Award-winning documentary featuring our IDC program and its impact on differently-abled children in rural communities. Showcases individual success stories and family transformations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://documentaryplatform.com/breaking-barriers",
    publishedDate: currentDate - (45 * oneDay),
    source: "Independent Documentary Network",
    author: "Kiran Desai"
  },
  {
    type: "interview",
    title: "State Education Minister Praises NGO's Residential Model",
    description: "Live television interview where State Education Minister discusses how Samruddhi's residential education model could be replicated across Maharashtra to address rural education challenges.",
    thumbnailUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://newschannel.com/education-minister-interview",
    publishedDate: currentDate - (30 * oneDay),
    source: "Maharashtra Today TV",
    author: "News Team"
  },
  {
    type: "article",
    title: "Fundraising Success: How Community Support Raised ₹12 Lakhs",
    description: "Business magazine analysis of our fundraising strategies and community engagement that led to record-breaking donations at our annual Hope & Harmony gala event.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (12 * oneDay),
    source: "Social Enterprise Magazine",
    author: "Anita Singh"
  },
  {
    type: "video",
    title: "A Day in the Life: Girls' Hostel Routine",
    description: "Behind-the-scenes look at daily life in our girls' hostel, showing study time, meals, recreational activities, and the supportive environment that helps rural girls excel academically.",
    thumbnailUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=hostel-day-life",
    publishedDate: currentDate - (18 * oneDay),
    source: "Educational Insights",
    author: "Hostel Team"
  },
  {
    type: "article",
    title: "Technology in Special Education: Innovation at Rural NGO",
    description: "Education technology magazine covers our use of digital tools and adaptive technologies to enhance learning experiences for differently-abled children at our IDC center.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (22 * oneDay),
    source: "EdTech India",
    author: "Dr. Rajesh Kumar"
  },
  {
    type: "interview",
    title: "Skill Development Success: Women Share Their Transformation",
    description: "Radio interview featuring graduates of our skill development program discussing how they achieved financial independence and now mentor other women in their communities.",
    thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://radiostation.com/women-empowerment-show",
    publishedDate: currentDate - (6 * oneDay),
    source: "All India Radio",
    author: "Sunita Devi"
  },
  {
    type: "article",
    title: "Community Development Model: Clean Water for 2,000+ Villagers",
    description: "Infrastructure magazine highlights our sustainable approach to providing clean water access through bore wells and local youth training for long-term maintenance.",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (14 * oneDay),
    source: "Rural Infrastructure Today",
    author: "Engineer Ramesh Kale"
  }
];

async function seedMediaContent() {
  console.log('Starting media content seeding...');
  
  try {
    // Clear existing media data
    await db.delete(photoGallery);
    await db.delete(mediaCoverage);
    console.log('Cleared existing media data');

    // Insert photo gallery data
    for (const photo of photoGalleryData) {
      const insertData = {
        ...photo,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(photoGallery).values(insertData);
      console.log(`✓ Inserted Photo: ${photo.title}`);
    }

    // Insert media coverage data
    for (const media of mediaCoverageData) {
      const insertData = {
        ...media,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(mediaCoverage).values(insertData);
      console.log(`✓ Inserted Media: ${media.title}`);
    }

    console.log(`\n🎉 Successfully seeded media content!`);
    console.log(`- ${photoGalleryData.length} photo gallery items`);
    console.log(`- ${mediaCoverageData.length} media coverage items`);
    console.log('Media content is now available at:');
    console.log('- /api/photo-gallery');
    console.log('- /api/media-coverage');
    
  } catch (error) {
    console.error('Error seeding media content:', error);
    throw error;
  }
}

// Run the seeding function
seedMediaContent()
  .then(() => {
    console.log('Media content seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Media content seeding failed:', error);
    process.exit(1);
  });