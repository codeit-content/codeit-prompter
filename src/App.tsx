import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Button from './Button';

interface Config {
  fontSize: number;
  speed: number;
  scale: [number, number];
}

const STORAGE_KEY = {
  text: 'codeit-prompter:text',
  config: 'codeit-prompter:config',
};
const OFFSET_Y = 20;

const restoreData = () => {
  const text = localStorage.getItem(STORAGE_KEY.text);
  const rawConfig = localStorage.getItem(STORAGE_KEY.config);
  let config: Config | null = null;
  if (rawConfig) {
    config = JSON.parse(rawConfig);
  }
  return { text, config };
};

const storeData = (text: string, config: Config) => {
  localStorage.setItem(STORAGE_KEY.text, text);
  localStorage.setItem(STORAGE_KEY.config, JSON.stringify(config));
};

const restoredData = restoreData();

function App() {
  const [text, setText] = useState(restoredData.text ?? '');
  const [config, setConfig] = useState<Config>(
    restoredData.config ?? {
      fontSize: 20,
      speed: 5,
      scale: [1, 1],
    }
  );
  const [isRunning, setIsRunning] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleStoreData = useCallback(
    () => storeData(text, config),
    [text, config]
  );

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (isRunning && textArea) {
      const dy = 200 / config.speed;
      const timer = setInterval(() => {
        if (
          textArea.scrollTop + textArea.clientHeight >=
          textArea.scrollHeight - OFFSET_Y
        ) {
          setIsRunning(false);
        }
        textArea.scrollBy(0, 1);
      }, dy);

      return () => clearInterval(timer);
    }
  }, [isRunning, config.speed]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleStoreData);
    return () => window.removeEventListener('beforeunload', handleStoreData);
  }, [handleStoreData]);

  return (
    <div className="bg-neutral-950 h-full p-8 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button className="mx-1 my-2" onClick={() => setIsRunning((v) => !v)}>
            {isRunning ? (
              <Icon name="pause" className="size-8 text-neutral-300" />
            ) : (
              <Icon name="play" className="size-8 text-neutral-300" />
            )}
          </Button>
          <Button
            className="mx-1 my-2"
            onClick={() =>
              setConfig((c) => ({ ...c, scale: [-c.scale[0], c.scale[1]] }))
            }
          >
            <Icon
              name="flip-x"
              className="size-8 text-neutral-300"
              style={{
                transform: `scaleX(${config.scale[0]})`,
              }}
            />
          </Button>
          <Button
            className="mx-1 my-2"
            onClick={() =>
              setConfig((c) => ({ ...c, scale: [c.scale[0], -c.scale[1]] }))
            }
          >
            <Icon
              name="flip-y"
              className="size-8 text-neutral-300"
              style={{
                transform: `scaleY(${config.scale[1]})`,
              }}
            />
          </Button>
          <input
            type="range"
            className="text-neutral-50 p-1 border-solid border-2 border-white rounded m-1"
            max={10}
            min={1}
            value={config.speed}
            onChange={(e) =>
              setConfig((c) => ({ ...c, speed: parseInt(e.target.value) }))
            }
          />
          <Icon name="font-size" className="size-8 text-neutral-200" />
          <input
            type="range"
            className="text-neutral-50 p-1 border-solid border-2 border-white rounded m-1"
            max={100}
            min={20}
            value={config.fontSize}
            onChange={(e) =>
              setConfig((c) => ({ ...c, fontSize: parseInt(e.target.value) }))
            }
          />
        </div>
        <a href="https://codeit.kr">
          <Icon name="logo" className="size-8" />
        </a>
      </div>
      <textarea
        className="bg-neutral-900 flex-auto p-2 text-white rounded m-1 outline-none"
        style={{
          fontSize: `${config.fontSize}px`,
          transform: `scale(${config.scale[0]}, ${config.scale[1]})`,
        }}
        value={text}
        onChange={handleChange}
        ref={textAreaRef}
      />
      <p className="text-neutral-700 text-xs text-right">
        Icon: CC BY-SA 4.0 Attribution:{' '}
        <a href="https://developer.microsoft.com/en-us/fluentui">
          Microsoft Fluent
        </a>
      </p>
    </div>
  );
}

export default App;
