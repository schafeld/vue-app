export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
  });

  // Function to set page title and update browser title
  const setPageTitle = (title: string, updateBrowserTitle = true) => {
    pageData.value.title = title;
    if (updateBrowserTitle && typeof document !== 'undefined') {
      document.title = title ? `${title} | Vue App` : 'Vue App';
    }
  };

  // Reset title when navigating (useful for route guards)
  const resetTitle = () => {
    pageData.value.title = '';
    if (typeof document !== 'undefined') {
      document.title = 'Vue App';
    }
  };

  return {
    pageData,
    setPageTitle,
    resetTitle,
  }
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
