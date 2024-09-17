const state = reactive({
    isOpen: false,
});

import * as z from "zod";

const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});
export default () => {
    const { isOpen } = toRefs(state);

    const onOpen = () => {
        state.isOpen = true;
    };

    const onClose = () => {
        state.isOpen = false;
    };

    return { isOpen, onOpen, onClose, RegisterSchema };
};
