export const biddings = [
  {
    id: "1",
    title: "E-commerce Website Development",
    description:
      "Develop a fully functional e-commerce website with product catalog, shopping cart, and payment integration.",
    budget: 5000,
    deadline: "2024-06-30",
    applicants: 8,
    status: "ongoing",
    requiredSkills: ["React", "Node.js", "MongoDB", "Payment Gateway Integration"],
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description: "Design user interface and experience for a new fitness tracking mobile application.",
    budget: 3000,
    deadline: "2024-05-15",
    applicants: 12,
    status: "completed",
    requiredSkills: ["UI/UX Design", "Figma", "Mobile App Design", "User Research"],
    assignedFreelancer: "Charlie Davis",
    documents: [
      { name: "Final Design.pdf", url: "https://example.com/final-design.pdf" },
      { name: "User Flow.png", url: "https://example.com/user-flow.png" },
    ],
  },
  {
    id: "3",
    title: "Content Management System (CMS) Development",
    description: "Build a custom CMS for a media company to manage articles, videos, and podcasts.",
    budget: 7000,
    deadline: "2024-08-31",
    applicants: 5,
    status: "hold",
    requiredSkills: ["PHP", "Laravel", "MySQL", "RESTful API"],
    holdReason: "Awaiting client feedback on specific requirements",
  },
  {
    id: "4",
    title: "AI Chatbot Integration",
    description: "Integrate an AI-powered chatbot into an existing customer support platform.",
    budget: 4500,
    deadline: "2024-07-15",
    applicants: 7,
    status: "ongoing",
    requiredSkills: ["Natural Language Processing", "Machine Learning", "Python", "API Integration"],
  },
  {
    id: "5",
    title: "Blockchain-based Supply Chain Solution",
    description: "Develop a blockchain solution for tracking and verifying product authenticity in a supply chain.",
    budget: 9000,
    deadline: "2024-09-30",
    applicants: 3,
    status: "cancelled",
    requiredSkills: ["Blockchain", "Smart Contracts", "Solidity", "Web3.js"],
    cancelReason: "Project scope changed significantly",
  },
]

export const bidResponses = [
  {
    id: "1",
    biddingId: "1",
    freelancerId: "f1",
    freelancerName: "Alice Johnson",
    bidAmount: 4800,
    deliveryTime: 45,
    proposal:
      "I have extensive experience in e-commerce development using modern technologies like React and Node.js. I can deliver a high-performance, scalable solution that meets all your requirements.",
    paymentType: "Milestone",
    documents: ["https://example.com/portfolio-alice.pdf", "https://example.com/ecommerce-case-study.pdf"],
  },
  {
    id: "2",
    biddingId: "1",
    freelancerId: "f2",
    freelancerName: "Bob Smith",
    bidAmount: 5200,
    deliveryTime: 40,
    proposal:
      "With my background in both front-end and back-end development, I can create a seamless e-commerce experience. I specialize in secure payment integrations and optimized product catalogs.",
    paymentType: "One-time payment",
    documents: ["https://example.com/bob-resume.pdf"],
  },
  {
    id: "3",
    biddingId: "2",
    freelancerId: "f3",
    freelancerName: "Charlie Davis",
    bidAmount: 2800,
    deliveryTime: 20,
    proposal:
      "As a UI/UX specialist with a focus on fitness and health apps, I can create an intuitive and engaging design that motivates users to achieve their fitness goals.",
    paymentType: "Milestone",
    documents: ["https://example.com/charlie-portfolio.pdf", "https://example.com/fitness-app-mockups.pdf"],
  },
]

export const meetings = [
  {
    id: "1",
    biddingId: "1",
    biddingTitle: "E-commerce Website Development",
    freelancerId: "f1",
    freelancerName: "Alice Johnson",
    date: "2024-03-15",
    time: "14:00",
    purpose: "Initial Discussion",
    notes: "Discussed project scope and timeline. Alice seems well-prepared and has relevant experience.",
  },
  {
    id: "2",
    biddingId: "2",
    biddingTitle: "Mobile App UI/UX Design",
    freelancerId: "f3",
    freelancerName: "Charlie Davis",
    date: "2024-03-18",
    time: "10:30",
    purpose: "Proposal Review",
    notes: "Reviewed Charlie's portfolio and discussed design approach. Impressive work on similar projects.",
  },
]

