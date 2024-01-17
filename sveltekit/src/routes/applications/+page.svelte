<script lang="ts">
    import {onMount} from "svelte";
    import {getUser, makeRequest} from "../../api/api";
    import Button from "../../components/Button.svelte";

    let selectedJobOffer: any = null;
    let user: any;
    let data: any;
    let loading = true;
    let userIDD: any;
    let appliedJobs: Set<string> = new Set();


    async function loadJobs() {
        try {
            // Get user ID from local storage
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;
            userIDD = user.id;
            data = await makeRequest(`/user/applications`, 'GET');



            data = data.filter(job => {
                // Check if the user ID is in the applicants array
                return job.applicants.some(applicant => applicant.id === userId);
            });
            data.forEach(jobOffer => {
                const userHasApplied = jobOffer.applicants.some(
                    (applicant) => applicant.id === userId
                );
                if (userHasApplied) {
                    appliedJobs.add(jobOffer.id);
                }
            });
            loading = false;
        } catch (error) {
            console.error("Error loading jobs:", error);
        }
    }

    function formatPostedTime(postedAt: string): string {
        const currentTime = new Date();
        const postedTime = new Date(postedAt);
        const timeDifference = Math.abs(
            currentTime.getTime() - postedTime.getTime()
        );

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (hours < 24) {
            return `${hours} ${hours === 1 ? "uro" : "ur"} nazaj`;
        } else if (days < 7) {
            return `${days} ${days === 1 ? "dan" : "dni"} nazaj`;
        } else {
            return `${weeks} ${weeks === 1 ? "teden" : "tednov"} nazaj`;
        }
    }

    function appliedClass(jobOffer) {
        return appliedJobs.has(jobOffer.id) ? "border-s-4 border-green-600" : "";
    }

    function getApplyButtonStyle(jobOffer) {
        return appliedJobs.has(jobOffer.id) ? "red" : "green";
    }

    function getApplyButtonText(jobOffer) {
        return appliedJobs.has(jobOffer.id) ? "Prekličite prijavo" : "Prijavite se";
    }

    function showJobDetails(jobOffer) {
        selectedJobOffer = jobOffer;
    }

    async function applyNow() {
        const jobId = selectedJobOffer.id;

        try {
            const isWithdrawal = appliedJobs.has(jobId);
            const response = makeRequest(
                `/jobs/apply_job?id=${jobId}`,
                "POST",
                {
                    applied: isWithdrawal ? false : true,
                }
            );
            if (isWithdrawal) {
                appliedJobs.delete(jobId);
            } else {
                appliedJobs.add(jobId);
            }
            console.log(
                ` ${
                    isWithdrawal ? "Uspešno preklicana prijava!" : "Uspešno prijavljeno!"
                }`
            );

            await loadJobs();
            alert(
                ` ${
                    isWithdrawal ? "Uspešno preklicana prijava!" : "Uspešno prijavljeno!"
                }`
            );
            // Close the right side
            selectedJobOffer = null;
        } catch (e) {
            console.error(`Application failed`);
        }
    }

    onMount(async () => {
        await getUser();
        await loadJobs();
    });
</script>

{#if loading}
    <p class="text-primary text-xl font-sans">Nalaganje...</p>
{:else}
    <div class="container flex">
        <div class="left-section text-white p-4 flex-1">
            <div class="flex justify-between items-center">
            </div>

            <div class="flex font-normal">
                <div class="w-full p-4 h-[83vh] overflow-y-scroll">
                    <h2 class="text-3xl font-semibold mb-4">Moje prijave</h2>
                    <div class="flex justify-between items-center gap-4 ">
                       
                    </div>
                    {#each data as jobOffer}
                    <div class="{appliedClass(jobOffer, 'left')} bg-dark shadow-md p-4 mb-4 flex items-top cursor-pointer rounded hover:bg-background transition" on:click={() => showJobDetails(jobOffer)}>
                        <div class="mr-4 align-top">
                            <img class="h-15 w-16" src={jobOffer.position.company.logo} alt="Company Logo" />
                        </div>
                        <div>
                            <h5 class="text-2xl text-white font-bold mb-2">
                                {jobOffer.position.title}
                            </h5>
                            <p class="text-white text-lg">{jobOffer.position.company.name}</p>
                            <p class="text-primary"><span class="font-bold">Lokacija:</span> {jobOffer.location}</p>
                            <p class="text-primary"><span class="font-bold">Letna plača: </span>{jobOffer.salary} €</p>
                            <p class="text-primary text-xs pt-2">
                                {formatPostedTime(jobOffer.postedAt)}
                            </p>
                        </div>
                        <div class="ml-auto">
                            {#if jobOffer.active == false}
                                {#if jobOffer.position.heldById == userIDD}
                                    <p>Čestitke, bili ste sprejeti!</p>
                                {:else}
                                    <p>Žal niste bili izbrani</p>
                                {/if}
                            {/if}
                        </div>
                    </div>
                {/each}
                
                </div>
            </div>
        </div>

        <div class="right-section flex-1 p-4">
            {#if selectedJobOffer}
                <div class="rounded-md bg-dark shadow-md p-4">
                    <h2 class="text-2xl font-semibold mb-4">Job Details</h2>
                    <div class="flex flex-col items-left mb-4">
                        <div class="mb-4">
                            <img
                                    class="h-16 w-17"
                                    src={selectedJobOffer.position.company.logo}
                                    alt="Company Logo"
                            />
                        </div>
                        <div>
                            <h5 class="text-lg font-bold mb-2">
                                {selectedJobOffer.position.title}
                            </h5>
                            <p class="text-primary">
                                {selectedJobOffer.position.company.name}, {selectedJobOffer.location}
                            </p>
                        </div>
                    </div>
                    <p class="text-primary"><span class="font-bold">Letna plača: </span>{selectedJobOffer.salary}€</p>
                    <p class="text-primary">
                        <span class="font-bold">Objavljeno: </span>{formatPostedTime(selectedJobOffer.postedAt)}
                    </p>
                    <div class="border-t border-gray-600 mt-4 pt-4">
                        <h3 class="text-xl font-semibold mb-2">Opis delovnega mesta</h3>
                        <p class="text-primary leading-7">
                            {selectedJobOffer.position.description}
                        </p>
                    </div>
                    <div class="border-t border-gray-600 mt-4 pt-4">
                        <h3 class="text-xl font-semibold mb-2">Zahteve</h3>
                        <p class="text-primary leading-7">
                            {selectedJobOffer.position.requirements}
                        </p>
                    </div>
                    {#if selectedJobOffer.active == true}
                    <Button
                            variation="{getApplyButtonStyle(selectedJobOffer)}"
                            on:click={applyNow}>
                        {getApplyButtonText(selectedJobOffer)}
                    </Button>
                        {/if}
                    <a href="/chat?company={selectedJobOffer.companyId}">
                        <Button>
                            Komunicirajte s podjetjem
                        </Button>
                    </a>
                </div>
            {/if}
        </div>
    </div>
{/if}
