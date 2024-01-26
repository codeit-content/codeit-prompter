import { useEffect, useRef, useState } from "react";

const OFFSET_Y = 20;

function App() {
  const [speed, setSpeed] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (isRunning && textarea) {
      const dy = 200 / speed;
      const timer = setInterval(() => {
        if (
          textarea.scrollTop + textarea.clientHeight >=
          textarea.scrollHeight - OFFSET_Y
        ) {
          setIsRunning(false);
        }
        textarea.scrollBy(0, 1);
      }, dy);

      return () => clearInterval(timer);
    }
  }, [isRunning, speed]);

  return (
    <div className="bg-neutral-950 h-full p-8 flex flex-col">
      <div>
        <button
          className="text-neutral-50 p-1 border-solid border-2 border-white rounded m-1"
          onClick={() => setIsRunning((v) => !v)}
        >
          play
        </button>
        <button
          className="text-neutral-50 p-1 border-solid border-2 border-white rounded m-1"
          onClick={() => setIsFlipped((v) => !v)}
        >
          flip x
        </button>
        <button className="text-neutral-50 p-1 border-solid border-2 border-white rounded m-1">
          flip y
        </button>
        <input
          type="range"
          className="text-neutral-50 p-1 border-solid border-2 border-white rounded m-1"
          max={10}
          min={1}
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
        />
      </div>
      <textarea
        className="bg-neutral-900 flex-auto p-2 outline-none text-white"
        style={{
          transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
        }}
        ref={textareaRef}
      />
    </div>
  );
}

export default App;
