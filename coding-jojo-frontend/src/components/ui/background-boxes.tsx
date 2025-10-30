"use client";"use client";

import React from "react";import React from "react";

import { motion } from "framer-motion";import { motion } from "framer-motion";

import { cn } from "../../lib/utils";import { cn } from "../../lib/utils";



export const Boxes = ({ className, ...rest }: { className?: string }) => {export const BoxesCore = ({ className, ...rest }: { className?: string }) => {

  const rows = new Array(150).fill(1);  const rows = new Array(150).fill(1);

  const cols = new Array(100).fill(1);  const cols = new Array(100).fill(1);

  let colors = [  let colors = [

    "--sky-300: 125 211 252",    "#dbeafe",

    "--pink-300: 249 168 212",    "#bfdbfe", 

    "--blue-300: 134 239 172",    "#93c5fd",

    "--yellow-300: 253 224 71",    "#60a5fa",

    "--red-300: 252 165 165",    "#3b82f6",

    "--purple-300: 196 181 253",    "#2563eb",

    "--blue-300: 147 197 253",    "#1d4ed8",

    "--indigo-300: 165 180 252",    "#1e40af",

    "--violet-300: 196 181 253",    "#1e3a8a",

  ];  ];

  const getRandomColor = () => {  const getRandomColor = () => {

    return colors[Math.floor(Math.random() * colors.length)];    return colors[Math.floor(Math.random() * colors.length)];

  };  };



  return (  return (

    <div    <div

      style={{      style={{

        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,

      }}      }}

      className={cn(      className={cn(

        "absolute left-1/4 p-4 -top-10 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",

        className        className,

      )}      )}

      {...rest}      {...rest}

    >    >

      {rows.map((_, i) => (      {rows.map((_, i) => (

        <motion.div        <motion.div

          key={`row` + i}          key={`row` + i}

          className="w-16 h-8  border-l  border-slate-700 relative"          className="relative h-8 w-16 border-l border-blue-300/50"

        >        >

          {cols.map((_, j) => (          {cols.map((_, j) => (

            <motion.div            <motion.div

              whileHover={{              whileHover={{

                backgroundColor: `var(${getRandomColor()})`,                backgroundColor: `${getRandomColor()}`,

                transition: { duration: 0 },                transition: { duration: 0 },

              }}              }}

              animate={{              animate={{

                transition: { duration: 2 },                transition: { duration: 2 },

              }}              }}

              key={`col` + j}              key={`col` + j}

              className="w-16 h-8  border-r border-t border-slate-700 relative"              className="relative h-8 w-16 border-t border-r border-blue-300/50"

            >            >

              {j % 2 === 0 && i % 2 === 0 ? (              {j % 2 === 0 && i % 2 === 0 ? (

                <svg                <svg

                  xmlns="http://www.w3.org/2000/svg"                  xmlns="http://www.w3.org/2000/svg"

                  fill="none"                  fill="none"

                  viewBox="0 0 24 24"                  viewBox="0 0 24 24"

                  strokeWidth="1.5"                  strokeWidth="1.5"

                  stroke="currentColor"                  stroke="currentColor"

                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-blue-400/70"

                >                >

                  <path                  <path

                    strokeLinecap="round"                    strokeLinecap="round"

                    strokeLinejoin="round"                    strokeLinejoin="round"

                    d="M12 6v12m6-6H6"                    d="M12 6v12m6-6H6"

                  />                  />

                </svg>                </svg>

              ) : null}              ) : null}

            </motion.div>            </motion.div>

          ))}          ))}

        </motion.div>        </motion.div>

      ))}      ))}

    </div>    </div>

  );  );

};};

export const Boxes = React.memo(BoxesCore);
