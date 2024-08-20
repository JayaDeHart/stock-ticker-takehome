"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { APIData } from "@/lib/types";

import React from "react";
import { useState } from "react";
import Modal from "./modal";
import BarChart from "./barChart";

type Props = {
  data: APIData;
};

function StockCard({ data }: Props) {
  const [open, setOpen] = useState(false);
  console.log(data.timeSeries);

  const handleClose = () => {
    setOpen(false);
  };

  const change = (
    data.timeSeries[0].data.close - data.timeSeries[1].data.close
  ).toFixed(2);

  return (
    <div onClick={() => setOpen(true)}>
      <Card className="hover:cursor-pointer hover:bg-gray-100">
        <CardHeader>
          <CardTitle>{data.metaData.symbol}</CardTitle>
          <CardContent>${change}</CardContent>
        </CardHeader>
      </Card>
      <Modal isOpen={open} onClose={handleClose} width="6xl">
        <BarChart data={data} />
      </Modal>
    </div>
  );
}

export default StockCard;
