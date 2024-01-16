<script lang="ts">
    import {onMount} from "svelte";
    import {getUser, makeRequest} from "../../api/api";
    import Button from "../../components/Button.svelte";
    import {ProgressRadial} from "@skeletonlabs/skeleton";

    let selectedJobOffer: any = null;
    let user: any;
    let data: any;
    let loading = true;
    let userID: any;
    let appliedJobs: Set<string> = new Set();
    let sort = 'salary';
    let sort_mode = 'desc';
    let currentPage = 0;
    let infoText = '';

    function previousPage() {
        if (currentPage > 0) {
            loading = true;
            currentPage--;
            data = [];
            loadJobs(currentPage, sort, sort_mode);
        }
    }

    function nextPage() {
        loading = true;
        currentPage++;
        data = [];
        loadJobs(currentPage, sort, sort_mode);
    }

    async function loadJobs(currentPage: number = 0, sort: string = 'salary', sort_mode: string = 'desc') {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;
            data = await makeRequest(`/jobs/all?sort=${sort}&sort_mode=${sort_mode}&page=${currentPage}`, 'GET');
            data.forEach(jobOffer => {
                const userHasApplied = jobOffer.applicants.some(
                    (applicant) => applicant.id === userId
                );
                if (userHasApplied) {
                    appliedJobs.add(jobOffer.id);
                }
            });
            loading = false;
            infoText = '';
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
                    isWithdrawal ? "Successfully withdrawn!" : "Successfully applied!"
                }`
            );

            await loadJobs();
            alert(
                ` ${
                    isWithdrawal ? "Successfully withdrawn!" : "Successfully applied!"
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
                    <h2 class="text-3xl font-semibold mb-4">Ponudbe dela</h2>
                    <div class="flex justify-between items-center gap-4 ">
                        <select bind:value={sort} on:change={() => loadJobs(sort, sort_mode)}
                                class="w-full py-2 px-3 rounded border border-gray-300 mb-4 bg-dark text-white">
                            <option value="salary">Letna plača</option>
                            <option value="postedAt">Čas objave</option>
                        </select>
                        <select bind:value={sort_mode} on:change={() => loadJobs(sort, sort_mode)}
                                class="w-full py-2 px-3 rounded border border-gray-300 mb-4 bg-dark text-white">
                            <option value="desc">Padajoče</option>
                            <option value="asc">Naraščajoče</option>
                        </select>
                    </div>
                    {#each data as jobOffer}
                        <div
                                class="{appliedClass(
                  jobOffer,
                  'left'
                )} bg-dark shadow-md p-4 mb-4 flex items-top cursor-pointer rounded hover:bg-background transition"
                                on:click={() => showJobDetails(jobOffer)}
                        >
                            <div class="mr-4 align-top">
                                <img
                                        class="h-15 w-16"
                                        src={jobOffer.position.company.logo}
                                        alt="Company Logo"
                                />
                            </div>
                            <div class="w-full">
                                <h5 class="text-2xl text-white font-bold mb-2 flex justify-between w-full">
                                    {jobOffer.position.title}

                                    {#if jobOffer.matches && jobOffer.matches.length > 0}
                                        <ProgressRadial
                                                value={Math.round(jobOffer.matches[0].score * 100)}
                                                width={"w-10"}
                                                font={200}
                                                meter={jobOffer.matches[0].score * 100 > 80
                        ? "stroke-green-800"
                        : jobOffer.matches[0].score * 100 > 60
                          ? "stroke-orange-400"
                          : jobOffer.matches[0].score * 100 > 40
                            ? "stroke-yellow-800"
                            : "stroke-red-800"}
                                                strokeLinecap={"round"}
                                                data-theme={"primary"}
                                                track={"stroke-gray-600"}
                                        >
                                            {Math.round(jobOffer.matches[0].score * 100)}
                                        </ProgressRadial>
                                    {/if}
                                </h5>
                                <p class="text-white text-lg">{jobOffer.position.company.name}</p>

                                <p class="text-primary"><span class="font-bold">Lokacija:</span> {jobOffer.location}</p>
                                <p class="text-primary"><span class="font-bold">Letna plača: </span>{jobOffer.salary} €
                                </p>
                                <p class="text-primary text-xs pt-2">
                                    {formatPostedTime(jobOffer.postedAt)}
                                </p>

                            </div>
                        </div>
                    {/each}
                    <div class="pagination flex justify-between items-center">
                        <button on:click={previousPage} class="bg-light p-2">Prejšnja stran</button>
                        <span>Stran {currentPage + 1}</span>
                        <button on:click={nextPage} class="bg-light p-2">Naslednja stran</button>
                    </div>
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
                    <Button
                            variation="{getApplyButtonStyle(selectedJobOffer)}"
                            on:click={applyNow}>
                        {getApplyButtonText(selectedJobOffer)}
                    </Button>
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
  