<template>
    <div>
        <h1>Home</h1>
        <pre>{{ user }}</pre>
        <form @submit.prevent="logout">
            <Button>Sign out</Button>
        </form>
    </div>
</template>

<script lang="ts" setup>
const user = useUser();

async function logout() {
    await $fetch("/api/logout", {
        method: "POST",
    });
    await navigateTo("/login");
}

definePageMeta({
    middleware: ["protected"],
});
</script>
