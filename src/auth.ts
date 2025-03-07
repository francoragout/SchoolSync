import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      // Verificar si el email del usuario es válido
      if (!user.email) return false;

      // Verificar si el usuario existe en la base de datos
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { id: true },
      });

      // Si el usuario no existe, retornar false para evitar el inicio de sesión
      if (!existingUser) return false;

      // Agregar el id del usuario al objeto user
      user.id = existingUser.id;

      // Lógica adicional de inicio de sesión si es necesario

      return true; // o retorna un mensaje string si es necesario
    },

    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
    // Aquí es donde puedes agregar información adicional al token.
    jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id ?? token.id; // ✅ Mantiene el ID existente si `user.id` es undefined
        token.role = user.role;
      }
    
      if (account?.provider === "google") {
        token.name = profile?.name ?? token.name;
        token.image = profile?.picture ?? token.image;
      }
    
      return token;
    },
    

    // session() se utiliza para agregar la información del token a la sesión del usuario,
    // lo que hace que esté disponible en el cliente.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? ""; // ✅ Evita el error TypeScript asignando un valor por defecto
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.image = token.image ?? session.user.image;;
      }
      return session;
    }
    
  },
  events: {
    // El evento linkAccount se dispara cuando una cuenta (proveedor OAuth: GitHub, Google, Facebook, etc.)  se vincula a un usuario existente en tu base de datos.
    async linkAccount({ user, account, profile }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });

      if (account.provider === "google") {
        const googleProfile = profile as { image: string; name: string };
        await prisma.user.update({
          where: { id: user.id },
          data: {
            image: googleProfile.image,
            name: googleProfile.name,
          },
        });
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
