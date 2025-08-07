
import { db } from './server/db.ts';
import { photoGallery, mediaCoverage } from './shared/schema.ts';

const currentDate = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

// Enhanced Media Coverage Data with 15 diverse items
const enhancedMediaCoverageData = [
  // Video Content - Documentaries & Features
  {
    type: "video",
    title: "Transforming Rural Lives: 29 Years of Samruddhi Service Society",
    description: "A comprehensive 20-minute documentary showcasing how Samruddhi Service Society has been changing lives through education and empowerment in rural Maharashtra since 1995. Features interviews with beneficiaries, their families, success stories, and the dedicated team behind the mission.",
    thumbnailUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=samruddhi-documentary-2024",
    publishedDate: currentDate - (10 * oneDay),
    source: "Maharashtra Educational Media House",
    author: "Rajesh Patil"
  },
  {
    type: "video",
    title: "Success Story: From Village Girl to Software Engineer",
    description: "Inspiring 15-minute feature on Priya Sharma, who went from being a shy village girl in our hostel to becoming a software engineer at a leading tech company. Her journey demonstrates the transformative power of education and the support provided by Samruddhi's residential program.",
    thumbnailUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=priya-success-story-2024",
    publishedDate: currentDate - (5 * oneDay),
    source: "Impact Stories Channel",
    author: "Sunita Devi"
  },
  {
    type: "video",
    title: "Champions from the Village: Karate Gold Medalists",
    description: "Heartwarming story of Priya Jadhav and Sneha Patil, two rural girls who won gold medals at Maharashtra State Karate Championship. Shows how sports training builds confidence, discipline, and breaks social barriers for rural girls.",
    thumbnailUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=karate-champions-maharashtra",
    publishedDate: currentDate - (15 * oneDay),
    source: "Sports Maharashtra TV",
    author: "Amit Kulkarni"
  },
  {
    type: "video",
    title: "Women Entrepreneurs: Breaking Barriers Through Skill Development",
    description: "Powerful 12-minute feature showcasing women who transformed from being dependent to successful entrepreneurs through our skill development and microfinance programs. Includes real earnings data and business growth stories.",
    thumbnailUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=women-entrepreneurs-samruddhi",
    publishedDate: currentDate - (8 * oneDay),
    source: "Women Empowerment Network",
    author: "Kavita Jadhav"
  },
  {
    type: "video",
    title: "Special Education Excellence: IDC Program Impact",
    description: "Moving documentary about our Integrated Development Center (IDC) and its impact on differently-abled children in rural communities. Features therapy sessions, educational activities, and testimonials from parents and children.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=idc-special-education",
    publishedDate: currentDate - (20 * oneDay),
    source: "Special Education Awareness",
    author: "Dr. Priya Sharma"
  },

  // News Articles & Print Media
  {
    type: "article",
    title: "Maharashtra NGO's Innovative Approach Featured in National Education Magazine",
    description: "Rural Development Today magazine highlights Samruddhi Service Society's unique residential education model and its 95% success rate in reducing dropout among rural girls. Includes statistical analysis and expert opinions.",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (25 * oneDay),
    source: "Rural Development Today",
    author: "Dr. Meera Joshi"
  },
  {
    type: "article",
    title: "Medical Camp Brings Hope to 500+ Villagers in Remote Maharashtra",
    description: "District newspaper coverage of our comprehensive medical camp that provided free healthcare across three remote villages. Highlights the critical healthcare gap in rural areas and sustainable solutions.",
    thumbnailUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (12 * oneDay),
    source: "Nashik District News",
    author: "Dr. Ashok Patil"
  },
  {
    type: "article",
    title: "Environmental Heroes: NGO Plants 5,000 Trees in Single Monsoon",
    description: "Environmental magazine features our monsoon tree plantation initiative, highlighting the community participation and environmental education component that ensures 90% tree survival rate.",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (18 * oneDay),
    source: "Green Maharashtra",
    author: "Environmental Reporter"
  },

  // Interviews & Features
  {
    type: "interview",
    title: "Founder's Vision: Building Tomorrow's Leaders from Rural India",
    description: "Exclusive 30-minute interview with Samruddhi's founder about the 29-year journey from a small initiative to comprehensive organization serving 50+ children. Discusses challenges, innovations, and expansion plans.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://radiostation.com/founder-interview-samruddhi",
    publishedDate: currentDate - (30 * oneDay),
    source: "Social Impact Quarterly",
    author: "Ravi Mehta"
  },
  {
    type: "interview",
    title: "State Education Minister Praises Samruddhi's Residential Model",
    description: "Live television interview where Maharashtra Education Minister discusses how Samruddhi's residential education model could be replicated across the state to address rural education challenges.",
    thumbnailUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://newschannel.com/education-minister-samruddhi",
    publishedDate: currentDate - (35 * oneDay),
    source: "Maharashtra Today TV",
    author: "News Anchor Team"
  },

  // Documentary & Award Coverage
  {
    type: "documentary",
    title: "Breaking Barriers: Special Education Revolution in Rural India",
    description: "Award-winning 45-minute documentary featuring our IDC program's impact on differently-abled children. Winner of Best Social Impact Documentary at Mumbai International Film Festival 2024.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://documentaryplatform.com/breaking-barriers-samruddhi",
    publishedDate: currentDate - (60 * oneDay),
    source: "Independent Documentary Network",
    author: "Kiran Desai"
  },
  {
    type: "article",
    title: "Fundraising Excellence: How Community Support Raised ₹12 Lakhs",
    description: "Business magazine analysis of our fundraising strategies and community engagement that led to record-breaking donations at Hope & Harmony gala. Includes donor testimonials and impact projections.",
    thumbnailUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (7 * oneDay),
    source: "Social Enterprise Magazine",
    author: "Anita Singh"
  },

  // Recent Coverage
  {
    type: "video",
    title: "A Day in the Life: Inside Samruddhi Girls' Hostel",
    description: "Behind-the-scenes 18-minute look at daily life in our girls' hostel, from morning studies to evening cultural activities. Shows the supportive environment that helps rural girls excel academically and personally.",
    thumbnailUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://youtube.com/watch?v=hostel-day-life-samruddhi",
    publishedDate: currentDate - (3 * oneDay),
    source: "Educational Insights",
    author: "Hostel Documentation Team"
  },
  {
    type: "article",
    title: "Technology in Special Education: Rural Innovation at Samruddhi IDC",
    description: "EdTech magazine covers our innovative use of adaptive technologies and digital tools to enhance learning experiences for differently-abled children. Features case studies and outcomes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    publishedDate: currentDate - (22 * oneDay),
    source: "EdTech India",
    author: "Dr. Rajesh Kumar"
  },
  {
    type: "interview",
    title: "Skill Development Success: Women Share Their Transformation",
    description: "Radio show featuring graduates of our skill development program discussing financial independence and how they now mentor other women. Includes business tips and success strategies.",
    thumbnailUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    mediaUrl: "https://radiostation.com/women-empowerment-show",
    publishedDate: currentDate - (1 * oneDay),
    source: "All India Radio",
    author: "Sunita Devi"
  }
];

