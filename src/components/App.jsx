import { useState, useEffect } from "react";

import ErrorScreen from "../components/ErrorScreen.jsx";
import Footer from "../components/Footer.jsx";
import HomeScreen from "../components/HomeScreen.jsx";
import Navbar from "../components/Navbar.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileSkeleton from "../components/ProfileSkeleton.jsx";
import RepoGrid from "../components/RepoGrid.jsx";
import RepoSkeleton from "../components/RepoSkeleton.jsx";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchGitHubData() {
      setHasError(false);
      setUserData(null);
      setIsLoading(true);

      try {
        // profile data fetching
        const userResponse = await fetch(
          `https://api.github.com/users/${searchQuery}`,
        );
        if (!userResponse.ok) {
          throw new Error("User not found");
        }
        const userDataJson = await userResponse.json();
        setUserData(userDataJson);

        // repo data fetching
        const reposResponse = await fetch(
          `https://api.github.com/users/${searchQuery}/repos?sort=updated&per_page=4`,
        );
        const reposDataJson = await reposResponse.json();
        setUserRepos(reposDataJson);
      } catch (error) {
        console.error("Error encountered: ", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitHubData();
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      {searchQuery === "" ? (
        <HomeScreen onSearch={setSearchQuery} isLoading={isLoading} />
      ) : (
        <>
          <Navbar onSearch={setSearchQuery} isLoading={isLoading} />
          <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-8 md:gap-16 lg:px-0">
            {hasError ? (
              <ErrorScreen searchQuery={searchQuery} />
            ) : !isLoading && userData ? (
              <>
                <ProfileCard user={userData} />
                <RepoGrid repos={userRepos} />
              </>
            ) : (
              <>
                <ProfileSkeleton />
                <RepoSkeleton />
              </>
            )}
          </main>
        </>
      )}
    <Footer />
    </div>
  );
}
