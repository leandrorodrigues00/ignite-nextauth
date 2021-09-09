import styles from "@/styles/Home.module.css";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRGuest } from "utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const { singIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    await singIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}



export const getServerSideProps= withSSRGuest(async (ctx) => {

  return {
    props: {
 
    }
  }

})