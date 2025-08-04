import Database from 'better-sqlite3';

const db = new Database('./samruddhi.sqlite');

// Create leadership table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS leadership (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    qualification TEXT,
    experience TEXT,
    email TEXT,
    linked_in TEXT,
    order_index INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
    updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
  )
`);

// Clear existing leadership data
db.exec(`DELETE FROM leadership`);

// Leadership team data for Samruddhi Service Society
const leaders = [
  {
    name: "Mrs. Sunita Sharma",
    role: "Founder & President",
    bio: "With over 25 years of dedicated service to rural education and women empowerment, Mrs. Sunita Sharma founded Samruddhi Service Society in 1995. Her vision of providing free education and hostel facilities for underprivileged girls has transformed hundreds of lives.",
    qualification: "M.A. in Social Work, B.Ed.",
    experience: "25+ years in NGO management and rural development",
    email: "sunita.sharma@samruddhi.org",
    linked_in: null,
    order_index: 1
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Secretary & Program Director",
    bio: "A passionate advocate for inclusive education, Mr. Rajesh Kumar leads our IDC (Integrated Education for Disabled Children) program. His expertise in special education has made quality education accessible to differently-abled children in rural areas.",
    qualification: "M.Ed. in Special Education, Diploma in Rehabilitation",
    experience: "20+ years in special education and rehabilitation",
    email: "rajesh.kumar@samruddhi.org",
    linked_in: null,
    order_index: 2
  },
  {
    name: "Dr. Priya Patel",
    role: "Medical Director",
    bio: "Dr. Priya Patel oversees our healthcare and nutrition programs, ensuring comprehensive medical support for children and community members. Her dedication to rural healthcare has significantly improved health outcomes in our service areas.",
    qualification: "MBBS, MD in Community Medicine",
    experience: "15+ years in rural healthcare and public health",
    email: "dr.priya@samruddhi.org",
    linked_in: null,
    order_index: 3
  },
  {
    name: "Ms. Kavita Singh",
    role: "Women Empowerment Coordinator",
    bio: "Leading our women empowerment initiatives, Ms. Kavita Singh has been instrumental in developing skill training programs, financial literacy workshops, and self-defense classes for rural women and girls.",
    qualification: "MSW in Women Studies, Certified Trainer",
    experience: "12+ years in women empowerment and skill development",
    email: "kavita.singh@samruddhi.org",
    linked_in: null,
    order_index: 4
  },
  {
    name: "Mr. Arun Verma",
    role: "Finance & Administration Head",
    bio: "With a strong background in financial management and administrative operations, Mr. Arun Verma ensures transparent and efficient utilization of resources for maximum impact in our programs.",
    qualification: "M.Com, CA, MBA in Finance",
    experience: "18+ years in financial management and administration",
    email: "arun.verma@samruddhi.org",
    linked_in: null,
    order_index: 5
  },
  {
    name: "Mrs. Meera Joshi",
    role: "Education Coordinator",
    bio: "Mrs. Meera Joshi manages our educational programs including the girls' hostel and academic support initiatives. Her commitment to quality education has helped maintain excellent academic outcomes.",
    qualification: "M.Ed., B.Ed., 10+ years teaching experience",
    experience: "15+ years in educational administration and teaching",
    email: "meera.joshi@samruddhi.org",
    linked_in: null,
    order_index: 6
  }
];

const insertLeader = db.prepare(`
  INSERT INTO leadership (
    name, role, bio, qualification, experience, email, linked_in, order_index,
    is_active, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const timestamp = Date.now();

leaders.forEach(leader => {
  insertLeader.run(
    leader.name, leader.role, leader.bio, leader.qualification,
    leader.experience, leader.email, leader.linked_in, leader.order_index,
    1, timestamp, timestamp
  );
});

console.log('=== LEADERSHIP DATABASE STORAGE COMPLETED ===');
console.log(`Successfully stored ${leaders.length} leadership members in database`);

// Verify storage
const count = db.prepare("SELECT COUNT(*) as count FROM leadership").get();
console.log(`\nVerification: Total leadership members in database: ${count.count}`);

// Display all stored leaders
const storedLeaders = db.prepare("SELECT * FROM leadership ORDER BY order_index").all();
console.log('\n=== ALL LEADERSHIP MEMBERS ===');
storedLeaders.forEach((leader, index) => {
  console.log(`${index + 1}. ${leader.name}`);
  console.log(`   Role: ${leader.role}`);
  console.log(`   Qualification: ${leader.qualification}`);
  console.log(`   Email: ${leader.email}`);
  console.log('');
});

db.close();