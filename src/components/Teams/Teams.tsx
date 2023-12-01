import { useEffect, useState } from "react";
import { config } from "../../config";
import { ITeam } from "../../@types/teams";
import { TeamPagination } from "../Pagination";
import { Flex } from 'antd';

const boxStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = ['flex-start', 'center', 'flex-end'];

export function Teams(props: { page: number }) {
  const numberOfTeamsPerPage = 21;
  const [teamsData, setTeamsData] = useState({
    count: 0,
    teams: [
      {
        id: 0,
        name: "Loading...",
        city: "Loading...",
      }
    ] as ITeam[]
  });

  useEffect(() => {
    fetch(`${config.api.url}/teams?page=${props.page}&limit=${numberOfTeamsPerPage}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTeamsData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [props.page]);


  return (
    <div>
      <h2>Teams</h2>
      <Flex wrap="wrap" style={boxStyle} justify={justifyOptions[0]} align={alignOptions[0]} gap={20}>
        {
        teamsData && teamsData.teams.map((team: {
          id: number;
          name: string;
          city: string;
        }) => {
          return (
            <div className="team-box" key={team.id}>
              <h3>{team.name}</h3>
              <ul>
                <li>City: {team.city}</li>
              </ul>
            </div>
          )
        })
      }
      </Flex>
      {
        teamsData.count > 0 && teamsData.teams.length > 1 ? (
          <TeamPagination limit={numberOfTeamsPerPage} count={teamsData.count} />
        ) : (<p>Loading...</p>)
      },
    </div>
  );
}
