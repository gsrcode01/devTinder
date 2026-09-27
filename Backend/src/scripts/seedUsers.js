const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const connectDB = require("../config/database");
const User = require("../models/user");

const dummyDevelopers = [
  {
    firstName: "Priya",
    lastName: "Sharma",
    emailId: "priya.sharma@example.com",
    age: 24,
    gender: "female",
    photourl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700",
    about: "Building delightful user experiences with React & Next.js. Always up for a good tech conversation ☕",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    firstName: "Ananya",
    lastName: "Rao",
    emailId: "ananya.rao@example.com",
    age: 22,
    gender: "female",
    photourl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700",
    about: "Full stack MERN developer building high-impact web apps. Looking for coding buddies to hack on AI tools!",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "GraphQL"],
  },
  {
    firstName: "Vikram",
    lastName: "Mehta",
    emailId: "vikram.mehta@example.com",
    age: 26,
    gender: "male",
    photourl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700",
    about: "DevOps & Cloud Engineer. Kubernetes, Terraform, AWS and CI/CD automation enthusiast.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Go"],
  },
  {
    firstName: "Neha",
    lastName: "Kapoor",
    emailId: "neha.kapoor@example.com",
    age: 23,
    gender: "female",
    photourl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700",
    about: "UI/UX Designer turned Frontend Engineer. Creating pixel-perfect responsive web apps with Tailwind & Figma.",
    skills: ["Figma", "React", "Tailwind CSS", "JavaScript", "HTML/CSS"],
  },
  {
    firstName: "Arjun",
    lastName: "Nair",
    emailId: "arjun.nair@example.com",
    age: 27,
    gender: "male",
    photourl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700",
    about: "Backend Architect specializing in microservices, low latency systems and distributed databases.",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    firstName: "Sarah",
    lastName: "Chen",
    emailId: "sarah.chen@example.com",
    age: 25,
    gender: "female",
    photourl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700",
    about: "AI & Machine Learning developer. Fine-tuning LLMs, building agentic workflows and PyTorch pipelines.",
    skills: ["Python", "PyTorch", "FastAPI", "Docker", "LangChain"],
  },
  {
    firstName: "Alex",
    lastName: "Rivera",
    emailId: "alex.rivera@example.com",
    age: 28,
    gender: "male",
    photourl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700",
    about: "Mobile App Engineer building sleek cross-platform iOS & Android experiences with React Native & Flutter.",
    skills: ["React Native", "TypeScript", "Flutter", "Swift", "Firebase"],
  },
  {
    firstName: "David",
    lastName: "Kim",
    emailId: "david.kim@example.com",
    age: 29,
    gender: "male",
    photourl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700",
    about: "Rust and Go developer working on network protocols, database engines and web assembly.",
    skills: ["Rust", "Go", "WebAssembly", "C++", "Linux"],
  },
];

const seedUsers = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await connectDB();
    console.log("Connected to database successfully.");

    const hashedPassword = await bcrypt.hash("DevPassword@123", 10);

    for (const dev of dummyDevelopers) {
      const existing = await User.findOne({ emailId: dev.emailId });
      if (!existing) {
        const newUser = new User({
          ...dev,
          password: hashedPassword,
        });
        await newUser.save();
        console.log(`Created user: ${dev.firstName} ${dev.lastName} (${dev.emailId})`);
      } else {
        console.log(`User already exists: ${dev.emailId}`);
      }
    }

    const totalCount = await User.countDocuments();
    console.log(`\n🎉 Seed completed! Total users in database: ${totalCount}`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
