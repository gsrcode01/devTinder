const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../config/database");
const User = require("../models/user");

const femaleFirstNames = [
  "Priya", "Ananya", "Neha", "Sarah", "Emma", "Chloe", "Aisha", "Zoe",
  "Elena", "Maya", "Sophie", "Nikita", "Hannah", "Fatima", "Sara", "Meera",
  "Naomi", "Riya", "Aarohi", "Tara", "Shruti", "Tanvi", "Diya", "Kavya",
  "Aditi", "Ishita", "Anika", "Sanya", "Sneha", "Pallavi", "Divya", "Swati",
  "Jessica", "Emily", "Rachel", "Samantha", "Olivia", "Amelia", "Mia", "Ava",
  "Clara", "Freya", "Astrid", "Linnea", "Camille", "Lucia", "Maria", "Yuki",
  "Mei", "Li", "Ji-won", "Min-seo", "Zara", "Leila", "Yasmin", "Noor"
];

const maleFirstNames = [
  "Vikram", "Arjun", "Alex", "David", "Tariq", "Liam", "Kevin", "Arjun",
  "Marcus", "James", "Daniel", "Ronak", "Kenji", "Christian", "Lucas", "Dev",
  "Rohan", "Aditya", "Rahul", "Karan", "Siddharth", "Varun", "Abhishek", "Manish",
  "Aman", "Nikhil", "Gaurav", "Harsh", "Prateek", "Ayush", "Kartik", "Vishal",
  "Michael", "Matthew", "Lucas", "Ethan", "Noah", "Oliver", "William", "Benjamin",
  "Henry", "Alexander", "Sebastian", "Jack", "Mateo", "Leo", "Julian", "Gabriel",
  "Hiroshi", "Ken", "Wei", "Jun", "Sung-min", "Hyun-woo", "Omar", "Zayd"
];

const lastNames = [
  "Sharma", "Rao", "Mehta", "Kapoor", "Nair", "Chen", "Rivera", "Kim",
  "Mansoor", "O'Connor", "Lin", "Zhang", "Becker", "Brody", "Wilson", "Al-Zahra",
  "Evans", "Lindqvist", "Patel", "Rostova", "Sato", "Iyer", "Bale", "Scott",
  "Gupta", "Verma", "Singh", "Reddy", "Choudhury", "Bose", "Banerjee", "Mukherjee",
  "Johnson", "Smith", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
  "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
  "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green"
];

const femaleAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=700",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700"
];

const maleAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=700",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=700",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=700",
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=700",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=700"
];

const skillPool = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Go", "Rust", "Java",
  "Spring Boot", "Next.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Kafka",
  "Docker", "Kubernetes", "AWS", "GCP", "GraphQL", "Tailwind CSS", "FastAPI",
  "PyTorch", "TensorFlow", "Django", "Vue.js", "SvelteKit", "Solidity", "C++",
  "Microservices", "CI/CD", "Terraform", "WebSockets", "gRPC", "React Native", "Swift"
];

const bioTemplates = [
  "Building high-scale cloud platforms and resilient backend microservices.",
  "Frontend specialist crafting silky smooth 60fps animations & delightful UI.",
  "AI researcher fine-tuning LLMs, contextual RAG, and autonomous agent swarms.",
  "Fullstack JavaScript wizard passionate about developer productivity tools.",
  "Low-latency systems, memory safety, and high-concurrency database internals.",
  "DevOps & SRE engineer obsessed with zero-downtime CI/CD and Kubernetes.",
  "Mobile engineer creating slick cross-platform iOS & Android experiences.",
  "Passionate open-source creator looking for coding buddies and hackathon partners.",
  "Data engineer converting raw real-time telemetry into high-impact pipelines.",
  "Web3 & Smart Contract developer building decentralized protocols."
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr, minCount = 3, maxCount = 5) {
  const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function seed10kUsers() {
  try {
    console.log("🚀 Starting 10,000+ Developer Generation for DevTinder...");
    await connectDB();
    console.log("Connected to MongoDB Atlas successfully.");

    const existingCount = await User.countDocuments();
    console.log(`Current existing users in database: ${existingCount}`);

    const targetUsers = 10500;
    const usersToCreate = Math.max(0, targetUsers - existingCount);

    if (usersToCreate <= 0) {
      console.log(`✅ Database already has ${existingCount} users (10,000+ goal met).`);
      process.exit(0);
    }

    console.log(`Generating ${usersToCreate} new developers...`);
    const hashedPassword = await bcrypt.hash("DevPassword@123", 10);

    const batchSize = 1000;
    let totalInserted = 0;
    const startTime = Date.now();

    for (let batchStart = 0; batchStart < usersToCreate; batchStart += batchSize) {
      const currentBatchSize = Math.min(batchSize, usersToCreate - batchStart);
      const batch = [];

      for (let i = 0; i < currentBatchSize; i++) {
        const globalIndex = existingCount + batchStart + i + 1;
        const isFemale = Math.random() > 0.45;
        const firstName = isFemale ? getRandomItem(femaleFirstNames) : getRandomItem(maleFirstNames);
        const lastName = getRandomItem(lastNames);
        const emailId = `dev${globalIndex}_${firstName.toLowerCase()}${lastName.toLowerCase()}@devtinder.io`;
        const photourl = isFemale ? getRandomItem(femaleAvatars) : getRandomItem(maleAvatars);
        const age = Math.floor(Math.random() * 20) + 21; // 21 to 40
        const gender = isFemale ? "female" : "male";
        const about = `${getRandomItem(bioTemplates)} Always excited to connect and collaborate!`;
        const skills = getRandomSubset(skillPool, 3, 5);

        batch.push({
          firstName,
          lastName,
          emailId,
          password: hashedPassword,
          age,
          gender,
          photourl,
          about,
          skills,
        });
      }

      try {
        await User.insertMany(batch, { ordered: false });
        totalInserted += batch.length;
        console.log(`  ⚡ Inserted batch: ${totalInserted} / ${usersToCreate} developers...`);
      } catch (insertErr) {
        // If some duplicates occur, count insertedDocs
        if (insertErr.insertedDocs) {
          totalInserted += insertErr.insertedDocs.length;
          console.log(`  ⚡ Inserted batch (partial): ${totalInserted} / ${usersToCreate}...`);
        } else {
          console.error("Batch insertion error:", insertErr.message);
        }
      }
    }

    const finalCount = await User.countDocuments();
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n🎉 Successfully completed in ${duration}s!`);
    console.log(`📊 TOTAL ACTIVE DEVELOPERS IN DATABASE: ${finalCount}`);
    process.exit(0);
  } catch (err) {
    console.error("Fatal Error seeding 10,000 developers:", err);
    process.exit(1);
  }
}

seed10kUsers();
