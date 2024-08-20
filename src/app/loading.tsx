import { Spinner } from "@/components/ui/spinner";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="h-full w-full">
      <Spinner color="secondary" size="lg" />
    </div>
  );
}

export default Loading;
