import React from "react";

type Props = {};

function Docs({}: Props) {
  return (
    <div>
      <p>Select a stock to view price and volume insights.</p>

      <p>
        Deployed app:{" "}
        <a href="https://stock-ticker-takehome.vercel.app/">
          https://stock-ticker-takehome.vercel.app/
        </a>
      </p>

      <p>To run locally:</p>
      <ul>
        <li>Clone the repository</li>
        <li>
          Get a free API key from:{" "}
          <a href="https://www.alphavantage.co/support/#api-key">
            https://www.alphavantage.co/support/#api-key
          </a>
        </li>
        <li>
          Rename <code>sample.env.local</code> to <code>.env.local</code> and
          enter your API key
        </li>
        <li>
          <code>npm run dev</code> to run in dev mode, or run{" "}
          <code>npm run build</code> - <code>npm run start</code> to run in
          production mode
        </li>
      </ul>
    </div>
  );
}

export default Docs;
