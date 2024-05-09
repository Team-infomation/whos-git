import { useQuery } from "@tanstack/react-query";

const FetchRepositoryData = () => {
  const { isLoading, error, data } = useQuery(
    "githubRepoData",
    async () => {
      const response = await fetch(
        "https://api.github.com/repos/kkt9102/isotope/contents/bin"
      );
      return response.json();
    },
    {
      staleTime: 1000 * 60 * 60 * 2,
    }
  );
};

export default FetchRepositoryData;
