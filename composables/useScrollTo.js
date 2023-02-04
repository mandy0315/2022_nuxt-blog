export default function () {
  const scrollToSection = ({ toSection, marginTop = 0 }) => {
    //toSection: 到的位置 ; marginTop: 到的位置往上位移
    const position = toSection.offsetTop - marginTop;
    console.log('position', position);

    position &&
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
  };

  return { scrollToSection };
}
