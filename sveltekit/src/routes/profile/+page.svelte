<script>
    import {onMount} from 'svelte';
    import UploadCV from "../../components/UploadCV.svelte";
    import Button from "../../components/Button.svelte";
    import Card from "../../components/Card.svelte";

    let user = {
        "id": 11,
        "hash": "...",
        "pdfFileName": "1705169056346-example1.pdf",
        "email": "amadej.milicev99@gmail.com",
        "firstName": "Kathy",
        "lastName": "James",
        "phoneNumber": "(123) 456-7890",
        "location": "Tulsa",
        "designations": "Programmer",
        "colleges": "University of Alabama",
        "degrees": "B.S. Computer Science",
        "workExperience": "",
        "skills": "JavaScript HTML/ CSS Django SQL REST APIs Angular.js React.js Jest Eclipse Java CAREER OBJECTIVE Graduate of",
        "positionId": null,
        "role": "USER",
        "company": {
            "id": 6,
            "name": "Microsoft"
        }
    };

    async function handleSubmit() {
        // Send the updated user data to your server
    }
</script>

<Card>
    <h2 class="mb-4 text-3xl font-bold text-gray-700">Uredite osebne informacije</h2>

    <form on:submit|preventDefault={handleSubmit}
          class="space-y-4 text-gray-700 text-xl grid gap-6 mb-6 grid-cols-2">
        <div class="items-center col-span-2">
            <label for="firstName" class="text-gray-700">Ime in priimek:</label>
            <input id="firstName" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full mb-2"
                   type="text"
                   bind:value={user.firstName}/>
            <input id="lastName" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                   type="text"
                   bind:value={user.lastName}/>
        </div>
        <div class="items-center">
            <label for="email" class="text-gray-700">E-poštni naslov:</label>
            <input id="email" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                   bind:value={user.email}/>
        </div>
        <div class="items-center">
            <label for="phoneNumber" class="text-gray-700">Telefonska številka:</label>
            <input id="phoneNumber" class=" p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                   type="text"
                   bind:value={user.phoneNumber}/>
        </div>
        <div class="items-center">
            <label for="location" class="text-gray-700">Lokacija:</label>
            <input id="location" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                   bind:value={user.location}/>
        </div>
        <div class="items-center">
            <label for="designations" class="text-gray-700">Naziv:</label>
            <input id="designations" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                   type="text"
                   bind:value={user.designations}/>
        </div>
        <div class="items-center">
            <label for="colleges" class="text-gray-700">Univerziteta:</label>
            <input id="colleges" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                   bind:value={user.colleges}/>
        </div>
        <div class="items-center">
            <label for="degrees" class="text-gray-700">Diplome:</label>
            <input id="degrees" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                   bind:value={user.degrees}/>
        </div>
        <div class="items-center">
            <label for="skills" class="text-gray-700">Veščine:</label>
            <textarea id="skills" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                      type="text"
                      rows="4"
                      bind:value={user.skills}/>
        </div>
        <Button className="col-span-2"
                type="submit">Shrani
        </Button>
    </form>
    <div class="bg-white p-4 border-4">
        <UploadCV/>
    </div>
</Card>