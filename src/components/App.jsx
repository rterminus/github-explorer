import { useState, useEffect } from "react";

import ErrorScreen from "../components/ErrorScreen.jsx";
import Footer from "../components/Footer.jsx";
import HomeScreen from "../components/HomeScreen.jsx";
import Navbar from "../components/Navbar.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileSkeleton from "../components/ProfileSkeleton.jsx";
import RepoGrid from "../components/RepoGrid.jsx";
import RepoSkeleton from "../components/RepoSkeleton.jsx";

const API_URL = import.meta.env.PUBLIC_API_URL ?? "";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchGitHubData() {
      setErrorStatus(null);
      setUserData(null);
      setIsLoading(true);

      const user = encodeURIComponent(searchQuery);

      try {
        // profile data fetching
        const userResponse = await fetch(`${API_URL}/api/users/${user}`);
        if (!userResponse.ok) {
          setErrorStatus(userResponse.status);
          return;
        }
        const userDataJson = await userResponse.json();
        setUserData(userDataJson);

        // repo data fetching
        const reposResponse = await fetch(
          `${API_URL}/api/users/${user}/repos`,
        );
        if (!reposResponse.ok) {
          setErrorStatus(reposResponse.status);
          return;
        }
        const reposDataJson = await reposResponse.json();
        setUserRepos(reposDataJson);
      } catch (error) {
        console.error("Error encountered: ", error);
        setErrorStatus(0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitHubData();
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen flex-col">
      {searchQuery === "" ? (
        <HomeScreen onSearch={setSearchQuery} isLoading={isLoading} />
      ) : (
        <>
          <Navbar onSearch={setSearchQuery} isLoading={isLoading} />
          <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-8 md:gap-16 lg:px-0">
            {errorStatus !== null ? (
              <ErrorScreen searchQuery={searchQuery} status={errorStatus} />
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
