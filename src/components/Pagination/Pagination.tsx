import { useState } from "react";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';

export function TeamPagination(props: { limit: number, count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const theCurrentPage = searchParams.get('page') ? Number(searchParams.get('page')) + 1 : 1;
  const [current, setCurrent] = useState(theCurrentPage);

  const { limit, count } = props;
  const paginationNumbers: number[] = [];
  for (let i = 0; i < Math.ceil(count / limit); i++) {
    paginationNumbers.push(i);
  }

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setSearchParams({page: (page - 1).toString()}) 
    setCurrent(page);
  };

  console.log('paginationNumbers', paginationNumbers);
  return <Pagination 
    defaultCurrent={0}
    current={current}
    onChange={onChange}
    pageSize={limit}
    total={count}
    showSizeChanger={false}
  />;
}