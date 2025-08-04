import Database from 'better-sqlite3';

const db = new Database('./samruddhi.sqlite');

// Add 4 more programs as requested
const newPrograms = [
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
    title, description, icon, category, is_active, order_index
  ) VALUES (?, ?, ?, ?, ?, ?)
`);

newPrograms.forEach(program => {
  insertProgram.run(
    program.title, program.description, program.icon, 
    program.category, program.is_active, program.order_index
  );
});

console.log(`Successfully added ${newPrograms.length} more programs to the database`);

// Verify the total count
const count = db.prepare("SELECT COUNT(*) as count FROM programs").get();
console.log(`Total programs in database: ${count.count}`);

// Display all programs
const allPrograms = db.prepare("SELECT * FROM programs ORDER BY order_index").all();
console.log('\n=== ALL PROGRAMS ===');
allPrograms.forEach((program, index) => {
  console.log(`${index + 1}. ${program.title}`);
  console.log(`   Category: ${program.category}`);
  console.log('');
});

db.close();