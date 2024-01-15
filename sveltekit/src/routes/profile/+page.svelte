<script lang="ts">
    import {onMount} from 'svelte';
    import UploadCV from "../../components/UploadCV.svelte";
    import Button from "../../components/Button.svelte";
    import Card from "../../components/Card.svelte";
    import {makeRequest, getUser} from "../../api/api";

    let user: User;
    let loading = true;
    let infoMessage = '';
    let companyExists: boolean = false;

    async function handleSubmit() {
        if (typeof window !== 'undefined') {
            try {
                if (companyExists) {
                    user['company'] = await makeRequest(`/company/update`, 'PUT', user['company']);
                } else {
                    user = await makeRequest(`/user/update`, 'PUT', user);
                }
                infoMessage = 'Profil uspešno posodobljen.';
            } catch (e) {
                console.log(e);
                infoMessage = 'Profil ni bil uspešno posodobljen. Prosimo, poskusite ponovno.';
            }
        }
    }

    onMount(async () => {
        user = await getUser();
        companyExists = user?.company ? true : false;
        loading = false;
    });
</script>

<Card>
    <h2 class="mb-4 text-3xl font-bold text-gray-700">Uredite osebne informacije</h2>

    {#if loading}
        <p class="text-primary text-xl font-sans">Nalaganje...</p>
    {:else}

        <form on:submit|preventDefault={handleSubmit}
              class="space-y-4 text-gray-700 text-xl grid gap-6 mb-6 grid-cols-2">
            {#if companyExists}
                <div class="items-center col-span-2">
                    <label for="companyName" class="text-gray-700">Company Name:</label>
                    <input id="companyName" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                           type="text"
                           bind:value={user.company.name}/>
                </div>
                <div class="items-center col-span-2">
                    <label for="companyLocation" class="text-gray-700">Company Location:</label>
                    <input id="companyLocation" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                           type="text"
                           bind:value={user.company.location}/>
                </div>
                <div class="items-center col-span-2">
                    <label for="companyLogo" class="text-gray-700">Company Logo URL:</label>
                    <input id="companyLogo" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                           type="url"
                           bind:value={user.company.logo}/>
                </div>

            {:else }
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
                    <input id="email" class="p-2 border bg-gray-400 font-sans border-gray-300 rounded w-full"
                           type="text"
                           disabled="true"
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
                    <input id="location" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                           type="text"
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
                    <input id="colleges" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                           type="text"
                           bind:value={user.colleges}/>
                </div>
                <div class="items-center">
                    <label for="degrees" class="text-gray-700">Diplome:</label>
                    <input id="degrees" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                           type="text"
                           bind:value={user.degrees}/>
                </div>
                <div class="items-center">
                    <label for="skills" class="text-gray-700">Veščine:</label>
                    <textarea id="skills" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                              type="text"
                              rows="4"
                              bind:value={user.skills}/>
                </div>
            {/if}
            {#if infoMessage}
                <p class="text-dark col-span-2">{infoMessage}</p>
            {/if}
            <Button className="col-span-2"
                    type="submit">Shrani
            </Button>
        </form>
        {#if !companyExists}
            <div class="bg-white p-4 border-4">
                <UploadCV/>
            </div>
        {/if}
    {/if}
</Card>