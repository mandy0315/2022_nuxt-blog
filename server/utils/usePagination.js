export default function ({ currPage = 1, perPage, articles }) {
  const total = articles.length;
  const pages = Math.ceil(total / perPage);
  const pageInfo = {
    total,
    pages,
    size: perPage,
    current: currPage
  };

  if (currPage > pages) {
    return {
      data: []
    };
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

  return {
    data,
    pageInfo
  };
}
