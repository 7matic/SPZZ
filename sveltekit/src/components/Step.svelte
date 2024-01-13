<script>
    export let step;
</script>

<a
        href={step.href}
        target="_blank"
        class="p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border border-solid border-dark text-center cursor-pointer group hover:border-primary duration-200"
>
    <div
            class="grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200"
    >
        <i class={step.icon}/>
    </div>
    <h3 class="font-medium text-xl sm:text-2xl md:text-3xl">
        {step.name}
    </h3>
    <p>
        {step.description}
    </p>
    <div class="flex-1 flex justify-betweeen gap-4 items-end">
        <div
                class="ml-auto cursor-pointer hover:text-primary duration-200 relative after:absolute after:top-0 after:h-0 after:right-full after:bg-white after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] overflow-hidden"
        >
        </div>
    </div>
</a>