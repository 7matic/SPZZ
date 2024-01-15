<script lang="ts">
    import {onDestroy, onMount} from 'svelte';
    import {page} from '$app/stores';
    import {getUser, makeRequest} from "../../api/api";
    import CompanyHeader from "../../components/ChatHeader.svelte";

    let messages = [];
    let newMessage = '';
    let companyId;
    let userId;
    let companyData = null;
    let userData = null;
    let talkingToCompany = false;
    let currentLoggedIn;
    let intervalId;

    const fetchMessages = async () => {
        const id = talkingToCompany ? companyData.userId : userId;
        const data = await makeRequest(`/messages/conversation?user2=${id}`, 'GET');
        messages = data;
    };

    const sendMessage = async () => {
        const message = {
            "sentTo": Number.parseInt(talkingToCompany ? companyData.userId : userId),
            "content": newMessage
        };
        const data = await makeRequest('/messages/send', 'POST', message);
        newMessage = '';
        await fetchMessages();
    };

    onMount(async () => {
        companyId = $page.url.searchParams.get('company');
        userId = $page.url.searchParams.get('user');
        if (!companyId && !userId) {
            window.location.href = '/profile';
        }
        if (companyId) {
            companyData = await makeRequest(`/company?id=${companyId}`, 'GET');
            talkingToCompany = true;
        } else {
            userData = await makeRequest(`/user?id=${userId}`, 'GET');
            talkingToCompany = false;
        }

        if (typeof window !== 'undefined') {
            currentLoggedIn = localStorage.getItem("user");
            currentLoggedIn = JSON.parse(currentLoggedIn);
        }
        await fetchMessages();
        intervalId = setInterval(fetchMessages, 1000);
    });
    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<div id="chat-container" class={`w-full mt-16 mb-8`}>
    <CompanyHeader
            talkingToCompany={talkingToCompany}
            data={talkingToCompany ? companyData : userData}
            id={talkingToCompany ? companyId : userId}
    />
    <div class="bg-white shadow-md rounded-lg w-full">
        <div id="chatbox" class="p-4 h-80 overflow-y-auto w-full">
            {#each messages as message (message.createdAt)}
                <div class={message.sender.id !== currentLoggedIn.id ? 'mb-2' : 'mb-2 text-right'}>
                    <p class={message.sender.id !== currentLoggedIn.id ? 'bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block' : 'bg-blue-500 text-white rounded-lg py-2 px-4 inline-block'}>
                        {message.content}
                    </p>
                </div>
            {/each}
        </div>
        <div class="p-4 border-t flex w-full">
            <input bind:value={newMessage} type="text" placeholder="Napiši sporočilo..."
                   class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            <button on:click={sendMessage}
                    class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">
                Pošlji
            </button>
        </div>
    </div>
</div>
