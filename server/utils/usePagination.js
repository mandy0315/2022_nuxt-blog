export default function ({ currPage = '1', perPage, articles }) {
  const total = articles.length;
  const pages = Math.ceil(total / perPage);

  if (currPage > pages) {
    currPage = pages;
  }

  const minItem = currPage * perPage - perPage + 1;
  const maxItem = currPage * perPage;
  let data = [];
  articles.forEach((item, i) => {
    const itemNum = i + 1;
    if (itemNum >= minItem && itemNum <= maxItem) {
      data.push(item);
    }
  });
  const pageInfo = {
    total,
    pages,
    size: perPage,
    current: currPage
  };

  return {
    data,
    pageInfo
  };
}
