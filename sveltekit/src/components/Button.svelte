<script lang="ts">
    export let variation: 'primary' | 'normal' = 'normal';
    export let text: string = '';
    export let className: string = '';
    export let icon: string = '';

    let classes = {
        'primary': 'relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 font-sans shadow-outline-primary-sm hover:bg-light transform transition-background duration-200',
        'normal': 'w-full py-2 mt-4 bg-primary text-white rounded hover:bg-blue-600 font-sans transform transition-background duration-200',
        'green': 'w-full py-2 mt-4 text-white rounded font-sans transform transition-background duration-200 bg-green-500 hover:bg-green-600',
        'red': 'w-full py-2 mt-4 text-white rounded font-sans transform transition-background duration-200 bg-red-500 hover:bg-red-600',
        'normal-nomargin': 'w-full py-2 mt-0 bg-primary text-white rounded hover:bg-blue-600 font-sans transform transition-background duration-200',
    }
</script>

<button on:click class={`${classes[variation]} ${className}`} {...$$props}>
    {#if icon}
        <span class="mr-2"><i class={icon}/></span>
    {/if}
    <slot/>
    {text}
</button>


