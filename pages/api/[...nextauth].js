import NextAuth from "next-auth" 
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../lib/mongodb"
import SpotifyProvider from "next-auth/providers/spotify"

const SPOTIFY_AUTHORIZATION_URL =
"https://accounts.spotify.com/authorize?" +
new URLSearchParams({
  promp: "consent",
  access_type: "offline",
  response_type: "code",
})

async function refreshAccessToken(token){
  try {
    const url =
    "https://accounts.spotify.com/api/token?" +
    new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grantt_type: "refresh_token",
      refresh_token: token.refreshToken,
    })

    const response = await fetch(url, {
      headers: {
        "Content-type": "application/x=www-form-urlencoded"
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw  refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTOkenError"
    }
  }
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers:[
    SpotifyProviders({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: SPOTIFY_AUTHORIZATION_URL,
    }),
  ],
  database: process.envMONGODB_URI,
  session: {
    stratagey: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initail sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // we are handling expiry times in milliseconds hence * 1000
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID");
        return token;
      }

      // Access token has expired, so we need to refresh it ...
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
})