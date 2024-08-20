import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

type Props = {
  ticker: string;
  name: string;
  price: number;
  change: number;
};

function StockCard({}: Props) {
  return <Card></Card>;
}

export default StockCard;
