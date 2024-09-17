<template>
    <Dialog :open="isModalVisible" @update:open="$emit('onClose')">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader class="flex flex-col justify-center items-center">
                <DialogTitle v-if="title" class="text-xl">{{
                    title
                }}</DialogTitle>
                <DialogDescription v-if="description">
                    {{ description }}
                </DialogDescription>
            </DialogHeader>
            <slot />
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
interface ModalProps {
    isOpen?: boolean;
    title?: string;
    description?: string;
}

const props = defineProps<ModalProps>();

const emit = defineEmits(["onClose"]);
const isModalVisible = computed({
    get() {
        return props.isOpen;
    },
    set(value) {
        emit("onClose");
    },
});
</script>

<style scoped lang="scss"></style>
