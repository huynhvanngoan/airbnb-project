<template>
    <div class="fixed w-full bg-white z-10 shadow-sm">
        <div class="border-b-[1px]">
            <AppContainer>
                <div class="flex items-center justify-between gap-3 md:gap-4">
                    <!-- Logo -->
                    <NavbarLogo />
                    <!-- Search -->
                    <NavbarSearch />
                    <!-- User Menu -->
                    <NavbarUserMenu />
                </div>
            </AppContainer>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
