import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@gmail.com",
      hash: await hashPassword("password"), 
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "555-1234",
      location: "San Francisco, CA",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: "jane.smith@yahoo.com",
      hash: await hashPassword("password"),
      firstName: "Jane",
      lastName: "Smith",
      phoneNumber: "555-5678",
      location: "Seattle, WA",
    },
  });
  const user3 = await prisma.user.create({
    data: {
      email: "mike.jones@hotmail.com",
      hash: await hashPassword("krneki"),
      firstName: "Mike",
      lastName: "Jones",
      phoneNumber: "555-9876",
      location: "Cupertino, CA",
    },
  });
  const user4 = await prisma.user.create({
    data: {
      email: "lisa.white@gmail.com",
      hash: await hashPassword("password12"),
      firstName: "Lisa",
      lastName: "White",
      phoneNumber: "555-4321",
      location: "Redmond, WA",
    },
  });
  const user5 = await prisma.user.create({
    data: {
      email: "alex.brown@yahoo.com",
      hash: await hashPassword("password123"),
      firstName: "Alex",
      lastName: "Brown",
      phoneNumber: "555-8765",
      location: "Menlo Park, CA",
    },
  });

  const user6 = await prisma.user.create({
    data: {
      email: "sam.wilson@gmail.com",
      hash: await hashPassword("pass123"),
      firstName: "Sam",
      lastName: "Wilson",
      phoneNumber: "555-1357",
      location: "Los Angeles, CA",
    },
  });
  
  const user7 = await prisma.user.create({
    data: {
      email: "emily.jones@yahoo.com",
      hash: await hashPassword("abc@123"),
      firstName: "Emily",
      lastName: "Jones",
      phoneNumber: "555-2468",
      location: "Portland, OR",
    },
  });
  
  const user8 = await prisma.user.create({
    data: {
      email: "david.smith@hotmail.com",
      hash: await hashPassword("securePass"),
      firstName: "David",
      lastName: "Smith",
      phoneNumber: "555-3691",
      location: "San Diego, CA",
    },
  });
  
  const user9 = await prisma.user.create({
    data: {
      email: "sara.davis@gmail.com",
      hash: await hashPassword("mySecret"),
      firstName: "Sara",
      lastName: "Davis",
      phoneNumber: "555-4747",
      location: "Austin, TX",
    },
  });
  
  const user10 = await prisma.user.create({
    data: {
      email: "robert.jackson@yahoo.com",
      hash: await hashPassword("password321"),
      firstName: "Robert",
      lastName: "Jackson",
      phoneNumber: "555-5858",
      location: "Denver, CO",
    },
  });
  

  const company1 = await prisma.company.create({
    data: {
      name: "Google",
      logo: "https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png",
      location: "Austin, TX",
      user: {
        connect: { id: user6.id },
      }
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: "Microsoft",
      logo: "https://logowik.com/content/uploads/images/microsoft44289.logowik.com.webp",
      location: "Dallas, TX",
      user: {
        connect: { id: user7.id },
      }
    },
  });
  const company3 = await prisma.company.create({
    data: {
      name: "Apple Inc.",
      logo: "https://cdn.freebiesupply.com/images/thumbs/2x/apple-logo.png",
      location: "Cupertino, CA",
      user: {
        connect: { id: user8.id },
      }
    },
  });
  const company4 = await prisma.company.create({
    data: {
      name: "Amazon",
      logo: "https://www.svgrepo.com/show/112049/amazon-logo.svg",
      location: "New York, NY",
      user: {
        connect: { id: user9.id },
      }
    },
  });
  const company5 = await prisma.company.create({
    data: {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png",
      location: "Miami, FL",
      user: {
        connect: { id: user10.id },
      }
    },
  });

  const position1 = await prisma.position.create({
    data: {
      title: "Software Engineer",
      description: "Develop software for cutting-edge projects.",
      companyId: company1.id,
      requirements:
        'Familiar with tools and platforms such as Jira GIT, Jenkins, Ansible. Familiar with C#, C++, Java, Groovy, PLSQL, PowerShell, PeopleCode, JavaScript, Python, HTML, CSS. Familiar with Middleware (ex. Mulesoft, NextAxiom, Weblogic). Familiar with Linux or Windows servers.',
    },
  });
  const position2 = await prisma.position.create({
    data: {
      title: "Product Manager",
      description: "Lead product development and strategy.",
      companyId: company1.id,
      requirements:
        "Proven experience in product management and strategic leadership, with a focus on driving innovation and achieving business objectives. Strong analytical and problem-solving skills, adept at market research and competitor analysis. Excellent communication and collaboration skills, capable of leading cross-functional teams. Demonstrated ability to define and execute product roadmaps, managing the entire product lifecycle. Experience in agile development methodologies and a track record of successful product launches. Familiarity with user experience (UX) design principles. Exceptional organizational and project management skills, with a results-driven mindset. Strong business acumen and understanding of market trends. Bachelor’s degree in a relevant field; MBA is a plus. Certifications such as Certified Scrum Product Owner (CSPO) or Pragmatic Marketing Certified (PMC) are advantageous.",
    },
  });
  const position3 = await prisma.position.create({
    data: {
      title: "Cloud Solutions Architect",
      description: "Architect cloud solutions for enterprise clients.",
      companyId: company2.id,
      requirements:
        "Expertise in cloud platforms such as AWS, Azure, or Google Cloud.",
    },
  });
  const position4 = await prisma.position.create({
    data: {
      title: "Frontend Developer",
      description: "Create user interfaces for web applications.",
      companyId: company2.id,
      requirements:
        "Proficient in HTML, CSS, and JavaScript; experience with modern frameworks like React or Vue.js.",
    },
  });
  const position5 = await prisma.position.create({
    data: {
      title: "iOS App Developer",
      description: "Build mobile applications for Apple devices.",
      companyId: company3.id,
      requirements:
        "Experience in Swift programming and familiarity with iOS development tools.",
    },
  });
  const position6 = await prisma.position.create({
    data: {
      title: "Data Scientist",
      description: "Analyze large datasets and derive insights.",
      companyId: company3.id,
      requirements:
        "Strong analytical skills, proficiency in Python, and experience with machine learning algorithms.",
    },
  });
  const position7 = await prisma.position.create({
    data: {
      title: "DevOps Engineer",
      description: "Implement and manage infrastructure as code.",
      companyId: company4.id,
      requirements: "Experience with Docker, Kubernetes, and CI/CD pipelines.",
    },
  });
  const position8 = await prisma.position.create({
    data: {
      title: "UI/UX Designer",
      description: "Design intuitive and user-friendly interfaces.",
      companyId: company4.id,
      requirements:
        "Portfolio showcasing previous UI/UX design projects; proficiency in design tools like Figma or Sketch.",
    },
  });
  const position9 = await prisma.position.create({
    data: {
      title: "Security Analyst",
      description: "Ensure the security of digital systems.",
      companyId: company5.id,
      requirements:
        "Knowledge of cybersecurity principles, experience with security assessment tools.",
    },
  });
  const position10 = await prisma.position.create({
    data: {
      title: "Marketing Specialist",
      description: "Plan and execute effective marketing campaigns.",
      companyId: company5.id,
      requirements:
        "Proven experience in marketing, strong communication and analytical skills.",
    },
  });

  const jobOffer1 = await prisma.jobOffer.create({
    data: {
      positionId: position1.id,
      companyId: company1.id,
      location: "Cupertino, CA",
      salary: 105000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer2 = await prisma.jobOffer.create({
    data: {
      positionId: position2.id,
      companyId: company1.id,
      location: "Redmond, WA",
      salary: 92000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer3 = await prisma.jobOffer.create({
    data: {
      positionId: position3.id,
      companyId: company2.id,
      location: "Mountain View, CA",
      salary: 115000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer4 = await prisma.jobOffer.create({
    data: {
      positionId: position4.id,
      companyId: company2.id,
      location: "Cupertino, CA",
      salary: 98000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer5 = await prisma.jobOffer.create({
    data: {
      positionId: position5.id,
      companyId: company3.id,
      location: "Redmond, WA",
      salary: 91000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer6 = await prisma.jobOffer.create({
    data: {
      positionId: position6.id,
      companyId: company3.id,
      location: "Mountain View, CA",
      salary: 120000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer7 = await prisma.jobOffer.create({
    data: {
      positionId: position7.id,
      companyId: company4.id,
      location: "Cupertino, CA",
      salary: 102000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer8 = await prisma.jobOffer.create({
    data: {
      positionId: position8.id,
      companyId: company4.id,
      location: "Redmond, WA",
      salary: 93000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer9 = await prisma.jobOffer.create({
    data: {
      positionId: position9.id,
      companyId: company5.id,
      location: "Mountain View, CA",
      salary: 110000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });
  const jobOffer10 = await prisma.jobOffer.create({
    data: {
      positionId: position10.id,
      companyId: company5.id,
      location: "Cupertino, CA",
      salary: 95000,
      active: true,
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
    },
  });

  // Connect positions to companies
  await prisma.company.update({
    where: { id: company1.id },
    data: {
      positions: {
        connect: [{ id: position1.id }, { id: position2.id }],
      },
    },
  });

  await prisma.company.update({
    where: { id: company2.id },
    data: {
      positions: {
        connect: [{ id: position3.id }, { id: position4.id }],
      },
    },
  });

  await prisma.company.update({
    where: { id: company3.id },
    data: {
      positions: {
        connect: [{ id: position5.id }, { id: position6.id }],
      },
    },
  });

  await prisma.company.update({
    where: { id: company4.id },
    data: {
      positions: {
        connect: [{ id: position7.id }, { id: position8.id }],
      },
    },
  });

  await prisma.company.update({
    where: { id: company5.id },
    data: {
      positions: {
        connect: [{ id: position9.id }, { id: position10.id }],
      },
    },
  });

  //------------------------------------------------------

  // Connect job offers to positions
  await prisma.position.update({
    where: { id: position1.id },
    data: { jobOffer: { connect: { id: jobOffer1.id } } },
  });

  await prisma.position.update({
    where: { id: position2.id },
    data: { jobOffer: { connect: { id: jobOffer2.id } } },
  });

  await prisma.position.update({
    where: { id: position3.id },
    data: { jobOffer: { connect: { id: jobOffer3.id } } },
  });

  // Repeat the same pattern for the remaining position updates

  //----------------------------------------------------

  // Connect job offers to users
  await prisma.user.update({
    where: { email: "john.doe@gmail.com" },
    data: {
      appliedTo: {
        connect: [{ id: jobOffer1.id }, { id: jobOffer2.id }],
      },
    },
  });

  await prisma.user.update({
    where: { email: "jane.smith@yahoo.com" },
    data: {
      appliedTo: {
        connect: [{ id: jobOffer3.id }, { id: jobOffer4.id }],
      },
    },
  });

  await prisma.user.update({
    where: { email: "mike.jones@hotmail.com" },
    data: {
      appliedTo: {
        connect: [{ id: jobOffer5.id }, { id: jobOffer6.id }],
      },
    },
  });

  await prisma.user.update({
    where: { email: "lisa.white@gmail.com" },
    data: {
      appliedTo: {
        connect: [{ id: jobOffer7.id }, { id: jobOffer8.id }],
      },
    },
  });

  await prisma.user.update({
    where: { email: "alex.brown@yahoo.com" },
    data: {
      appliedTo: {
        connect: [{ id: jobOffer9.id }, { id: jobOffer10.id }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
