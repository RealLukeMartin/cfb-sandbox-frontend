import { useMemo } from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from 'victory';
import { IRecord } from '../../@types/records';

const StyledPoint = styled.circle`
fill: ${(props) => props.color};
`;

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

const ScatterPoint = ({ x, y, datum, min, max }: {
  x?: string | undefined;
  y?: number | undefined;
  datum?: {
    y: number;
  } | undefined;
  min: number;
  max: number;
}) => {
  const i = useMemo(() => {
    return Math.floor(((datum!.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);

  return <StyledPoint color={colors[i]} cx={x} cy={y} r={6} />;
};

export function WinPercentChart(props: {recordsData: IRecord[]}) {
  const data = props.recordsData.map((record) => {
    return {
      x: (record.year).toString(),
      y: record.wins / record.games,
    }
  });

  const years = data.map(({ y }) => y);
  const min = Math.min(...years);
  const max = Math.max(...years);

  return (
    <VictoryChart
      style={{
        background: { fill: "#fff" }  
      }}
    >
      <VictoryLine data={data} />
      <VictoryScatter
        data={data}
        dataComponent={<ScatterPoint min={min} max={max} />}
      />
    {/* <VictoryAxis dependentAxis
      tickValues={[0.2, 0.4, 0.6, 0.8, 1.0]}
    />
    <VictoryAxis
      scale="time"
      tickValues={data.map(({ x }) => {
        const yearRemainder = Number(x) % 10;
        if (yearRemainder !== 0) {
          return;
        }
        return x
      })}
      /> */}
    </VictoryChart>
  );
}