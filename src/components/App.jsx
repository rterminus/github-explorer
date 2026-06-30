import Navbar from "../components/Navbar.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import RepoGrid from "../components/RepoGrid.jsx";
import Footer from "../components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main class="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-8 lg:px-0">
        <ProfileCard />
        <RepoGrid />
      </main>
      <Footer />
    </>
  );
}
