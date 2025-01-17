import CredentialsProvider from 'next-auth/providers/credentials'
export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        let user = null
        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password)
        // logic to verify if the user exists
        //user = await getUserFromDb(credentials.email, pwHash)
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.')
        }
        // return user object with their profile data
        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid
      }
      return session
    },
  },
}
