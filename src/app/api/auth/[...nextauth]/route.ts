import NextAuth from "next-auth";
import { options } from "./options";

const handle = NextAuth(options);

export { handle as GET, handle as POST };
