import type { ComputedRef, WatchSource } from 'vue'

type TitleFunction = () => string
type WatchDependency = WatchSource<unknown>

interface UsePageTitleReturn {
  setTitle: (title: string, updateBrowserTitle?: boolean) => void
  setDynamicTitle: (
    titleFn: TitleFunction,
    dependencies?: WatchDependency[],
    updateBrowserTitle?: boolean
  ) => void
  resetTitle: () => void
  title: ComputedRef<string>
}

export const usePageTitle = (): UsePageTitleReturn => {
  const pageStore = usePageStore()

  const setTitle = (title: string, updateBrowserTitle = true): void => {
    pageStore.setPageTitle(title, updateBrowserTitle)
  }

  const setDynamicTitle = (
    titleFn: TitleFunction,
    dependencies: WatchDependency[] = [],
    updateBrowserTitle = true
  ): void => {
    // Set initial title
    setTitle(titleFn(), updateBrowserTitle)

    // Watch dependencies and update title when they change
    watch(
      dependencies,
      () => {
        setTitle(titleFn(), updateBrowserTitle)
      },
      { immediate: false }
    )
  }

  const resetTitle = (): void => {
    pageStore.resetTitle()
  }

  return {
    setTitle,
    setDynamicTitle,
    resetTitle,
    title: computed(() => pageStore.pageData.title),
  }
}
