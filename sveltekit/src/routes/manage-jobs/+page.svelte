<script lang="ts">
  import { onMount } from "svelte";
  import { getUser, makeRequest } from "../../api/api";
  import Button from "../../components/Button.svelte";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  let selectedJobOffer: any = null;
  let company: string;
  let data: any;
  let loading = true;
  let applicants: any;
  let editMode = false;
  let companyID : any;
  let startDate : Date;
  let endDate : Date;


  async function getCompany() {
    try {
      data = await makeRequest(`/user/withToken`, "GET");

        
      companyID = data.company_id;

    } catch (error) {
      console.error("Error iskanja ID podjetja:", error);
    }
  }

  async function loadJobOffers() {
    try {  
     data = await makeRequest(`/company/joboffers?id=${companyID}`, "GET");
    
    } catch (error) {
      console.error("Error nalaganja ponudb:", error);
    }
  }

  function formatPostedTime(postedAt: string): string {
    const currentTime = new Date();
    const postedTime = new Date(postedAt);
    const timeDifference = Math.abs(
      currentTime.getTime() - postedTime.getTime(),
    );

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (days < 7) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
  }

  function showJobDetails(jobOffer: any): void {
    selectedJobOffer = jobOffer;
    editMode = false;
    loadApplicants(selectedJobOffer.id);
  }

  onMount(async () => {
    await getCompany();
    await loadJobOffers();
    loading = false;
  });



  async function handleSubmitEditForm(event) {
    event.preventDefault();
    const { id, location, salary} = selectedJobOffer;
    try {
      const reg = await makeRequest(`/jobs/update`, "PUT", {
        id,
        location,
        salary,
        active: true,
      });
      showJobDetails(selectedJobOffer); 
      loadJobOffers();
      editMode = false;
    } catch (error) {
      console.error("Posodobitev ni uspela:", error);

    }
  }

  async function handleSubmitEditFormPosition(event) {
    const { id, position } = selectedJobOffer;
    try {
      const reg = await makeRequest(`/positions/update`, "PUT", {
        id: position.id,
        title: position.title,
        description: position.description,
        requirements: position.requirements,
        companyId: position.companyId,
        heldById: position.heldById,
        isFilled: position.isFilled,
      });
      showJobDetails(selectedJobOffer);
      loadJobOffers();
      editMode = false;
    } catch (error) {
      console.error("Error creating job:", error);
      errorMessage = "Posodobitev ni uspelo!";
    }
  }

  async function loadApplicants(jobOfferId: string) {
    loading = true;
    try {
      applicants = await makeRequest(
        `/company/get-job-applicants?id=${jobOfferId}`,
        "GET",
      );
    } catch (error) {
      console.error("Error nalaganja aplikantov:", error);
    }
    loading = false;
  }

  async function handleRemoveJobOffer(event) {
    loading = true;
    event.preventDefault();
    const id = selectedJobOffer.id;

    try {
      const reg = await makeRequest(`/jobs/delete?id=${id}`, "DELETE", {});
    } catch (error) {
      console.error("Error brisanja ponudbe:", error);
    }

    loading = false;
    editMode = false;
    selectedJobOffer = null;
    loadJobOffers();
  }

  async function zakljuciOffer(event) {
    event.preventDefault();
    const { id, location, salary } = selectedJobOffer;
    try {
      const reg = await makeRequest(`/jobs/update`, "PUT", {
        id,
        location,
        salary,
        active: false,
      });
      showJobDetails(selectedJobOffer); 
      loadJobOffers();
      editMode = false;
    } catch (error) {
      console.error("Error zaključevanja ponudbe:", error);
    }
  }

  async function handleAcceptApplicant(applicantId: string) {
    try {
      const reg = await makeRequest(
        `/company/choose-applicants?id=${selectedJobOffer.id}`,
        "POST",
        {
          user_id: applicantId,
        },
      );
    } catch (error) {
      console.error("Error ustvarjanja ponudbe:", error);
    }
  }
</script>

