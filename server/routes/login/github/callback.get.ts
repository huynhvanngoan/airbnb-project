import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/server/database";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const state = query.state?.toString() ?? null;
    const storedState = getCookie(event, "github_oauth_state") ?? null;
    if (!code || !state || !storedState || state !== storedState) {
        throw createError({
            status: 400,
            message: "Invalid OAuth state or code",
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        if (!githubUserResponse.ok) {
            throw new Error("Failed to fetch GitHub user");
        }
        const githubUser: GitHubUser = await githubUserResponse.json();

        // Replace this with your own DB client.
        const existingUser = await db.user.findUnique({
            where: {
                github_id: githubUser.id,
            },
        });

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            appendHeader(
                event,
                "Set-Cookie",
                lucia.createSessionCookie(session.id).serialize()
            );
            return sendRedirect(event, "/");
        }

        const userId = generateIdFromEntropySize(10); // 16 characters long

        await db.user.create({
            data: {
                id: userId,
                github_id: githubUser.id,
                name: githubUser.name,
                email: githubUser.login,
            },
        });

        const session = await lucia.createSession(userId, {});
        appendHeader(
            event,
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize()
        );
        return sendRedirect(event, "/");
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            throw createError({
                status: 400,
                message: "Invalid authorization code",
            });
        }
        throw createError({
            status: 500,
            message: "Internal server error",
        });
    }
});

interface GitHubUser {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
}
