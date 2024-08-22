"use client";

import { APIData, TimeSeries } from "@/lib/types";
import React, { useMemo, useState } from "react";
import Modal from "./modal";
import { Input } from "./input";

type Props = {
  data: APIData;
};

function BarChart({ data }: Props) {
  const [dataPoints, setDataPoints] = useState(25);
  const [inputValue, setInputValue] = useState(dataPoints.toString());
  const [open, setOpen] = useState(false);
  const [tempData, setTempData] = useState(data);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleUpdateDataPoints = () => {
    const newDataPoints = parseInt(inputValue, 10);
    if (!isNaN(newDataPoints) && newDataPoints > 0) {
      setDataPoints(newDataPoints);
    }
    setOpen(false);
    setTempData(data);
  };

  const prepareData = (data: TimeSeries[]) => {
    return data.map((d) => ({
      time: new Date(d.time),
      volume: d.data.volume,
    }));
  };

  const preparedData = useMemo(
    () => prepareData(tempData.timeSeries.slice(0, dataPoints)).reverse(),
    [tempData, dataPoints]
  );

  function handleClickBar(index: number) {
    const spliced = tempData.timeSeries;
    spliced.splice(index, 1);
    let newData = {
      ...tempData,
      timeSeries: spliced,
    };
    setTempData(newData);
  }

  return (
    <div>
      <button
        className="border-2 border-gray-200 p-4 rounded-lg"
        onClick={() => setOpen(true)}
      >
        Data Points: {dataPoints}
      </button>
      <ChartDisplay data={preparedData} handleDelete={handleClickBar} />
      <Modal isOpen={open} onClose={handleClose} width="m">
        <div>
          <Input
            autoFocus
            className="m-2"
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min={1}
            max={5000}
          />
          <button onClick={handleUpdateDataPoints}>Update</button>
        </div>
      </Modal>
    </div>
  );
}

export default BarChart;

interface DataPoint {
  time: Date;
  volume: number;
}

interface BarChartProps {
  data: DataPoint[];
  handleDelete: (index: number) => void;
}

function ChartDisplay({ data, handleDelete }: BarChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const margin = 60;
  const width = 1000;
  const height = 600;
  const defaultBarWidth = 10;
  const hoverBarWidth = 20;
  const length = data.length < 25 ? data.length : 25;
  const xScale = (width - margin * 2) / length;
  const overFlowWidth = xScale * data.length;
  const maxHigh = Math.max(...data.map((d) => d.volume));

  const numTicks = 10;
  const tickSpacing = (height - margin * 2) / (numTicks - 1);

  const showHorizontalScroll = data.length > 50;

  function formatNumber(num: number): string {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + "K";
    } else {
      return num.toString();
    }
  }

  return (
    <div
      style={{
        overflowX: showHorizontalScroll ? "scroll" : "hidden",
        maxWidth: "80vw",
      }}
    >
      <svg width={overFlowWidth} height={height}>
        {/* X Axis */}
        <line
          x1={margin}
          y1={height - margin}
          x2={overFlowWidth}
          y2={height - margin}
          stroke="black"
        />
        <text
          x={width / 2}
          y={height - margin + 40}
          textAnchor="end"
          fontSize="15"
          fill="black"
        >
          Time
        </text>

        {/* Y Axis */}
        <line
          x1={margin}
          y1={margin}
          x2={margin}
          y2={height - margin}
          stroke="black"
        />

        <text x={150} y={25} textAnchor="end" fontSize="15" fill="black">
          Volume (Trades)
        </text>

        {/* Y Axis Labels */}
        {Array.from({ length: numTicks }).map((_, i) => {
          const yValue = (i * maxHigh) / (numTicks - 1);
          const y = height - margin - i * tickSpacing; // Adjust y position

          return (
            <g key={i}>
              <line
                x1={margin}
                y1={y}
                x2={overFlowWidth}
                y2={y}
                stroke="gray"
                strokeDasharray="4 4"
              />
              <text
                x={margin - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="black"
              >
                {formatNumber(yValue)}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((point, index) => {
          const barHeight = (point.volume / maxHigh) * (height - margin * 2);
          const x = margin + index * xScale;
          const y = height - margin - barHeight;
          const formattedDate = point.time.toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const isHovered = index === hoverIndex;
          const barWidth = isHovered ? hoverBarWidth : defaultBarWidth;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="gray"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (data.length > 1000) {
                    handleDelete(index);
                  }
                }}
              />
              <text
                x={x + barWidth / 2}
                y={height - margin + 15}
                textAnchor="middle"
                fontSize="8"
                fill="black"
              >
                {formattedDate}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
