import Database from 'better-sqlite3';

const db = new Database('./samruddhi.sqlite');

// Clear existing programs first
db.exec(`DELETE FROM programs`);

// Insert all 8 comprehensive programs
const programs = [
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
  }
];

const insertProgram = db.prepare(`
  INSERT INTO programs (
    title, description, icon, category, is_active, order_index
  ) VALUES (?, ?, ?, ?, ?, ?)
`);

programs.forEach(program => {
  insertProgram.run(
    program.title, program.description, program.icon, 
    program.category, program.is_active, program.order_index
  );
});

console.log(`Successfully added ${programs.length} programs to the database`);

// Verify the insertion
const count = db.prepare("SELECT COUNT(*) as count FROM programs").get();
console.log(`Total programs in database: ${count.count}`);

// Display all programs
const allPrograms = db.prepare("SELECT * FROM programs ORDER BY order_index").all();
console.log('\n=== ALL PROGRAMS ===');
allPrograms.forEach((program, index) => {
  console.log(`${index + 1}. ${program.title}`);
  console.log(`   Category: ${program.category}`);
  console.log(`   Icon: ${program.icon}`);
  console.log('');
});

db.close();