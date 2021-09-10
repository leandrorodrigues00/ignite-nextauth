import { AuthContext } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient";
import { useContext, useEffect } from "react";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { Can } from "@/components/Can";

export default function DashBoard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1>DashBoard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");
  console.log(response.data);

  return {
    props: {},
  };
});
