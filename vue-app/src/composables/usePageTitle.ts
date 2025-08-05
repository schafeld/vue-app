/**
 * Composable for easy page title management
 * Provides reactive title setting with browser title synchronization
 */
export const usePageTitle = () => {
  const pageStore = usePageStore();

  /**
   * Set the page title and optionally update the browser title
   * @param title - The title to set
   * @param updateBrowserTitle - Whether to update the document title (default: true)
   */
  const setTitle = (title: string, updateBrowserTitle = true) => {
    pageStore.setPageTitle(title, updateBrowserTitle);
  };

  /**
   * Set a dynamic title that updates when dependencies change
   * @param titleFn - A function that returns the title
   * @param dependencies - Reactive dependencies to watch
   */
  const setDynamicTitle = (
    titleFn: () => string,
    dependencies: any[] = [],
    updateBrowserTitle = true
  ) => {
    // Set initial title
    setTitle(titleFn(), updateBrowserTitle);

    // Watch dependencies and update title when they change
    watch(
      dependencies,
      () => {
        setTitle(titleFn(), updateBrowserTitle);
      },
      { immediate: false }
    );
  };

  /**
   * Reset the page title
   */
  const resetTitle = () => {
    pageStore.resetTitle();
  };

  return {
    setTitle,
    setDynamicTitle,
    resetTitle,
    title: computed(() => pageStore.pageData.title),
  };
};
