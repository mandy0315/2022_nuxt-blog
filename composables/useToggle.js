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
    if (isOpen.value && !container.contains(e.target)) {
      closeList();
    }
  };

  const openList = e => {
    isOpen.value = true;

    setTimeout(() => {
      window.addEventListener('click', clickHandler);
    }, 300);
  };

  const toggleList = e => {
    console.log(isOpen.value);
    return isOpen.value ? closeList() : openList();
  };

  return {
    isOpen,
    toggleList,
    setContainer
  };
}
