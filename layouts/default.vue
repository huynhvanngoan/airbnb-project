<template>
    <div>
        <Navbar />
        <div class="pb-20 pt-[220px]">
            <slot />
        </div>
        <AuthRegister />
        <AuthLogin />
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
