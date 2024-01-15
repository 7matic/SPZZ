<script lang="ts">
    import {onMount} from 'svelte';
    import {getUser, makeRequest} from '../../api/api';
    import Card from "../../components/Card.svelte";
    import Button from "../../components/Button.svelte";
    import UploadCV from "../../components/UploadCV.svelte";

    let userData = null;
    let userId = null;

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        userId = urlParams.get('id');
        if (userId) {
            userData = await makeRequest(`/user?id=${userId}`, 'GET');
        }
    });
</script>

<Card>
    {#if userData}
        <h2 class="mb-4 text-3xl font-bold text-gray-700">Profil: {userData.firstName} {userData.lastName}</h2>
        <form class="space-y-4 text-gray-700 text-xl grid gap-6 mb-6 grid-cols-2">

            <div class="items-center col-span-2">
                <label for="firstName" class="text-gray-700">Ime in priimek:</label>
                <input id="firstName" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full mb-2"
                       type="text" disabled="true"
                       bind:value={userData.firstName}/>
                <input id="lastName" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text" disabled="true"
                       bind:value={userData.lastName}/>
            </div>
            <div class="items-center">
                <label for="email" class="text-gray-700">E-poštni naslov:</label>
                <input id="email" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text"
                       disabled="true"
                       bind:value={userData.email}/>
            </div>
            <div class="items-center">
                <label for="phoneNumber" class="text-gray-700">Telefonska številka:</label>
                <input id="phoneNumber" class=" p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text" disabled="true"
                       bind:value={userData.phoneNumber}/>
            </div>
            <div class="items-center">
                <label for="location" class="text-gray-700">Lokacija:</label>
                <input id="location" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text" disabled="true"
                       bind:value={userData.location}/>
            </div>
            <div class="items-center">
                <label for="designations" class="text-gray-700">Naziv:</label>
                <input id="designations" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text" disabled="true"
                       bind:value={userData.designations}/>
            </div>
            <div class="items-center">
                <label for="colleges" class="text-gray-700">Univerziteta:</label>
                <input id="colleges" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text" disabled="true"
                       bind:value={userData.colleges}/>
            </div>
            <div class="items-center">
                <label for="degrees" class="text-gray-700">Diplome:</label>
                <input id="degrees" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                       type="text" disabled="true"
                       bind:value={userData.degrees}/>
            </div>
            <div class="items-center">
                <label for="skills" class="text-gray-700">Veščine:</label>
                <textarea id="skills" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full"
                          type="text"
                          rows="4" disabled="true"
                          bind:value={userData.skills}/>
            </div>
        </form>
    {/if}
</Card>