import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const company1 = await prisma.company.create({ data: { name: 'Google', logo: 'https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png' } });
    const company2 = await prisma.company.create({ data: { name: 'Microsoft', logo: 'https://logowik.com/content/uploads/images/microsoft44289.logowik.com.webp' } });
    const company3 = await prisma.company.create({ data: { name: 'Apple Inc.', logo: 'https://cdn.freebiesupply.com/images/thumbs/2x/apple-logo.png' } });
    const company4 = await prisma.company.create({ data: { name: 'Amazon', logo: 'https://www.svgrepo.com/show/112049/amazon-logo.svg' } });
    const company5 = await prisma.company.create({ data: { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png' } });

    const position1 = await prisma.position.create({ data: { title: 'Software Engineer', description: 'Develop software for cutting-edge projects.', companyId: company1.id, requirements: 'Strong proficiency in Java and experience with Spring framework.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position2 = await prisma.position.create({ data: { title: 'Product Manager', description: 'Lead product development and strategy.', companyId: company1.id, requirements: 'Proven experience in product management and leadership skills.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position3 = await prisma.position.create({ data: { title: 'Cloud Solutions Architect', description: 'Architect cloud solutions for enterprise clients.', companyId: company2.id, requirements: 'Expertise in cloud platforms such as AWS, Azure, or Google Cloud.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position4 = await prisma.position.create({ data: { title: 'Frontend Developer', description: 'Create user interfaces for web applications.', companyId: company2.id, requirements: 'Proficient in HTML, CSS, and JavaScript; experience with modern frameworks like React or Vue.js.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position5 = await prisma.position.create({ data: { title: 'iOS App Developer', description: 'Build mobile applications for Apple devices.', companyId: company3.id, requirements: 'Experience in Swift programming and familiarity with iOS development tools.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position6 = await prisma.position.create({ data: { title: 'Data Scientist', description: 'Analyze large datasets and derive insights.', companyId: company3.id, requirements: 'Strong analytical skills, proficiency in Python, and experience with machine learning algorithms.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position7 = await prisma.position.create({ data: { title: 'DevOps Engineer', description: 'Implement and manage infrastructure as code.', companyId: company4.id, requirements: 'Experience with Docker, Kubernetes, and CI/CD pipelines.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position8 = await prisma.position.create({ data: { title: 'UI/UX Designer', description: 'Design intuitive and user-friendly interfaces.', companyId: company4.id, requirements: 'Portfolio showcasing previous UI/UX design projects; proficiency in design tools like Figma or Sketch.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position9 = await prisma.position.create({ data: { title: 'Security Analyst', description: 'Ensure the security of digital systems.', companyId: company5.id, requirements: 'Knowledge of cybersecurity principles, experience with security assessment tools.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });
const position10 = await prisma.position.create({ data: { title: 'Marketing Specialist', description: 'Plan and execute effective marketing campaigns.', companyId: company5.id, requirements: 'Proven experience in marketing, strong communication and analytical skills.', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31') } });

      
const jobOffer1 = await prisma.jobOffer.create({ data: { positionId: position1.id, companyId: company1.id, location: 'Cupertino, CA', salary: 105000, active: true } });
const jobOffer2 = await prisma.jobOffer.create({ data: { positionId: position2.id, companyId: company1.id, location: 'Redmond, WA', salary: 92000, active: true } });
const jobOffer3 = await prisma.jobOffer.create({ data: { positionId: position3.id, companyId: company2.id, location: 'Mountain View, CA', salary: 115000, active: true } });
const jobOffer4 = await prisma.jobOffer.create({ data: { positionId: position4.id, companyId: company2.id, location: 'Cupertino, CA', salary: 98000, active: true } });
const jobOffer5 = await prisma.jobOffer.create({ data: { positionId: position5.id, companyId: company3.id, location: 'Redmond, WA', salary: 91000, active: true } });
const jobOffer6 = await prisma.jobOffer.create({ data: { positionId: position6.id, companyId: company3.id, location: 'Mountain View, CA', salary: 120000, active: true } });
const jobOffer7 = await prisma.jobOffer.create({ data: { positionId: position7.id, companyId: company4.id, location: 'Cupertino, CA', salary: 102000, active: true } });
const jobOffer8 = await prisma.jobOffer.create({ data: { positionId: position8.id, companyId: company4.id, location: 'Redmond, WA', salary: 93000, active: true } });
const jobOffer9 = await prisma.jobOffer.create({ data: { positionId: position9.id, companyId: company5.id, location: 'Mountain View, CA', salary: 110000, active: true } });
const jobOffer10 = await prisma.jobOffer.create({ data: { positionId: position10.id, companyId: company5.id, location: 'Cupertino, CA', salary: 95000, active: true } });


   /* const jobOffer11 = await prisma.jobOffer.create({ data: { positionId: positions[0].id, companyId: companies[0].id, location: 'Redmond, WA', salary: 95000, active: true } });
    const jobOffer12 = await prisma.jobOffer.create({ data: { positionId: positions[0].id, companyId: companies[0].id, location: 'Mountain View, CA', salary: 110000, active: true } });
    const jobOffer13 = await prisma.jobOffer.create({ data: { positionId: positions[0].id, companyId: companies[0].id, location: 'Cupertino, CA', salary: 100000, active: true } });
    const jobOffer14 = await prisma.jobOffer.create({ data: { positionId: positions[0].id, companyId: companies[0].id, location: 'Redmond, WA', salary: 95000, active: true } });
    const jobOffer15 = await prisma.jobOffer.create({ data: { positionId: positions[0].id, companyId: companies[0].id, location: 'Mountain View, CA', salary: 110000, active: true } });*/

    
    const user1 = await prisma.user.create({ data: { email: 'john.doe@gmail.com', auth0token: '111', companyId: company1.id, firstName: 'John', lastName: 'Doe', phoneNumber: '555-1234', location: 'San Francisco, CA' } });
    const user2 = await prisma.user.create({ data: { email: 'jane.smith@yahoo.com', auth0token: '222', companyId: company2.id, firstName: 'Jane', lastName: 'Smith', phoneNumber: '555-5678', location: 'Seattle, WA' } });
    const user3 = await prisma.user.create({ data: { email: 'mike.jones@hotmail.com', auth0token: '333', companyId: company3.id, firstName: 'Mike', lastName: 'Jones', phoneNumber: '555-9876', location: 'Cupertino, CA' } });
    const user4 = await prisma.user.create({ data: { email: 'lisa.white@gmail.com', auth0token: '444', companyId: company4.id, firstName: 'Lisa', lastName: 'White', phoneNumber: '555-4321', location: 'Redmond, WA' } });
    const user5 = await prisma.user.create({ data: { email: 'alex.brown@yahoo.com', auth0token: '555', companyId: company5.id, firstName: 'Alex', lastName: 'Brown', phoneNumber: '555-8765', location: 'Menlo Park, CA' } });
    

// Connect positions to companies
await prisma.company.update({
    where: { id: company1.id },
    data: {
        positions: {
            connect: [
                { id: position1.id },
                { id: position2.id }
            ]
        },
    },
});

await prisma.company.update({
    where: { id: company2.id },
    data: {
        positions: {
            connect: [
                { id: position3.id },
                { id: position4.id }
            ]
        },
    },
});

await prisma.company.update({
    where: { id: company3.id },
    data: {
        positions: {
            connect: [
                { id: position5.id },
                { id: position6.id }
            ]
        },
    },
});

await prisma.company.update({
    where: { id: company4.id },
    data: {
        positions: {
            connect: [
                { id: position7.id },
                { id: position8.id }
            ]
        },
    },
});

await prisma.company.update({
    where: { id: company5.id },
    data: {
        positions: {
            connect: [
                { id: position9.id },
                { id: position10.id }
            ]
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
    where: { email: 'john.doe@gmail.com' },
    data: {
        appliedTo: {
            connect: [
                { id: jobOffer1.id },
                { id: jobOffer2.id }
            ]
        },
    },
});

await prisma.user.update({
    where: { email: 'jane.smith@yahoo.com' },
    data: {
        appliedTo: {
            connect: [
                { id: jobOffer3.id },
                { id: jobOffer4.id }
            ]
        },
    },
});

await prisma.user.update({
    where: { email: 'mike.jones@hotmail.com' },
    data: {
        appliedTo: {
            connect: [
                { id: jobOffer5.id },
                { id: jobOffer6.id }
            ]
        },
    },
});

await prisma.user.update({
    where: { email: 'lisa.white@gmail.com' },
    data: {
        appliedTo: {
            connect: [
                { id: jobOffer7.id },
                { id: jobOffer8.id }
            ]
        },
    },
});

await prisma.user.update({
    where: { email: 'alex.brown@yahoo.com' },
    data: {
        appliedTo: {
            connect: [
                { id: jobOffer9.id },
                { id: jobOffer10.id }
            ]
        },
    },
});

  }
  main()
  .then(async () => {
      await prisma.$disconnect()
  })
  .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
  })
