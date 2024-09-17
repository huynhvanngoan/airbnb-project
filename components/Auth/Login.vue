<template>
    <AppModal
        :isOpen="isOpen"
        title="Welcome back"
        description="Login to your account!"
        @onClose="onClose"
        v-if="isOpen"
    >
        <div class="space-y-6">
            <form @submit="onSubmit">
                <div class="space-y-6">
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="shadcn"
                                    v-bind="componentField"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem> </FormField
                    ><FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="shadcn"
                                    v-bind="componentField"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <div class="flex flex-col gap-2 py-6">
                    <div class="flex flex-row items-center gap-4 w-full">
                        <Button type="submit" class="w-full"> Submit </Button>
                    </div>
                    <div class="flex flex-col gap-4 mt-3">
                        <hr />

                        <Button variant="outline">
                            <a href="/login/github">
                                <Icon
                                    name="mdi:github"
                                    class="size-4 mr-2"
                                />Continue with Github
                            </a>
                        </Button>

                        <div class="text-center mt-4 font-normal">
                            <p>
                                Don't have an account?
                                <span
                                    class="text-primary cursor-pointer hover:underline"
                                    @click="toggleForm"
                                    >Register</span
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const { isOpen, onClose, LoginSchema } = useLogin();
const { onOpen } = useRegister();

const formSchema = toTypedSchema(LoginSchema);

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        password: "",
        email: "",
    },
});

const onSubmit = form.handleSubmit((values) => {
    console.log("Form submitted", values);
});

const toggleForm = () => {
    onClose();
    onOpen();
};
</script>
