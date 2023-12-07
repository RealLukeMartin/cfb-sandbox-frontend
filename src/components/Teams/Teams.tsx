import { useEffect, useState } from "react";
import { config } from "../../config";
import { ITeam } from "../../@types/teams";
import { TeamPagination } from "../Pagination";
import { Flex } from 'antd';
import { Link } from 'react-router-dom';


const boxStyle: React.CSSProperties = {
  width: '100%',
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

export function Teams(props: { page: number, teamSearch: string }) {
  const numberOfTeamsPerPage = 21;
  const [teamsData, setTeamsData] = useState({
    count: 0,
    teams: [
      {
        id: 0,
        name: "Loading...",
        city: "Loading...",
        conference: "Loading...",
        state: "Loading...",
        logos: ['https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBmb290YmFsbHxlbnwwfHwwfHx8MA%3D%3D'],
      }
    ] as ITeam[]
  });

  useEffect(() => {
    fetch(`${config.api.url}/teams?page=${props.page}&limit=${numberOfTeamsPerPage}&team=${props.teamSearch}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTeamsData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [props.page, props.teamSearch]);


  return (
    <div>
      <Flex wrap="wrap" style={boxStyle} justify={justifyOptions[1]} align={alignOptions[1]} gap={20}>

            {
            teamsData && teamsData.teams.map((team: ITeam) => {
              return (
                  <div className="team-box" key={team.id}>
                    <Link className="team-link-box" to={`records/${team.id}`}>
                      <h3>{team.name}</h3>
                      <img src={team.logos[0]} alt={`${team.name} Logo`} className='thumbnailTeamLogo' />
                      <ul className='miniTeamDetails'>
                        <li>{team.conference}</li>
                        <li>{team.city}, {team.state}</li>
                      </ul>
                    </Link>
                  </div>
              )
            })
          }
      </Flex>
      <Flex className="pagination-container" wrap="wrap" style={boxStyle} justify={justifyOptions[1]} align={alignOptions[1]} gap={20}>
        {
          teamsData.count > 0 && teamsData.teams.length > 1 ? (
            <TeamPagination limit={numberOfTeamsPerPage} count={teamsData.count} />
          ) : (<p>Loading...</p>)
        },
      </Flex>
    </div>
  );
}
