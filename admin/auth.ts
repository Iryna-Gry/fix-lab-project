import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'login', type: 'text', required: true },
        password: { label: 'password', type: 'password', required: true },
      },

      async authorize(credentials, _req) {
        if (!credentials || !credentials.login || !credentials.password) {
          return null
        }
        const user = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            login: credentials.login,
            password: credentials.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        if (user.ok) {
          try {
            const data = await user.text()

            if (data) {
              const user = {
                name: credentials.login.toString(),
                token: data,
              }
              return user as User
            }
            return null
          } catch (error) {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/authentication/signin',
    error: '/authentication/signin',
  },
  callbacks: {
    authorized(params) {
      return !!params.auth?.user
    },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      const modifiedSession = {
        ...session,
        user: token as any,
      }

      return modifiedSession
    },
  },
})
