"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APIData } from "@/lib/types";

import React from "react";
import { useState, useMemo } from "react";
import Modal from "./modal";
import BarChart from "./barChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  data: APIData;
};

function StockCard({ data }: Props) {
  const [open, setOpen] = useState(false);
  console.log(data);

  const handleClose = () => {
    setOpen(false);
  };

  const change = useMemo(
    () =>
      (data.timeSeries[0].data.close - data.timeSeries[1].data.close).toFixed(
        2
      ),
    [data.timeSeries]
  );

  const delta = useMemo(() => parseFloat(change) > 0, [change]);

  return (
    <div onClick={() => setOpen(true)}>
      <Card className="hover:cursor-pointer hover:bg-gray-100">
        <CardHeader>
          <CardTitle>{data.metaData.symbol}</CardTitle>
          <CardContent
            className={`${delta ? "text-green-700" : "text-red-700"}`}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span>{delta ? "+" : "-"}$</span>
                  <span>{change}</span>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Change in price in the last {data.metaData.interval}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </CardHeader>
      </Card>
      <Modal isOpen={open} onClose={handleClose} width="6xl">
        <BarChart data={data} />
      </Modal>
    </div>
  );
}

export default StockCard;
