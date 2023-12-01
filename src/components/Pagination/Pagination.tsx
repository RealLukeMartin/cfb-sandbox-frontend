export function TeamPagination(props: { limit: number, count: number }) {
  const { limit, count } = props;
  console.log('limit', limit);
  const paginationNumbers: number[] = [];
  for (let i = 0; i < Math.ceil(count / limit); i++) {
    console.log('adding number', i);
    paginationNumbers.push(i);
  }
  console.log('paginationNumbers', paginationNumbers);
  return (
    <>
      <div className="pagintation-container">
        <ul className="pagination">
          {
            paginationNumbers.map((number) => {
              return (
                <li key={number} className="page-item">
                  <a href={`?page=${number}`} className="page-link">
                    {number + 1}
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </>
  );
}