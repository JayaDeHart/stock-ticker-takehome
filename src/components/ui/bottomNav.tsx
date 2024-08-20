import Link from "next/link";
import React from "react";

type Props = {};

function BottomNav({}: Props) {
  return (
    <div className="absolute bottom-0 left 0 w-full p-2 bg-gray-200">
      <div className="max-w-screen-lg mx-auto px-4 py-2 flex justify-around items-center">
        <div>Built by Jaya DeHart</div>
        <a
          className="underline underline-offset-2"
          href="https://www.github.com/JayaDeHart"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="underline underline-offset-2"
          href="https://www.linkedin.com/in/jaya-dehart"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default BottomNav;
