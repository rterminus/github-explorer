import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileSkeleton from "../components/ProfileSkeleton.jsx";
import RepoGrid from "../components/RepoGrid.jsx";
import RepoSkeleton from "../components/RepoSkeleton.jsx";
import Footer from "../components/Footer.jsx";

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
    <>
      <Navbar onSearch={setSearchQuery} isLoading={isLoading} />
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 md:gap-16 px-6 py-8 lg:px-0">
        {hasError ? (
          <div className="bg-surface-card border-border-subtle flex flex-col items-center justify-center gap-4 rounded-xl border py-20 text-center">
            <span className="text-text-muted material-symbols-outlined text-5xl">
              Error!
            </span>
            <h2 className="text-text-primary text-2xl font-bold">
              User not found
            </h2>
            <p className="text-text-secondary">
              We couldn't find anyone with the username{" "}
              <span className="text-primary text-lg">@{searchQuery}</span>.
            </p>
          </div>
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
      <Footer />
    </>
  );
}
