import { IRecord } from "../../@types/records";
import { Table } from 'antd';

export function RecordsTable(props: { teamId: number, recordsData: IRecord[] }) {
  const dataSource = props.recordsData.map((record) => {
    return {
      key: record.id,
      year: record.year,
      wins: record.wins,
      losses: record.losses,
      ties: record.ties,
      team: record.team,
      games: record.games,
    }
  });

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Games',
      dataIndex: 'games',
      key: 'games',
    },
    {
      title: 'Wins',
      dataIndex: 'wins',
      key: 'wins',
    },
    {
      title: 'Losses',
      dataIndex: 'losses',
      key: 'losses',
    },
  ]

  return (
    <div className="records-table">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}