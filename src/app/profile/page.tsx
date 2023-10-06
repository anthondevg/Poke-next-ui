import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
//server
export default async function page() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <section className=" p-4">
          Nombre: {session.user?.name} <br /> Email: {session.user?.email}
          <img
            src={session.user?.image || ""}
            className="w-24 h-24 rounded-full border-1 border-red-400"
          />
        </section>
      ) : (
        <h1>not access</h1>
      )}
    </>
  );
}
