interface useSearchHistoryProps {
  localStorageName: string;
}

export default function useSearchHistory({
  localStorageName = "search-history",
}: useSearchHistoryProps) {
  function getSearchFilterHistory() {
    const history = window.localStorage.getItem(localStorageName);
    if (history) {
      return JSON.parse(history);
    }
    return [];
  }

  function saveSearchFilter({
    searchFilter,
    searchTitle,
  }: {
    searchFilter: string;
    searchTitle?: string;
  }) {
    // Get local storage based on the given name
    const history = window.localStorage.getItem(localStorageName);
    if (history && searchTitle) {
      // If local storage name exist add the searchFilter to the existing history array
      // Push the searchFilter to the existing history array
      // Lastly set the updated existingHistory array to the existing localStorage
      const existingHistory = [...JSON.parse(history)];
      existingHistory.push({
        created: new Date(),
        query: searchFilter,
        title: searchTitle,
      });
      window.localStorage.setItem(
        localStorageName,
        JSON.stringify(existingHistory),
      );
    }
    if (!history && searchTitle) {
      // If local storage name doesn't exist create one and create new history array
      const newHistory = [
        {
          created: new Date(),
          query: searchFilter,
          title: searchTitle,
        },
      ];
      window.localStorage.setItem(localStorageName, JSON.stringify(newHistory));
    }
  }

  function removeSearchFilter(searchFilter: string) {
    // Get local storage based on the given name
    const history = window.localStorage.getItem(localStorageName);
    // If local storage exist and history exist find searchFilter index from existing history array
    // Remove the searchFilter from the history array using the searchFilter index
    // Lastly set the updated existingHistory array to the existing localStorage
    if (history) {
      const existingHistory = JSON.parse(history);
      const searchFilterIndex = existingHistory.findIndex(
        (item: { created: Date; query: string }) => item.query === searchFilter,
      );
      if (searchFilterIndex >= 0) {
        existingHistory.splice(searchFilterIndex, 1);
        window.localStorage.setItem(
          localStorageName,
          JSON.stringify(existingHistory),
        );
      }
    }
  }

  function clearSearchFilters() {
    // Clear the localStorage based on the given localStorageName
    window.localStorage.removeItem(localStorageName);
  }

  return {
    getSearchFilterHistory,
    saveSearchFilter,
    removeSearchFilter,
    clearSearchFilters,
  };
}
