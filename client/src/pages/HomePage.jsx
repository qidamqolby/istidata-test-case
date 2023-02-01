import React from "react";
import { useQuery } from "react-query";
import { API } from "../data/api";
import AddSection from "../components/home/AddSection";
import ListSection from "../components/home/ListSection";

export default function HomePage() {
  const { data: users, refetch } = useQuery("userCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  return (
    <>
      <AddSection refetch={refetch} />
      <ListSection refetch={refetch} users={users} />
    </>
  );
}
