export default function () {
  let container = null;
  const isOpen = ref(false);

  const setContainer = element => {
    container = element;
  };
  const closeList = () => {
    isOpen.value = false;
    window.removeEventListener('click', clickHandler);
  };

  const clickHandler = e => {
    // contains 包括節點與節點的後代
    if (isOpen.value && !container.contains(e.target)) {
      closeList();
    }
  };

  const openList = e => {
    isOpen.value = true;
    window.addEventListener('click', clickHandler);
  };

  const toggleList = e => {
    return isOpen.value ? closeList() : openList();
  };

  return {
    isOpen,
    toggleList,
    setContainer,
    openList
  };
}