// Enhanced Photo Gallery Data - 25 diverse photos covering all programs
const enhancedPhotoGalleryData = [
  // Girls' Hostel & Education
  {
    title: "Morning Study Session at Girls' Hostel",
    description: "65+ girls engaged in their daily morning study routine in our well-equipped study halls",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Daily Academic Life",
    date: "2024-12-15",
    photographer: "Hostel Staff"
  },
  {
    title: "10th Anniversary Cultural Performance",
    description: "Students performing traditional Maharashtra folk dance during hostel's 10th anniversary celebration",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "event",
    event: "Girls' Hostel 10th Anniversary",
    date: "2024-12-01",
    photographer: "Event Photography Team"
  },
  {
    title: "Nutritious Community Kitchen",
    description: "Fresh, balanced meals being prepared daily for our 65+ hostel residents by trained kitchen staff",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "daily_life",
    event: "Nutrition Program",
    date: "2024-12-20",
    photographer: "Kitchen Team"
  },

  // IDC Special Education
  {
    title: "Interactive Learning at IDC Center",
    description: "Children with special needs engaged in sensory learning activities with specialized educational tools",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "special_education",
    event: "Daily Therapy Sessions",
    date: "2024-12-18",
    photographer: "Dr. Priya Sharma"
  },
  {
    title: "Art Therapy & Creative Expression",
    description: "Differently-abled children showcasing their artistic talents during weekly art therapy sessions",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0a9ba3e6d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "therapy",
    event: "Creative Arts Program",
    date: "2024-12-12",
    photographer: "Therapy Team"
  },

  // Skill Development & Women Empowerment
  {
    title: "Advanced Tailoring Workshop",
    description: "Women mastering complex stitching techniques in our fully equipped skill development center",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "skill_development",
    event: "Women's Training Program",
    date: "2024-12-10",
    photographer: "Training Coordinator"
  },
  {
    title: "Graduation Day Pride",
    description: "35 proud women displaying their handcrafted garments and certificates at graduation ceremony",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "achievement",
    event: "Skill Development Graduation",
    date: "2024-11-25",
    photographer: "Ceremony Team"
  },

  // Healthcare & Medical Camps
  {
    title: "Rural Medical Camp Setup",
    description: "Healthcare professionals setting up comprehensive medical facility in remote village location",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "healthcare",
    event: "Community Health Initiative",
    date: "2024-12-05",
    photographer: "Medical Team"
  },
  {
    title: "Child Health & Vaccination Drive",
    description: "Young patients receiving comprehensive health checkups and vaccinations from qualified doctors",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "health_checkup",
    event: "Pediatric Care Program",
    date: "2024-11-30",
    photographer: "Dr. Rajesh Kulkarni"
  },

  // Environmental Conservation
  {
    title: "Monsoon Tree Plantation Drive",
    description: "Students and community volunteers planting native tree species during annual environmental initiative",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "environment",
    event: "Green Maharashtra Initiative",
    date: "2024-07-15",
    photographer: "Environmental Team"
  },
  {
    title: "Young Environmental Champions",
    description: "School children adopting saplings as part of our comprehensive environmental education program",
    imageUrl: "https://images.unsplash.com/photo-1500581949512-67b3b4e5f3e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "education",
    event: "Environmental Awareness",
    date: "2024-08-20",
    photographer: "Mr. Suresh Mane"
  },

  // Sports & Self Defense
  {
    title: "State Karate Champions",
    description: "Gold medalists Priya Jadhav and Sneha Patil displaying their Maharashtra State Championship medals",
    imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "sports_achievement",
    event: "State Level Competition",
    date: "2024-11-08",
    photographer: "Sports Coordinator"
  },
  {
    title: "Daily Karate Training Session",
    description: "75+ rural girls learning self-defense techniques and building confidence through martial arts",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "sports_training",
    event: "Self Defense Program",
    date: "2024-12-22",
    photographer: "Karate Instructor"
  },

  // Community Events & Fundraising
  {
    title: "Hope & Harmony Gala 2024",
    description: "300+ supporters gathered for our annual fundraising event that raised ₹12 lakhs for programs",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "fundraising",
    event: "Annual Gala Night",
    date: "2024-11-18",
    photographer: "Event Photography"
  },
  {
    title: "Community Leadership Meeting",
    description: "Local leaders and beneficiaries discussing program expansion and community development initiatives",
    imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "community",
    event: "Leadership Development",
    date: "2024-12-08",
    photographer: "Community Team"
  },

  // Success Stories & Impact
  {
    title: "Graduate Success Documentation",
    description: "Former beneficiaries sharing their transformation stories and career achievements with current students",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "success_story",
    event: "Alumni Mentorship Program",
    date: "2024-12-12",
    photographer: "Documentation Team"
  },
  {
    title: "Volunteer Appreciation Ceremony",
    description: "Recognizing dedicated volunteers who have supported our programs throughout the year with service awards",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "appreciation",
    event: "Volunteer Recognition",
    date: "2024-12-18",
    photographer: "Admin Team"
  },

  // Additional Programs
  {
    title: "Elder Care Day Center Activities",
    description: "Senior citizens enjoying recreational activities and social interaction at our new day care facility",
    imageUrl: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "elderly_care",
    event: "Senior Citizen Support",
    date: "2024-12-05",
    photographer: "Care Staff"
  },
  {
    title: "Mid-Day Meal Program Operation",
    description: "Nutritious meal preparation for 800+ children across 15 village schools in our kitchen facilities",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "nutrition",
    event: "School Meal Program",
    date: "2024-12-20",
    photographer: "Nutrition Team"
  },
  {
    title: "Water Project Implementation",
    description: "Community members celebrating the successful installation of clean water systems serving 2,000+ villagers",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "infrastructure",
    event: "Clean Water Initiative",
    date: "2024-10-15",
    photographer: "Infrastructure Team"
  },
  {
    title: "Microfinance Program Launch",
    description: "50 women entrepreneurs receiving their first microfinance loans and business training materials",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "entrepreneurship",
    event: "Women's Economic Empowerment",
    date: "2024-12-10",
    photographer: "Finance Team"
  },
  {
    title: "Child Care Center Family Environment",
    description: "8 newly admitted children feeling at home in our caring family-like environment with dedicated caregivers",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "childcare",
    event: "Child Protection Program",
    date: "2024-12-08",
    photographer: "Child Care Team"
  },
  {
    title: "Annual Academic Excellence Awards",
    description: "Top-performing students receiving recognition for their outstanding academic achievements and dedication",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "academic",
    event: "Excellence Recognition",
    date: "2024-12-15",
    photographer: "Academic Team"
  },
  {
    title: "Technology Integration in Learning",
    description: "Students using tablets and digital learning tools to enhance their educational experience with modern technology",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    category: "technology",
    event: "Digital Education Initiative",
    date: "2024-12-22",
    photographer: "Education Technology Team"
  }
];

