// next
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// project-imports
import axios from 'utils/axios';

// let users = [
//   {
//     id: 1,
//     name: 'Jone Doe',
//     email: 'info@codedthemes.com',
//     password: '123456'
//   }
// ];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/auth/login', {
            password: credentials?.password,
            email: credentials?.email
          });
          if (user) {
            user.data.user['accessToken'] = user.data.accessToken;
            return user.data.user;
          }
        } catch (e: any) {
          const errorMessage = e?.message || e?.response?.data?.message || 'Something went wrong!';
          throw new Error(errorMessage);
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/auth/register', {
            firstName: credentials?.firstname,
            lastName: credentials?.lastname,
            company: credentials?.company,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            user.data.user['accessToken'] = user.data.accessToken;
            return user.data.user;
          }
        } catch (e: any) {
          const errorMessage = e?.message || e?.response?.data?.message || 'Something went wrong!';
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // if (user) {
      //   // @ts-ignore
      //   token.accessToken = user.accessToken;
      //   token.id = user.id;
      //   token.provider = account?.provider;
      // }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // @ts-ignore
        token.name = `${user.firstName} ${user.lastName}`;
        // @ts-ignore
        token.firstname = user.firstName;
        // @ts-ignore
        token.lastname = user.lastName;
        // @ts-ignore
        token.role = user.role;
        // @ts-ignore
        token.accessToken = user.accessToken;
        token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.provider = token.provider;
        session.token = token;
        session.user = {
          // @ts-ignore
          id: token.id,
          email: token.email,
          name: `${token.firstname} ${token.lastname}`,
          firstName: token.firstname,
          lastName: token.lastname,
          role: token.role,
        };
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
