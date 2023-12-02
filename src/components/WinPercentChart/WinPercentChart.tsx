import { useMemo } from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { IRecord } from '../../@types/records';

const StyledPoint = styled.circle`
fill: ${(props) => props.color};
stroke: ${'#000'};
`;

const colors = ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"];

const ScatterPoint = ({ x, y, datum, min, max }: {
  x?: string;
  y?: number;
  datum?: {
    y: number;
  };
  min: number;
  max: number;
}) => {
  const i = useMemo(() => {
    return Math.floor(((datum!.y - min) / (max - min)) * (colors.length - 1));
  }, [datum, min, max]);

  return <StyledPoint color={colors[i]} cx={x} cy={y} r={3.5} />;
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
      containerComponent={<VictoryVoronoiContainer />}
    >
      <VictoryLabel x={160} y={10}
        text="Win Rate by Year"
        style={{ fontSize: 16, fontWeight: "lighter", textDecoration: "underline" }}
      />
      <VictoryLine data={data} />
      <VictoryScatter
        labelComponent={
          <VictoryTooltip 
            pointerLength={5}
            cornerRadius={5}
            flyoutPadding={{top: 15, bottom: 0, left: 10, right: 10}}
            flyoutHeight={40} 
          />
        }
        labels={({ datum }: {
          datum: {
            y: number;
            x: string;
          }
        }) => {

          return `
          Year: ${datum.x} \n
          Win Rate: ${Number(datum.y).toFixed(3)}
          `
        }}
        data={data}
        dataComponent={<ScatterPoint min={min} max={max} />}
      />
    <VictoryAxis dependentAxis />
    <VictoryAxis
      scale="time"
      tickValues={data.map(({ x }) => x)}
      tickFormat={(x) => {
        if (x % 20 === 0) {
          return x;
        }

        return ' ';
      }}
      />
    </VictoryChart>
  );
}