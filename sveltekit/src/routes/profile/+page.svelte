<script>
    import {onMount} from 'svelte';

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

<div class="p-16 flex justify-center bg-gray-200 rounded shadow-lg flex-grow justify-center">
    <div class="bg-white p-16 shadow-xl min-h-fit h-fit">
        <h2 class="mb-4 text-2xl font-bold text-gray-700">Uredite osebne informacije</h2>
        <form on:submit|preventDefault={handleSubmit}
              class="space-y-4 text-gray-700 text-xl grid gap-6 mb-6 grid-cols-2">
            <div class="items-center">
                <label class="text-gray-700">Ime in priimek:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full mb-2" type="text"
                       bind:value={user.firstName}/>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.lastName}/>
            </div>
            <div class="items-center">
                <label class="text-gray-700">E-poštni naslov:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.email}/>
            </div>

            <div class="items-center">
                <label class="text-gray-700">Telefonska številka:</label>
                <input class=" p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.phoneNumber}/>
            </div>
            <div class="items-center">
                <label class="text-gray-700">Lokacija:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.location}/>
            </div>
            <div class="items-center">
                <label class="text-gray-700">Naziv:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.designations}/>
            </div>
            <div class="items-center">
                <label class="text-gray-700">Univerziteta:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.colleges}/>
            </div>
            <div class="items-center">
                <label class="text-gray-700">Diplome:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.degrees}/>
            </div>
            <div class="items-center">
                <label class="text-gray-700">Veščine:</label>
                <input class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text"
                       bind:value={user.skills}/>
            </div>
            <button class="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-sans transform transition-background duration-200 "
                    type="submit">Shrani
            </button>
        </form>

    </div>
</div>