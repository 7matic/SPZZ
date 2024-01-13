<script lang="ts">
    export let variation: 'primary' | 'normal' = 'normal';
    export let text: string = '';
    export let className: string = '';
</script>

{#if variation === 'primary'}
    <button class={`blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 font-sans shadow-outline-primary-sm ${className}`}>
        <div class="absolute top-0 right-full w-full h-full bg-light opacity-20 group-hover:translate-x-full z-0 duration-200"/>
        {text}
    </button>
{:else}
{/if}