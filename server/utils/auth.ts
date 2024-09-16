import { Lucia } from "lucia";
import { GitHub } from "arctic";
import { webcrypto } from "node:crypto";
import adapter from "../database";

Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    writable: false,
    configurable: false
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !import.meta.dev,
        },
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            githubId: attributes.github_id,
            name: attributes.name,
            email: attributes.email
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    github_id: number;
    name: string;
    email: string;
}
export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!
);
