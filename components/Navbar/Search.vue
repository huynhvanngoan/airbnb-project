<template>
    <div
        class="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
        <div class="flex flex-row items-center justify-between">
            <div class="text-sm font-semibold px-6">Anywhere</div>
            <div
                class="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center"
            >
                Any Week
            </div>
            <div
                class="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3"
            >
                <div class="hidden sm:block">Add Guests</div>
                <div
                    class="size-10 flex items-center justify-center bg-primary rounded-full text-primary-foreground"
                >
                    <Icon name="material-symbols:search" size="28" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
