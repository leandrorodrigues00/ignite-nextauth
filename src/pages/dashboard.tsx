import { AuthContext } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient";
import { useContext, useEffect } from "react";
import { withSSRAuth } from "utils/withSSRAuth";

export default function DashBoard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  return <h1>DashBoard: {user?.email}</h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");
  console.log(response.data);

  return {
    props: {},
  };
});
