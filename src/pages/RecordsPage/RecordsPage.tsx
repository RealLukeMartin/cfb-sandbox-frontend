import { useParams } from 'react-router-dom';
import { RecordsTable } from '../../components/RecordsTable';
import { Flex } from 'antd';
import { config } from '../../config';
import { useEffect, useState } from 'react';
import { IRecord } from '../../@types/records';
import { WinPercentChart } from '../../components/WinPercentChart';

export function RecordsPage() {
  const { teamId } = useParams();

  const [recordsData, setRecordsData] = useState([{
    id: 0,
    teamId: 0,
    wins: 0,
    losses: 0,
    ties: 0,
    year: 0,
    games: 0,
    team: 'Loading...',
}] as IRecord[]);

  useEffect(() => {
    fetch(`${config.api.url}/records?teamId=${teamId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecordsData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [teamId]);
  return (
    <>
      <div>
        <Flex wrap="wrap" justify={'flex-start'} align={'flex-start'} gap={20}>
          <h2 className="team-details-header">{recordsData[0].team}</h2>
          <RecordsTable teamId={Number(teamId)} recordsData={recordsData} />
          <div className="chart-container win-percent-chart">
            <WinPercentChart recordsData={recordsData} />
          </div>
        </Flex>
      </div>
    </>
  );
}