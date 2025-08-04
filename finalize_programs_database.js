import Database from 'better-sqlite3';

const db = new Database('./samruddhi.sqlite');

// Clear existing programs and insert fresh complete set
db.exec(`DELETE FROM programs`);

// All 12 comprehensive programs for Samruddhi Service Society
const allPrograms = [
  {
    title: "Free Girls' Hostel",
    description: "Safe accommodation and nutritious meals for underprivileged rural girls from 7th to 10th standard, providing a secure environment for education.",
    icon: "fas fa-home",
    category: "education-childcare",
    is_active: 1,
    order_index: 1
  },
  {
    title: "Special Education Center (IDC)",
    description: "Integrated Education for Disabled Children - comprehensive educational support and specialized care for differently-abled children to promote inclusive learning.",
    icon: "fas fa-wheelchair",
    category: "education-childcare",
    is_active: 1,
    order_index: 2
  },
  {
    title: "Skill Development Programs",
    description: "Vocational training programs including tailoring, embroidery, computer skills, and handicrafts for sustainable livelihood opportunities.",
    icon: "fas fa-graduation-cap",
    category: "skill-development",
    is_active: 1,
    order_index: 3
  },
  {
    title: "Nutrition & Mid-Day Meal Program",
    description: "Ensuring proper nutrition for children through balanced meals, addressing malnutrition and supporting healthy growth and development.",
    icon: "fas fa-utensils",
    category: "healthcare-nutrition",
    is_active: 1,
    order_index: 4
  },
  {
    title: "Healthcare & Medical Support",
    description: "Regular health checkups, medical treatment, vaccination drives, and health awareness programs for community wellness.",
    icon: "fas fa-heart",
    category: "healthcare-nutrition",
    is_active: 1,
    order_index: 5
  },
  {
    title: "Women Empowerment Initiative",
    description: "Comprehensive programs for women including financial literacy, legal rights awareness, entrepreneurship training, and leadership development.",
    icon: "fas fa-female",
    category: "empowerment",
    is_active: 1,
    order_index: 6
  },
  {
    title: "Community Development Projects",
    description: "Rural infrastructure development, clean water initiatives, sanitation programs, and community center establishment for overall village development.",
    icon: "fas fa-user-friends",
    category: "community-development",
    is_active: 1,
    order_index: 7
  },
  {
    title: "Environmental Conservation",
    description: "Tree plantation drives, waste management programs, organic farming promotion, and environmental awareness campaigns for sustainable living.",
    icon: "fas fa-leaf",
    category: "environment",
    is_active: 1,
    order_index: 8
  },
  {
    title: "Child Care & Shelter for Orphans",
    description: "Providing shelter, food, and education for children whose parents are not there - comprehensive care for non-parent children including accommodation, nutrition, and quality education.",
    icon: "fas fa-home",
    category: "childcare-orphan",
    is_active: 1,
    order_index: 9
  },
  {
    title: "Free Karate Coaching for Rural Girls",
    description: "Empowering rural girls through free karate coaching to build self-defense skills, confidence, and physical strength for self-support and protection.",
    icon: "fas fa-fist-raised",
    category: "self-defense",
    is_active: 1,
    order_index: 10
  },
  {
    title: "Women Empowerment Programs",
    description: "Comprehensive women empowerment initiatives including leadership training, financial independence, skill development, and awareness programs for rural women.",
    icon: "fas fa-female",
    category: "women-empowerment",
    is_active: 1,
    order_index: 11
  },
  {
    title: "Old Age Care Services",
    description: "Dedicated care services for elderly people including health support, social activities, nutrition programs, and companionship for senior citizens in rural areas.",
    icon: "fas fa-user-friends",
    category: "elderly-care",
    is_active: 1,
    order_index: 12
  }
];

const insertProgram = db.prepare(`
  INSERT INTO programs (
    title, description, icon, category, is_active, order_index,
    created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const timestamp = Date.now();

allPrograms.forEach(program => {
  insertProgram.run(
    program.title, program.description, program.icon, 
    program.category, program.is_active, program.order_index,
    timestamp, timestamp
  );
});

console.log('=== DATABASE STORAGE COMPLETED ===');
console.log(`Successfully stored ${allPrograms.length} programs in database`);

// Verify storage
const count = db.prepare("SELECT COUNT(*) as count FROM programs").get();
console.log(`\nVerification: Total programs in database: ${count.count}`);

// Display all stored programs
const storedPrograms = db.prepare("SELECT * FROM programs ORDER BY order_index").all();
console.log('\n=== ALL STORED PROGRAMS ===');
storedPrograms.forEach((program, index) => {
  console.log(`${index + 1}. ${program.title}`);
  console.log(`   Category: ${program.category}`);
  console.log(`   Icon: ${program.icon}`);
  console.log(`   Active: ${program.is_active ? 'Yes' : 'No'}`);
  console.log('');
});

console.log('=== PROGRAMS BY CATEGORY ===');
const categories = db.prepare(`
  SELECT category, COUNT(*) as count 
  FROM programs 
  GROUP BY category 
  ORDER BY count DESC
`).all();

categories.forEach(cat => {
  console.log(`${cat.category}: ${cat.count} program(s)`);
});

db.close();