<script lang="ts">
    import {onMount} from 'svelte';
    import {makeRequest, getUser} from "../../api/api";
    import Card from "../../components/Card.svelte";

    let user: User | undefined;
    let loading = true;
    let title: string;
    let description: string;
    let requirements: string;
    let startDate: Date;
    let endDate: Date;
    let errorMessage;
    let positionId;
    let salary: number;
    let location: string; 
    let jobId;

    let isDisabledJob: boolean = true;

    async function handlePosition(){
        try {
            const reg = await makeRequest(`/positions/create`, 'POST', {
                    title: title,
                    description: description,
                    requirements: requirements,
                    startDate: startDate,
                    endDate: endDate,
                }
            );

            positionId = reg.id;
        } catch (error) {
        console.error('Error creating position:', error);
        errorMessage = 'Kreiranje pozicije ni uspelo!';
        }
    }

    async function handleJob() {
        try {
            const reg = await makeRequest(`/jobs/create`, 'POST', {
                    positionId: positionId,
                    salary: salary,
                    active: true,
                    location: location,
                }
            );

            jobId = reg.id;
            console.log(jobId)
        } catch (error) {
        console.error('Error creating job:', error);
        errorMessage = 'Kreiranje oglasa ni uspelo!';
        }
    }

    async function handleMatchUsers() {
        const get = await makeRequest(`/matchJobToUsers/?id=${jobId}`, 'GET');
        window.location.href = '/applications';
    }

    $: {
        if (title && description && requirements && startDate && endDate) {
            handlePosition();
        }
    }

    async function handleButtonClick() {
        try {
            await handleJob();
            await handleMatchUsers();
        } catch (error) {
            console.error('Error handling job or matching users:', error);
        }
    }


    onMount(async () => {
        loading = false;
        try {
            user = await getUser();
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });

    $: {
    if (positionId && title && description && requirements && startDate && endDate && salary && location) {
        isDisabledJob = false;
    }
}
</script>


<Card>
    <h2 class="mb-4 text-3xl font-bold text-gray-700">Ustvari nov oglas</h2>

    <h4 class="mb-4 text-2xl font-bold text-gray-700">1. Ustvari novo pozicijo</h4>

    {#if loading}
        <p class="text-primary text-xl font-sans">Nalaganje...</p>
    {:else}
        <form on:submit|preventDefault={handlePosition} class="space-y-4 text-gray-700 text-xl grid gap-6 mb-6 grid-cols-2">
            <div class="items-center col-span-2">
                <label for="title" class="text-gray-700">Naslov pozicije:</label>
                <input id="title" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text" bind:value={title} />
            </div>
            <div class="items-center col-span-2">
                <label for="description" class="text-gray-700">Opis pozicije:</label>
                <textarea id="description" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" rows="4" bind:value={description} />
            </div>
            <div class="items-center col-span-2">
                <label for="requirements" class="text-gray-700">Zahteve:</label>
                <textarea id="requirements" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" rows="4" bind:value={requirements} />
            </div>
            <div class="items-center col-span-1">
                <label for="startDate" class="text-gray-700">Začetni datum:</label>
                <input id="startDate" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="date" bind:value={startDate} />
            </div>
            <div class="items-center col-span-1">
                <label for="endDate" class="text-gray-700">Končni datum:</label>
                <input id="endDate" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="date" bind:value={endDate} />
            </div>
            <h4 class="mb-4 text-2xl font-bold text-gray-700 col-span-2">2. Dodaj ostale podatke</h4>
            <div class="items-center col-span-2">
                <label for="salary" class="text-gray-700">Plača:</label>
                <input id="salary" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="number" bind:value={salary} />
            </div>
            <div class="items-center col-span-2">
                <label for="location" class="text-gray-700">Lokacija:</label>
                <input id="location" class="p-2 border bg-gray-200 font-sans border-gray-300 rounded w-full" type="text" bind:value={location} />
            </div>
        </form>
        <button on:click={handleButtonClick} disabled={isDisabledJob}
                class="{isDisabledJob ? 'bg-gray-500' : 'bg-primary'} transform transition-background duration-200 block w-full hover:bg-light p-4 rounded text-white font-bold">
            Objavi oglas
        </button>
    {/if}
</Card>

