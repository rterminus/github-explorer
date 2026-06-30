import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import RepoGrid from "../components/RepoGrid.jsx";
import Footer from "../components/Footer.jsx";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <main class="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-8 lg:px-0">
        <ProfileCard />
        <RepoGrid />
      </main>
      <Footer />
    </>
  );
}
