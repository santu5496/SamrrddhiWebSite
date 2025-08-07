import { db } from './server/db.ts';
import { news, programs } from './shared/schema.ts';

const newsData = [
  {
    title: "Free Girls' Hostel Celebrates 10th Annual Day with Record Enrollment",
    content: "Samruddhi Service Society's Free Girls' Hostel celebrated its 10th Annual Day with great enthusiasm as we now support 65+ rural girls from 7th to 10th standard. The celebration featured cultural performances by the girls, showcasing their talents in dance, singing, and drama. This year, 12 girls from our hostel scored above 85% in their 10th standard board exams, with three securing admission to prestigious colleges. 'Seeing these girls grow from shy village children to confident young women pursuing their dreams is the greatest reward for our work,' said hostel warden Mrs. Sunita Patil. The event was attended by donors, local officials, and proud parents who traveled from nearby villages to witness their daughters' achievements.",
    excerpt: "Our Girls' Hostel celebrated its 10th Annual Day with 65+ rural girls showing remarkable achievements in academics and cultural activities.",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 13,
    category: "education",
    tags: JSON.stringify(["education", "girls empowerment", "rural development"])
  },
  {
    title: "Special Education Center (IDC) Introduces New Therapy Programs",
    content: "Our Integrated Development Center for differently-abled children has expanded its services with the introduction of occupational therapy and speech therapy programs. The new initiatives will benefit 45+ children currently enrolled in our special education program. Dr. Priya Sharma, our newly appointed special educator with 15 years of experience, brings specialized expertise. 'Every child has unique potential. Our job is to identify and nurture that potential through personalized care and education,' she shared during the program launch. The center has also received new educational aids and sensory equipment donated by the Rotary Club of Nashik, enhancing our ability to provide comprehensive support.",
    excerpt: "IDC expands services with new occupational and speech therapy programs for 45+ differently-abled children.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 14,
    category: "special-education",
    tags: JSON.stringify(["special education", "therapy programs", "disability support"])
  },
  {
    title: "Skill Development Programs Graduate 35 Women in Tailoring & Embroidery",
    content: "Thirty-five women from rural villages around Nashik completed our 6-month tailoring and embroidery training program, marking another successful batch. The graduation ceremony featured beautiful garments and handicrafts created by participants. Meera Devi from Pimpri village shared: 'I can now earn ₹8,000 per month from home while taking care of my family. This training has given me financial independence I never thought possible.' The program has helped over 200 women achieve economic self-sufficiency since its inception. We're now expanding to include computer skills and handicraft training in the next batch starting September 2025.",
    excerpt: "35 women graduated from our tailoring & embroidery program, achieving financial independence with ₹8,000+ monthly earnings.",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 15,
    category: "skill-development",
    tags: JSON.stringify(["skill development", "women empowerment", "livelihood"])
  },
  {
    title: "Mid-Day Meal Program Serves 1 Millionth Meal Milestone",
    content: "Our Nutrition & Mid-Day Meal Program reached a historic milestone by serving its 1 millionth nutritious meal to children across 15 village schools in the Nashik region. The program currently provides daily meals to 800+ children, ensuring balanced nutrition essential for healthy growth. 'When children get proper nutrition, their attendance improves and concentration increases,' explained nutrition coordinator Mrs. Kavita Jadhav. Health assessments show a 40% reduction in malnutrition cases among participating children over the past two years. Local farmers have partnered with us to provide fresh vegetables, creating a sustainable model that benefits both children and the farming community.",
    excerpt: "Historic milestone reached: 1 millionth nutritious meal served to 800+ children across 15 village schools.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 16,
    category: "nutrition",
    tags: JSON.stringify(["nutrition", "child care", "health"])
  },
  {
    title: "Free Medical Camp in Remote Villages Serves 500+ Patients",
    content: "Our healthcare team, in collaboration with district hospital doctors, conducted a comprehensive medical camp across three remote villages, providing free health checkups and treatment to over 500 community members. The three-day camp included general health screening, eye checkups, women's health consultations, and child vaccination drives. Dr. Rajesh Kulkarni noted: 'Many villagers travel long distances for basic healthcare. By bringing services to their doorstep, we're ensuring early detection and treatment of health issues.' The camp distributed free medicines worth ₹75,000 and identified 25 patients requiring specialized treatment, who were referred to district hospitals with follow-up support from our team.",
    excerpt: "Medical camp provides free healthcare to 500+ patients across three remote villages with ₹75,000 worth of medicines.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 17,
    category: "healthcare",
    tags: JSON.stringify(["healthcare", "medical camp", "rural health"])
  },
  {
    title: "Women Empowerment Initiative Launches New Microfinance Program",
    content: "Building on the success of our women empowerment programs, we've launched a new microfinance initiative supporting 50 women entrepreneurs with small loans ranging from ₹10,000 to ₹50,000. The program includes financial literacy training and ongoing business mentorship. Sushma Patil, who received a loan to start her vegetable vending business, said: 'The training taught me how to maintain accounts and plan my business. In just three months, I've doubled my income and can now support my children's education better.' The initiative is part of our comprehensive approach to women's empowerment that includes leadership training, legal rights awareness, and entrepreneurship development.",
    excerpt: "New microfinance program supports 50 women entrepreneurs with loans up to ₹50,000 plus business mentorship.",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 18,
    category: "empowerment",
    tags: JSON.stringify(["women empowerment", "microfinance", "entrepreneurship"])
  },
  {
    title: "Community Development Project Brings Clean Water to 5 Villages",
    content: "Our latest community development project has successfully established clean water access for over 2,000 residents across five villages through the installation of bore wells and water purification systems. The project addresses the critical water scarcity issues that have affected these communities for decades. Village sarpanch Mr. Ramesh Kale expressed gratitude: 'Our women and children no longer need to walk 2-3 kilometers daily for water. This project has transformed our village life completely.' The initiative also includes training local youth in water system maintenance, ensuring long-term sustainability of the infrastructure.",
    excerpt: "Clean water access established for 2,000+ residents across 5 villages through new bore wells and purification systems.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 19,
    category: "community-development",
    tags: JSON.stringify(["water access", "community development", "infrastructure"])
  },
  {
    title: "Environmental Conservation Drive Plants 5,000 Trees This Monsoon",
    content: "With the onset of monsoon season, our environmental conservation team successfully planted 5,000 trees across 10 villages in collaboration with local schools and community groups. The plantation drive focuses on native species that will help prevent soil erosion and improve local biodiversity. Students from participating schools have adopted trees and will monitor their growth as part of an environmental education program. 'We want children to understand their role as environmental guardians,' said our environment coordinator, Mr. Suresh Mane. The initiative also includes training farmers in organic farming methods and waste management practices, promoting sustainable agricultural practices in rural areas.",
    excerpt: "5,000 native trees planted across 10 villages with students adopting trees as environmental guardians.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 20,
    category: "environment",
    tags: JSON.stringify(["tree plantation", "environmental education", "sustainability"])
  },
  {
    title: "Child Care Center Welcomes 8 New Children, Seeks Foster Support",
    content: "Our Child Care & Shelter facility has welcomed eight new children (ages 6-14) who lost their parents due to various circumstances. Our dedicated team of caregivers provides comprehensive support including accommodation, nutrition, education, and emotional care. 'Each child who comes to us carries their own story of loss, but also immense potential for a bright future,' shared our childcare coordinator, Mrs. Anita Sharma. 'We work to create a family-like environment where they can heal, learn, and grow.' We're actively seeking foster families and mentors who can provide additional emotional support and guidance to help these children integrate into society as confident, capable individuals.",
    excerpt: "8 new children welcomed at our care center, seeking foster families and mentors for comprehensive support.",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 21,
    category: "child-care",
    tags: JSON.stringify(["child care", "orphan support", "foster care"])
  },
  {
    title: "Free Karate Coaching Program Produces State-Level Champions",
    content: "Two girls from our Free Karate Coaching program, Priya Jadhav (age 14) and Sneha Patil (age 16), won gold medals at the Maharashtra State Karate Championship, bringing pride to their villages and inspiring other rural girls to join our self-defense training program. 'Learning karate has not only made me physically strong but also mentally confident,' said Priya, who started training two years ago. 'I now feel safe walking to school and want to become a karate instructor to teach other girls.' Our karate program currently trains 75+ rural girls free of cost, focusing on building self-defense skills, confidence, and physical fitness. The program has seen a 90% improvement in school attendance among participating girls.",
    excerpt: "Rural girls Priya and Sneha win gold medals at Maharashtra State Karate Championship, inspiring others.",
    imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 22,
    category: "self-defense",
    tags: JSON.stringify(["karate", "girls empowerment", "sports achievement"])
  },
  {
    title: "Women Empowerment Programs Show 300% Income Increase for Graduates",
    content: "Our comprehensive women empowerment initiatives have achieved remarkable results with graduates reporting an average 300% increase in monthly income. The programs include leadership training, financial independence coaching, skill development, and awareness sessions for rural women. Over 200 women have completed various empowerment modules since inception, with success stories including micro-entrepreneurs, self-help group leaders, and women taking active roles in village development committees. The program combines practical skills with confidence building and legal rights awareness, creating lasting change in rural communities.",
    excerpt: "Women empowerment graduates achieve 300% income increase through leadership training and skill development programs.",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 23,
    category: "empowerment",
    tags: JSON.stringify(["women empowerment", "income generation", "leadership"])
  },
  {
    title: "Old Age Care Services Expands with New Day Care Center",
    content: "Responding to growing needs in rural communities, we've opened a new day care center for elderly citizens in Pimpri village, complementing our existing old age care services. The center provides daily activities, health monitoring, nutritious meals, and social interaction opportunities for 30+ senior citizens. 'Many elderly people in villages feel isolated as their children move to cities for work. This center gives them purpose, companionship, and care,' explained our elderly care specialist, Mrs. Mangal Devi. The center operates six days a week and includes services like physiotherapy, recreational activities, health checkups, and counseling support for emotional wellbeing.",
    excerpt: "New day care center for elderly citizens provides daily activities, health monitoring, and social interaction for 30+ seniors.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: 24,
    category: "elderly-care",
    tags: JSON.stringify(["elderly care", "day care center", "community service"])
  },
  {
    title: "Annual Fundraising Event 'Hope & Harmony' Raises ₹12 Lakhs",
    content: "Our annual fundraising event 'Hope & Harmony' exceeded all expectations, raising ₹12 lakhs for our various programs. Over 300 supporters, including local business leaders, government officials, and community members, attended the evening of cultural performances, inspirational speeches, and program exhibitions. The highlight of the event was a presentation by girls from our hostel and differently-abled children from our IDC, showcasing their talents and achievements. 'Seeing these children perform with such confidence and joy moved everyone present,' noted event coordinator Mr. Prakash Desai. Funds raised will support the expansion of our girls' hostel, purchase of new equipment for the special education center, and enhancement of our healthcare programs.",
    excerpt: "Annual fundraising event raises ₹12 lakhs with performances by hostel girls and IDC children inspiring 300+ attendees.",
    imageUrl: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    programId: null,
    category: "fundraising",
    tags: JSON.stringify(["fundraising", "community support", "events"])
  }
];

async function seedNews() {
  console.log('Starting news seeding...');
  
  try {
    // Clear existing news data
    await db.delete(news);
    console.log('Cleared existing news data');

    // Insert new news data
    for (const newsItem of newsData) {
      const publishedDate = Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000; // Random date within last 30 days
      
      const insertData = {
        ...newsItem,
        publishedDate: Math.floor(publishedDate),
        isPublished: true,
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await db.insert(news).values(insertData);
      console.log(`✓ Inserted: ${newsItem.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${newsData.length} news articles!`);
    console.log('News content is now available at /api/news');
    
  } catch (error) {
    console.error('Error seeding news data:', error);
    throw error;
  }
}

// Run the seeding function
seedNews()
  .then(() => {
    console.log('News seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('News seeding failed:', error);
    process.exit(1);
  });