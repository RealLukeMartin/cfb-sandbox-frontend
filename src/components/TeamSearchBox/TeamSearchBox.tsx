import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const { Search } = Input;



export function TeamSearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const theCurrentTeamSearch = searchParams.get('teamSearch') ? searchParams.get('teamSearch') : '';
  const [, setTeamSearch] = useState(theCurrentTeamSearch || '');

  const onSearch: SearchProps['onSearch'] = (value: string) => {
    console.log(value);
    setSearchParams({teamSearch: value});
    setTeamSearch(value);

  };

  return (
    <div>

      <Search
        placeholder="Search for a team"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
}