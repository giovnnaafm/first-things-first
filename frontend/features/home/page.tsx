"use client";

import { AuthContext } from "@/providers/auth";
import { ListIcon, Plus } from "lucide-react";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="drop-shadow-lg p-4 bg-white rounded-md lg:w-1/2">
      <h3 className="text-center text-2xl">
        Let's get started,
        <span className="text-secondary font-bold"> {user?.name}</span>!
      </h3>
      <div className="flex lg:flex-row flex-col gap-4 justify-center py-8 px-4">
        <a
          href="/backlogs"
          className="p-4 w-full shadow-sm border border-gray-800 rounded-md text-left flex items-center space-x-2 transition-transform transform hover:scale-105"
        >
          <ListIcon />
          <span>My backlogs</span>
        </a>
        <a
          href="/backlogs/create"
          className="p-4 w-full shadow-sm border border-gray-800 rounded-md text-left flex items-center space-x-2 transition-transform transform hover:scale-105"
        >
          <Plus />
          <span>Create new backlog</span>
        </a>
      </div>
    </div>
  );
}
