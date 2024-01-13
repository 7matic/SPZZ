<script lang="ts">
    import type { PageData } from './$types';
    import { env } from '$env/dynamic/private';

    export let data: PageData;

    let selectedJobOffer = null;

    function formatPostedTime(postedAt: string): string {
        const currentTime = new Date();
        const postedTime = new Date(postedAt);
        const timeDifference = Math.abs(currentTime.getTime() - postedTime.getTime());

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (hours < 24) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (days < 7) {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else {
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        }
    }

    function showJobDetails(jobOffer) {
        selectedJobOffer = jobOffer;
    }

    async function applyNow() {
    const jobId = selectedJobOffer.id;
    console.log({ jobId });

    try {
        const response = await fetch(env.LOCAL+`/jobs/apply_job?id=${jobId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA1MTQ3MDg3LCJleHAiOjE3MDUxNTQyODd9.Bg02V7uJHJ5h2uzsyckfRnt5w0scdFtqrAokatdHDM0'
            },
            body:JSON.stringify({
	            "applied": "true"
            })
        });

        const job = await response.json();

        console.log('Response:', response);

        if (response.ok) {
            console.log('Application successful');
        } else {
            console.error('Application failed');
        }
    } catch (error) {
        console.error('Error during application:', error);
    }
}

</script>

<style>
    /* Custom Scrollbar Styles */
    .scrollbar-container {
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: gray darkgray;
        max-height: calc(100vh - 80px);
    }

    .scrollbar-container::-webkit-scrollbar {
        width: 12px;
    }

    .scrollbar-container::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 6px;
    }

    .scrollbar-container::-webkit-scrollbar-track {
        background-color: darkgray;
    }
</style>

<div class="container flex">
    <!-- Left Section (Navigation/Header) -->
    <div class="left-section text-white p-4 flex-1">
        <div class="flex justify-between items-center">
            <!-- User Profile Section -->
        </div>

        <!-- Main Content Section -->
        <div class="flex">
            <!-- Job Offers Section -->
            <div class="w-full p-4 scrollbar-container">
                <h2 class="text-2xl font-semibold mb-4">Job Offers</h2>
                {#each data.data as jobOffer}
                    <div
                        class="bg-zinc-900  hover:bg-zinc-800 shadow-md p-4 mb-4 flex items-top cursor-pointer rounded-sm "
                        on:click={() => showJobDetails(jobOffer)}
                    >
                        <div class="mr-4 align-top">
                            <img class="h-15 w-16" src={jobOffer.position.company.logo} alt="Company Logo">
                        </div>
                        <div>
                            <h5 class="text-lg font-bold mb-2">{jobOffer.position.title}</h5>
                            <p class="text-gray-500">{jobOffer.position.company.name}</p>
                            <p class="text-gray-500">Location: {jobOffer.location}</p>
                            <p class="text-gray-500">Salary: {jobOffer.salary}€</p>
                            <p class="text-gray-500 text-xs pt-2">{formatPostedTime(jobOffer.postedAt)}</p>
                           
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <!-- Vertical Line using Tailwind CSS -->
<!-- Right Section (Job Offers) -->
<div class="right-section flex-1 p-4">
    {#if selectedJobOffer}
        <div class="rounded-md bg-zinc-900 shadow-md p-4">
            <h2 class="text-2xl font-semibold mb-4">Job Details</h2>
            <div class="flex flex-col items-left mb-4">
                <div class="mb-4">
                    <img class="h-16 w-17" src={selectedJobOffer.position.company.logo} alt="Company Logo">
                </div>
                <div>
                    <h5 class="text-lg font-bold mb-2">{selectedJobOffer.position.title}</h5>
                    <p class="text-gray-500">
                        {selectedJobOffer.position.company.name}, {selectedJobOffer.location}
                    </p>
                </div>
            </div>
            <p class="text-gray-500">Salary: {selectedJobOffer.salary}€</p>
            <p class="text-gray-500">Posted: {formatPostedTime(selectedJobOffer.postedAt)}</p>
            <button class="bg-blue-500 text-white px-4 py-2 mt-2" on:click={applyNow}>Apply Now</button>
        </div>
    {/if}
</div>
</div>