{#if loading}
  <p class="text-primary text-xl font-sans">Nalaganje...</p>
{:else}

  <div class="container p-4 w-auto place-content-center">
    {#if selectedJobOffer && !editMode}
      <div class="rounded-md bg-dark shadow-md p-4">
        <h2 class="text-2xl font-semibold mb-4">Podatki ponudbe</h2>
        <div class="text-primary mb-2">
          <span class="font-bold">Lokacija:</span>
          {selectedJobOffer.location}
        </div>
        <div class="text-primary mb-2">
          <span class="font-bold">Letna plača:</span>
          {selectedJobOffer.salary}€
        </div>
        <div class="text-primary mb-2">
          <span class="font-bold">Naziv pozicije:</span>
          {selectedJobOffer.position.title}
        </div>
        <div class="text-primary mb-2">
          <span class="font-bold">Začetni datum:</span>
          {selectedJobOffer.startDate}
        </div>
        <div class="text-primary mb-2">
          <span class="font-bold">Končni datum:</span>
          {selectedJobOffer.endDate}
        </div>
        <div class="border-t border-gray-600 mt-4 pt-4">
          <h3 class="text-xl font-semibold mb-2">Podatki pozicije</h3>
          <div class="text-primary mb-2">
            <span class="font-bold">Opis dela:</span>
            {selectedJobOffer.position.description}
          </div>
          <div class="text-primary mb-2">
            <span class="font-bold">Zahteve:</span>
            {selectedJobOffer.position.requirements}
          </div>
        </div>

        <div class="mt-4 flex justify-between">
          <div class="flex">
            <span
              class="cursor-pointer mr-4 bg-primary hover:bg-background transition p-2 rounded"
              on:click={() => (editMode = true)}
            >
              ✏️ Spremeni
            </span>
            <span
              class="cursor-pointer bg-primary hover:bg-background p-2 transition rounded align-left"
              on:click={() => (selectedJobOffer = null)}
            >
              ❌ Izhod
            </span>
          </div>

          <span
            class="cursor-pointer bg-primary hover:bg-background p-2 transition rounded"
            on:click={zakljuciOffer}
          >
            🗑️ Zaključi ponudbo
          </span>
          <span
            class="cursor-pointer bg-primary hover:bg-background p-2 transition rounded"
            on:click={handleRemoveJobOffer}
          >
            🗑️ Izbriši ponudbo
          </span>
        </div>


        <div class="mt-4">
          <h3 class="text-xl font-semibold mb-2 text-center">
            Prijavljeni kandidati
          </h3>
          {#if applicants && applicants.applicants < 0}
            <p class="text-primary text-center justify-center">
              Ni prijavljenih kandidatov za to delovno mesto.
            </p>
          {:else}
            {#each applicants.applicants as applicant}
              <div class="flex items-center justify-center">
                <div
                  class="shadow-md p-2 mb-5 rounded bg-background grid grid-flow-row grid-cols-4"
                >
                  <p class="text-primary text-center allign-middle">
                    {applicant.firstName}
                    {applicant.lastName}
                  </p>
                  <button
                    class="me-20"
                    on:click={() => handleAcceptApplicant(applicant.id)}
                    >Sprejmi</button
                  >

                  {#if applicant.matches && applicant.matches.length > 0}
                    <ProgressRadial
                      value={applicant.matches[0].score * 100}
                      width={"w-10"}
                      font={200}
                      meter={applicant.matches[0].score * 100 > 80
                        ? "stroke-green-800"
                        : applicant.matches[0].score * 100 > 60
                          ? "stroke-orange-400"
                          : applicant.matches[0].score * 100 > 40
                            ? "stroke-yellow-800"
                            : "stroke-red-800"}
                      strokeLinecap={"round"}
                      data-theme={"primary"}
                      track={"stroke-gray-600"}
                    >
                      {applicant.matches[0].score * 100}
                    </ProgressRadial>
                  {/if}
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {:else if !editMode}

      <h2 class="text-2xl font-semibold mb-4">Moje ponudbe dela</h2>
      {#if data.length == 0}
        <p class="text-primary">Nimate ponudb.</p>
      {:else}
        {#each data as jobOffer}
          <div
            class="bg-dark shadow-md p-4 mb-4 flex items-top cursor-pointer rounded hover:bg-background transition relative"
            on:click={() => showJobDetails(jobOffer)}
          >
            <div>
              <h5 class="text-lg font-bold mb-2">
                {jobOffer.position.title}
              </h5>
              <p class="text-primary">
                <span class="font-bold">Lokacija:</span>
                {jobOffer.location}
              </p>
              <p class="text-primary">
                <span class="font-bold">Letna plača:</span>
                {jobOffer.salary}€
              </p>
              <p class="text-primary text-xs pt-2">
                {formatPostedTime(jobOffer.postedAt)}
              </p>
            </div>
          </div>
        {/each}
      {/if}
    {/if}
  </div>

  {#if selectedJobOffer && editMode}

    <form
      on:submit={(e) => {
        handleSubmitEditForm(e);
        handleSubmitEditFormPosition(e);
      }}
      class="container p-4 edit-form"
    >
      <label for="location">Lokacija:</label>
      <input
        type="text"
        id="location"
        name="location"
        bind:value={selectedJobOffer.location}
      />

      <label for="salary">Letna plača:</label>
      <input
        type="text"
        id="salary"
        name="salary"
        bind:value={selectedJobOffer.salary}
      />

      <label for="title">Nazic pozicija:</label>
      <input
        type="text"
        id="title"
        name="title"
        bind:value={selectedJobOffer.position.title}
      />

      <label for="startDate">Začetni datum:</label>
      <input
        type="date"
        id="startDate"
        name="startDate"
        bind:value={startDate}
      />

      <label for="endDate">Končni datum:</label>
      <input
        type="date"
        id="endDate"
        name="endDate"
        bind:value={endDate}
      />

      <label for="description">Opis dela:</label>
      <textarea
        id="description"
        name="description"
        bind:value={selectedJobOffer.position.description}
      ></textarea>

      <label for="requirements">Zahteve:</label>
      <textarea
        id="requirements"
        name="requirements"
        bind:value={selectedJobOffer.position.requirements}
      ></textarea>

      <div class="mt-4 flex">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Shrani
        </button>
        <button
          type="button"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-4 mx-3"
          on:click={() => (editMode = false)}
        >
          Zavrzi spremembe
        </button>
      </div>
    </form>
  {/if}

  <div class="fixed bottom-4 right-4">
    <a href="/job-create">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        ➕ Ustvari novo ponudbo
      </button>
    </a>
  </div>
{/if}

<style>
  .edit-form input,
  .edit-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    font-size: inherit;
    border-radius: 4px;
    color: black; 
  }
</style>
