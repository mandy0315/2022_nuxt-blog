export default function () {
  const firstWordToUpperCase = str => {
    if (str) {
      return str.replace(str[0], str[0].toUpperCase());
    } else {
      return '';
    }
  };
  return {
    firstWordToUpperCase
  };
}
