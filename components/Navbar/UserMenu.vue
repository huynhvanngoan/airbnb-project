<template>
    <div class="relative">
        <div class="flex flex-row items-center gap-3">
            <div
                class="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                AirBnB your home
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button
                        variant="ghost"
                        class="p-4 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md hover:bg-transparent transition"
                        size="sm"
                    >
                        <Icon name="ant-design:menu-outlined" />

                        <Icon name="iconoir:profile-circle" class="size-6" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56" align="end">
                    <DropdownMenuLabel>{{ user?.email }}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <template v-if="user">
                        <!-- Reservations [Booked One - Rented or Reserved ]-->
                        <DropdownMenuItem @click="navigateTo('/trips')">
                            <span> My trips </span>
                        </DropdownMenuItem>

                        <!-- Reservations [My listings - Booked by others ] -->
                        <DropdownMenuItem @click="navigateTo('/reservations')">
                            <span> Reservations </span>
                        </DropdownMenuItem>

                        <!-- Favorites -->
                        <DropdownMenuItem @click="navigateTo('/favorites')">
                            <span> My favorites </span>
                        </DropdownMenuItem>

                        <!-- Listings [for other person as renter]  -->
                        <DropdownMenuItem @click="navigateTo('/properties')">
                            <span> My properties </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <span> Airbnb your home </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem @click="logout">
                            <Icon
                                name="material-symbols:logout"
                                class="mr-2 size-4"
                            />
                            Logout
                        </DropdownMenuItem>
                    </template>
                    <template v-else>
                        <DropdownMenuItem>Login</DropdownMenuItem>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
const user = useUser();
async function logout() {
    await $fetch("/api/logout", {
        method: "POST",
    });
    user.value = null;
    await navigateTo("/login");
}
</script>

<style scoped lang="scss"></style>
