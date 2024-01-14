<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import UploadCV from "../../components/UploadCV.svelte";
    import Button from "../../components/Button.svelte";
    import Card from "../../components/Card.svelte";
  
    let selectedJobOffer: any = null;
    let user: any;
    let data: any;
    let loading = true;
    let userID: any;
    let BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL_FROM_SERVER;
    let appliedJobs: Set<string> = new Set();
  
    async function getUser() {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(`${BACKEND_URL}/user/withToken`, options);
        if (response.ok) {
          const data = await response.json();
          const userId = data.id;
          userID = userId;
  
          // Fetch the user object using the id
          const userResponse = await fetch(
            `${BACKEND_URL}/user?id=${userId}`,
            options
          );
          if (userResponse.ok) {
            user = await userResponse.json();
          } else {
            throw new Error("Failed to fetch user object");
          }
        } else {
          throw new Error("Failed to fetch user data");
        }
      }
    }
  
    async function loadJobs() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${BACKEND_URL}/jobs/all?sort=salary&sort_mode=desc&page=0`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
  
        if (response.ok) {
          const responseData = await response.json();
          data = responseData;
          loading = false;
  
          // Check and mark applied jobs
          data.forEach(jobOffer => {
            const userHasApplied = jobOffer.applicants.some(
              (applicant) => applicant.id === userID
            );
            if (userHasApplied) {
              appliedJobs.add(jobOffer.id);
            }
          });
        }
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
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else if (days < 7) {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
      } else {
        return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
      }
    }
  
    function appliedClass(jobOffer) {
      return appliedJobs.has(jobOffer.id) ? "border-s-4 border-green-600" : "";
    }
  
    function getApplyButtonStyle(jobOffer) {
      return appliedJobs.has(jobOffer.id) ? "bg-red-500" : "bg-green-500";
    }
  
    function getApplyButtonText(jobOffer) {
      return appliedJobs.has(jobOffer.id) ? "Withdraw application" : "Apply Now";
    }
  
    function showJobDetails(jobOffer) {
      selectedJobOffer = jobOffer;
    }
  
    async function applyNow() {
      const jobId = selectedJobOffer.id;
  
      try {
        const isWithdrawal = appliedJobs.has(jobId);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${BACKEND_URL}/jobs/apply_job?id=${jobId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
            },
            body: JSON.stringify({
              applied: isWithdrawal ? false : true,
            }),
          }
        );
        const job = await response.json();
        console.log("Response:", response);
        if (response.ok) {
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
  
          loadJobs();
  

          alert(
            ` ${
              isWithdrawal ? "Successfully withdrawn!" : "Successfully applied!"
            }`
          );
  
          // Close the right side
          selectedJobOffer = null;
        } else {
          console.error(`Application ${isWithdrawal ? "withdrawal" : "failed"}`);
        }
      } catch (error) {
        console.error("Error during application:", error);
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
          <!-- User Profile Section -->
        </div>
  
        <div class="flex font-normal">
          <div class="w-full p-4 h-[83vh] overflow-y-scroll">
            <h2 class="text-2xl font-semibold mb-4">Job Offers</h2>
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
                <div>
                  <h5 class="text-lg font-bold mb-2">
                    {jobOffer.position.title}
                  </h5>
                  <p class="text-primary">{jobOffer.position.company.name}</p>
                  <p class="text-primary">Location: {jobOffer.location}</p>
                  <p class="text-primary">Salary: {jobOffer.salary}€</p>
                  <p class="text-primary text-xs pt-2">
                    {formatPostedTime(jobOffer.postedAt)}
                  </p>
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
            <p class="text-primary">Salary: {selectedJobOffer.salary}€</p>
            <p class="text-primary">
              Posted: {formatPostedTime(selectedJobOffer.postedAt)}
            </p>
            <div class="border-t border-gray-600 mt-4 pt-4">
              <h3 class="text-xl font-semibold mb-2">Job Description</h3>
              <p class="text-primary leading-7">
                {selectedJobOffer.position.description}
              </p>
            </div>
            <div class="border-t border-gray-600 mt-4 pt-4">
              <h3 class="text-xl font-semibold mb-2">Requirements</h3>
              <p class="text-primary leading-7">
                {selectedJobOffer.position.requirements}
              </p>
            </div>
            <button
              class="{getApplyButtonStyle(
                selectedJobOffer
              )} rounded-sm hover:bg-background transition text-white px-4 py-2 mt-2"
              on:click={applyNow}
            >
              {getApplyButtonText(selectedJobOffer)}
            </button>
          </div>
        {/if}
      </div>
    </div>
  {/if}
  