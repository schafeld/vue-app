const isMenuOpen = ref(false); // This state needs to be global, thus outside the composable function

export const useMenu = () => {
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  const closeMenu = () => {
    isMenuOpen.value = false;
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
};
