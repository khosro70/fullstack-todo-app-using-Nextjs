import HomePage from "../components/template/HomePage";
import { getSession } from "next-auth/react";

const Index = () => {
  return <HomePage />;
};

export default Index;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {}
  }
}