async function seedComprehensiveMediaContent() {
  console.log('Starting comprehensive media content seeding...');
  
  try {
    // Clear existing media data
    await db.delete(photoGallery);
    await db.delete(mediaCoverage);
    console.log('Cleared existing media data');

    // Insert enhanced photo gallery data
    for (const photo of enhancedPhotoGalleryData) {
      const insertData = {
        ...photo,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(photoGallery).values(insertData);
      console.log(`✓ Inserted Photo: ${photo.title}`);
    }

    // Insert enhanced media coverage data
    for (const media of enhancedMediaCoverageData) {
      const insertData = {
        ...media,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(mediaCoverage).values(insertData);
      console.log(`✓ Inserted Media: ${media.title}`);
    }

    console.log(`\n🎉 Successfully seeded comprehensive media content!`);
    console.log(`- ${enhancedPhotoGalleryData.length} photo gallery items`);
    console.log(`- ${enhancedMediaCoverageData.length} media coverage items`);
    console.log('\nMedia content categories include:');
    console.log('📺 Videos: Documentaries, success stories, program features');
    console.log('📰 Articles: News coverage, magazine features, award recognition');
    console.log('🎤 Interviews: Founder stories, beneficiary testimonials, expert discussions');
    console.log('📸 Photos: Events, daily activities, achievements, program impacts');
    console.log('\nMedia content is now available at:');
    console.log('- /api/photo-gallery');
    console.log('- /api/media-coverage');
    
  } catch (error) {
    console.error('Error seeding comprehensive media content:', error);
    throw error;
  }
}

// Run the seeding function
seedComprehensiveMediaContent()
  .then(() => {
    console.log('Comprehensive media content seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Comprehensive media content seeding failed:', error);
    process.exit(1);
  });
