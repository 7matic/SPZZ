import prisma from "../../lib/db";

type PyResponse = {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone_number: string | null;
    location: string | null;
    designations: string[] | null;
    college: string[] | null;
    degrees: string[] | null;
    work_experience: string[] | null;
    skills: string[] | null;
};

export async function parseAndWrite(user_id: number, filename: string) {
    await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            pdfFileName: filename
        }
    });

    const response = await fetch('http://py-algorithms:5000/read_cv_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: filename }),
    });

    const responseJson = await response.json() as PyResponse;

    console.log(responseJson);

    await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            firstName: responseJson.first_name,
            lastName: responseJson.last_name,
            phoneNumber: responseJson.phone_number,
            location: responseJson.location,
            designations: responseJson.designations?.join(', '),
            colleges: responseJson.college?.join(', '),
            degrees: responseJson.degrees?.join(', '),
            workExperience: responseJson.work_experience?.join(', '),
            skills: responseJson.skills?.join(', ')
        }
    });  
}