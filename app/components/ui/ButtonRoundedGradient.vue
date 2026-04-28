<script setup>
defineProps({
    outline: {
        type: Boolean,
        required: false,
        default: false,
    },
    color: {
        type: String,
        required: false,
        default: "white",
    },
    bgColor: {
        type: String,
        required: false,
        default: "",
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    fitSizeToContent: {
        type: Boolean,
        required: false,
        default: false,
    },
});
</script>

<template>
    <div class="flex w-full">
        <div class="box-border flex items-center justify-center rounded-full cursor-pointer" :class="[
            {
                'w-full': !fitSizeToContent,
                'border-2 border-solid hover:bg-gradient-to-r from-[#DD2211] via-[#664090] to-[#0EA3A9]':
                    outline,
                'text-white border-white': color === 'white',
                'text-black hover:text-white border-site-black': color === 'black',
                'opacity-50 pointer-events-none': disabled,
            },
        ]" :style="{ backgroundColor: bgColor }">
            <slot />
        </div>
        <div>
        </div>
    </div>
</template>
