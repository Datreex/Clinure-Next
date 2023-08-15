"use client";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/joy";

export default function Chatbot() {
  const [state, setState] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setState((prev) => [...prev, messages[Math.floor(Math.random() * 30)]]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      // className={
      //   "absolute bottom-0 left-0 right-0 h-[80%] flex flex-col justify-between z-10"
      // }
      className={
        "w-full h-full overflow-hidden flex flex-col justify-between gap-1"
      }
    >
      <div className="w-full grow-0 overflow-y-scroll cleanScrollbar flex-col items-start flex gap-2">
        {
          // @ts-ignore
          state.map((message, index) => (
            <TestComponent
              key={message + index}
              message={message}
              user={index % 2 === 0}
            />
          ))
        }
        <div
          style={{
            overflowAnchor: "auto",
          }}
          className={"text-neutral-400 text-xs font-normal leading-[27px]"}
        >
          <span className="text-neutral-400 text-xs font-normal underline leading-[27px]">
            Datreex Clinure Jan 9 Version
          </span>
          . Free Research Preview.
        </div>
      </div>
      <div className="w-full bg-white rounded-[9px] border border-blue-400 justify-between items-center gap-2.5 py-2 px-3 flex">
        <div className="text-neutral-400 text-[13px] font-bold">
          Write your message
        </div>
        <IconButton onClick={() => setPaused((prev) => !prev)}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

const TestComponent = ({
  message,
  user,
}: {
  message: string;
  user?: boolean;
}) => {
  if (user)
    return (
      <div
        className={"w-full flex flex-row justify-end"}
        style={{
          overflowAnchor: "none",
        }}
      >
        <div className="w-[237px] p-3 bg-blue-400 rounded-tl-[25px] rounded-bl-[25px] rounded-br-[25px] justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-[13px] font-bold">{message}</div>
        </div>
      </div>
    );
  return (
    <div
      className={"w-full flex flex-row justify-start"}
      style={{
        overflowAnchor: "none",
      }}
    >
      <div className="w-[252px] p-3 bg-zinc-100 rounded-tl-[25px] rounded-tr-[25px] rounded-br-[25px] justify-center items-center gap-2.5 inline-flex">
        <div className="w-[226px] text-stone-500 text-[13px] font-normal">
          {message}
        </div>
      </div>
    </div>
  );
};

const messages = [
  "I wondered why the baseball was getting bigger. Then it hit me.",
  "Police were called to a day care, where a three-year-old was resisting a rest.",
  "Did you hear about the guy whose whole left side was cut off? He’s all right now.",
  "The roundest knight at King Arthur’s round table was Sir Cumference.",
  "To write with a broken pencil is pointless.",
  "When fish are in schools they sometimes take debate.",
  "The short fortune teller who escaped from prison was a small medium at large.",
  "A thief who stole a calendar… got twelve months.",
  "A thief fell and broke his leg in wet cement. He became a hardened criminal.",
  "Thieves who steal corn from a garden could be charged with stalking.",
  "When the smog lifts in Los Angeles , U. C. L. A.",
  "The math professor went crazy with the blackboard. He did a number on it.",
  "The professor discovered that his theory of earthquakes was on shaky ground.",
  "The dead batteries were given out free of charge.",
  "If you take a laptop computer for a run you could jog your memory.",
  "A dentist and a manicurist fought tooth and nail.",
  "A bicycle can’t stand alone; it is two tired.",
  "A will is a dead giveaway.",
  "Time flies like an arrow; fruit flies like a banana.",
  "A backward poet writes inverse.",
  "In a democracy it’s your vote that counts; in feudalism, it’s your Count that votes.",
  "A chicken crossing the road: poultry in motion.",
  "If you don’t pay your exorcist you can get repossessed.",
  "With her marriage she got a new name and a dress.",
  "Show me a piano falling down a mine shaft and I’ll show you A-flat miner.",
  "When a clock is hungry it goes back four seconds.",
  "The guy who fell onto an upholstery machine was fully recovered.",
  "A grenade fell onto a kitchen floor in France and resulted in Linoleum Blownapart.",
  "You are stuck with your debt if you can’t budge it.",
  "Local Area Network in Australia : The LAN down under.",
  "He broke into song because he couldn’t find the key.",
  "A calendar’s days are numbered.",
];

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18.0703 8.51001L9.51026 4.23001C3.76026 1.35001 1.40026 3.71001 4.28026 9.46001L5.15026 11.2C5.40026 11.71 5.40026 12.3 5.15026 12.81L4.28026 14.54C1.40026 20.29 3.75026 22.65 9.51026 19.77L18.0703 15.49C21.9103 13.57 21.9103 10.43 18.0703 8.51001ZM14.8403 12.75H9.44026C9.03026 12.75 8.69026 12.41 8.69026 12C8.69026 11.59 9.03026 11.25 9.44026 11.25H14.8403C15.2503 11.25 15.5903 11.59 15.5903 12C15.5903 12.41 15.2503 12.75 14.8403 12.75Z"
      fill="#6393F2"
    />
  </svg>
);
