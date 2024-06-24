"use client";
/* eslint-disable react/jsx-key */
import React, { useRef, useState } from "react";
import "./terminal.scss";
import Image from "next/image";

const facts = (
  <>
    <p className="text-indigo-500">Hello! I&apos;m Aurélie</p>
    <br />
    <p>Here&apos;s some facts about me:</p>
    <ul>
      <li className="text-purple-500">✅ Web Developer</li>
      <li className="text-red-500">✅ JavaScript Enthusiast</li>
      <li className="text-orange-500">✅ TypeScript Expert</li>
      <li className="text-yellow-500">✅ React Specialist</li>
      <li className="text-green-500">✅ User Interface Builder</li>
    </ul>
    <br />
  </>
);

const getCommandOptions = (string) => {
  const options = [];
  string.split(" ").forEach((st) => {
    if (st.includes("--")) {
      options.push(st.replace("--", ""));
    } else if (st.includes("-")) {
      st.replace("-", "")
        .split("")
        .forEach((s) => options.push(s));
    }
  });

  return options;
};

export const commands = {
  hello: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "Hello command", class: "font-bold text-indigo-500" },
        { text: "returns a greeting" },
        { text: "ex : hello [name]" },
        { text: "——————————" },
      ]);
    } else {
      setOutput([...output, { text: `Hello! ${input[0] || ""}` }]);
    }
  },
  help: ({ output, setOutput }) => {
    setOutput([
      ...output,
      { text: "Commands available:", class: "font-bold text-indigo-700" },
      { text: "——————————" },
      ...Object.keys(commands).map((key) => ({
        text: key,
      })),
      { text: "——————————" },
    ]);
  },
  echo: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "Echo command", class: "font-bold text-indigo-500" },
        { text: "Print what you write" },
        { text: "ex : echo [message]" },
        { text: "——————————" },
      ]);
    } else {
      setOutput([...output, { text: input.join(" ") }]);
    }
  },
  kill: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "Kill command", class: "font-bold text-indigo-500" },
        { text: "Try it or don't" },
        { text: "——————————" },
      ]);
    } else {
      setOutput([
        ...output,
        { text: "goodbye cruel world! 💀", class: "text-red-500" },
        <Image
          src={"https://media.giphy.com/media/uC8SQoaY5EHhC/giphy.gif"}
          width={500}
          height={210}
          alt="Good bye"
        />,
      ]);
    }
  },
  clear: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "Clear command", class: "font-bold text-indigo-500" },
        { text: "Delete all history" },
        { text: "——————————" },
      ]);
    } else {
      setOutput([]);
    }
  },
  facts: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "Facts command", class: "font-bold text-indigo-500" },
        { text: "Display intro again" },
        { text: "——————————" },
      ]);
    } else {
      setOutput([...output, facts]);
    }
  },
  ls: ({ input, output, setOutput, fileExist }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "ls command", class: "font-bold text-indigo-500" },
        { text: "Search for hidden file" },
        { text: "——————————" },
      ]);
    } else {
      const options = getCommandOptions(input.join(" "));

      const results = [];
      if (options.includes("a")) {
        results.push(".", "..", ".cv.txt");
      }
      if (fileExist) {
        results.push("file.txt");
      }

      return options.includes("l")
        ? setOutput([...output, ...results.map((re) => ({ text: re }))])
        : setOutput([...output, { text: results.join(" ") }]);
    }
  },
  cat: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      return setOutput([
        ...output,
        { text: "cat command", class: "font-bold text-indigo-500" },
        { text: "Try 'ls command' to find what to read" },
        { text: "——————————" },
      ]);
    }
    switch (input[0]) {
      case "file.txt":
        setOutput([
          ...output,
          { text: "Nothing interesting here, but..." },
          { text: "Am I the only file ?" },
        ]);
        break;
      case ".cv.txt":
        setOutput([
          ...output,
          { text: "You discovered my secret file :o" },
          <a
            target="_blank"
            className="underline"
            href="https://drive.google.com/file/d/1Z00O76uIwnNOX0ct7-2J3S1yGIPqpL3q/view?usp=sharing"
          >
            View my CV
          </a>,
        ]);
        break;
      default:
        setOutput([
          ...output,
          { text: `File not found: ${input[0]}`, class: "text-red-800" },
        ]);
    }
  },
  rm: ({ input, output, setOutput, setFileExist }) => {
    const options = getCommandOptions(input.join(" "));
    if (input[0] === "--help") {
      return setOutput([
        ...output,
        { text: "rm command", class: "font-bold text-indigo-500" },
        { text: "What can you do?" },
        { text: "——————————" },
      ]);
    }
    if (options.includes("r") && options.includes("f")) {
      return handleRmRf(setOutput);
    }
    switch (input[0]) {
      case "file.txt":
        setFileExist(false);
        setOutput([...output, { text: "File deleted successfully" }]);
        break;
      case "cv.txt":
        setOutput([
          ...output,
          {
            text: "Access Denied. You do not have the necessary permissions to delete this file.",
            class: "text-red-900",
          },
        ]);
        break;
      default:
        setOutput([
          ...output,
          { text: `File not found: ${input[0]}`, class: "text-red-800" },
        ]);
    }
  },
  ssh: ({ output, setOutput }) =>
    setOutput([
      ...output,
      {
        text: "ermmmm.... don't think you can ssh into css I'm afraid. I'm just a pretty terminal window made out of HTML",
      },
    ]),
  info: ({ input, output, setOutput }) => {
    if (input[0] === "--help") {
      setOutput([
        ...output,
        { text: "info command", class: "font-bold text-indigo-500" },
        { text: "Want to know more about the projet" },
        { text: "——————————" },
      ]);
    } else {
      setOutput([
        ...output,
        { text: "——————————" },
        <h3 className="subtitle">Version 1.0.0</h3>,
        {
          text: "This little terminal window I built in a few hours (at 2am like a true programmer)",
          class: "text-red-500",
        },
        <p className="text-orange-500">
          Was pretty fun! I published the code of the terminal design and input,{" "}
          <a
            target="_blank"
            className="underline"
            href="https://github.com/souvir/portfolio"
          >
            Click here
          </a>{" "}
          to check out the repo if you want!
        </p>,
        <p className="text-yellow-500">
          To find out more about me,{" "}
          <a href="#about" className="underline">
            Click here
          </a>
        </p>,
        <p className="text-green-500">
          To view my current projects and work{" "}
          <a href="#projects" className="underline">
            Click here
          </a>
        </p>,
        <p className="text-blue-500">
          To get in contact{" "}
          <a href="#contact" className="underline">
            Click here
          </a>
        </p>,
        { text: "——————————" },
      ]);
    }
  },
  contact: ({ output, setOutput }) => {
    setOutput([
      ...output,
      {
        text: "Hey, I just met you",
      },
      {
        text: "And this is crazy",
      },
      {
        text: "But here's my number: +33601775288",
        class: "text-pink-500",
      },
      {
        text: "So call me, maybe",
      },
    ]);
  },
};

const handleRmRf = (setOutput, count = 0) => {
  const message =
    count === 0
      ? "Are you sure you want to leave this portfolio?"
      : `Are you ${"really ".repeat(count - 1)}sure?`;

  const userConfirmed = window.confirm(message);

  if (userConfirmed) {
    handleRmRf(setOutput, count + 1);
  } else {
    goodChoice(setOutput);
  }
};

const goodChoice = (setOutput) => {
  setOutput([
    {
      text: "Good Choice ! Let's start again",
      class: "font-bold text-pink-500",
    },
    { text: "——————————" },
  ]);
};

const isJsxElement = (value) => value.hasOwnProperty("type");

export const Terminal = () => {
  const [input, setInput] = useState("");
  const [fileExist, setFileExist] = useState(true);
  const [output, setOutput] = useState([
    facts,
    <p className="text-pink-500">
      Type &apos;help&apos; into the terminal window and hit enter to see all
      commands
    </p>,
    <br />,
  ]);
  const [commandExists, setCommandExists] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null); // Add state to track the current position in the history

  const inputElement = useRef();

  const runCommand = ({ input }) => {
    if (input === "") {
      setOutput([...output, { text: "" }]);
    }

    const inputs = input.toLowerCase().split(" ");
    if (!inputs[0] || !Object.keys(commands).includes(inputs[0])) {
      if (!input[0] || input[0] === "") {
        setOutput([...output, { text: `❯ ${input}`, class: "text-green-500" }]);
        return;
      }

      setOutput([
        ...output,
        { text: `command: "${inputs[0]}" not found`, class: "text-red-800" },
      ]);
      return;
    }

    output.push({ text: `❯ ${input}`, class: "text-green-500" });

    commands[inputs.shift()]({
      input: inputs,
      setOutput,
      output,
      fileExist,
      setFileExist,
    });
  };

  return (
    <div id="terminal" className="font-mono">
      <div
        className="terminal-body"
        onClick={() => {
          inputElement.current.focus();
        }}
      >
        {output.map((line, index) =>
          isJsxElement(line) ? (
            <div key={`output-line-${index}`}>{line}</div>
          ) : (
            <p
              key={`${line}-${index}`}
              className={line.class || "text-indigo-700"}
            >
              {line.text}
            </p>
          )
        )}
        <br />
        <div className="terminal-control">
          <form
            className="terminal-input"
            onSubmit={(event) => {
              event.preventDefault();
              setTerminalHistory([...terminalHistory, input]);
              runCommand({ input });
              setInput("");
              setHistoryIndex(null); // Reset history index on new command
            }}
          >
            <div className="field">
              <label className="label text-indigo-700">~</label>

              <div className="control has-icons-left">
                <span className="icon is-left text-pink-500">❯</span>
                <input
                  className={`input text-indigo-500 ${
                    commandExists ? " command-exists" : ""
                  }`}
                  name=""
                  autoCorrect="off"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(event) => {
                    const input = event.target.value;
                    const command = input.split(" ").shift();
                    setCommandExists(Object.keys(commands).includes(command));
                    setInput(input);
                  }}
                  value={input}
                  ref={inputElement}
                  onKeyUp={(event) => {
                    if (event.key === "ArrowUp") {
                      if (historyIndex === null && terminalHistory.length > 0) {
                        setHistoryIndex(terminalHistory.length - 1);
                        setInput(terminalHistory[terminalHistory.length - 1]);
                      } else if (historyIndex > 0) {
                        setHistoryIndex(historyIndex - 1);
                        setInput(terminalHistory[historyIndex - 1]);
                      }
                    } else if (event.key === "ArrowDown") {
                      if (historyIndex !== null) {
                        if (historyIndex < terminalHistory.length - 1) {
                          setHistoryIndex(historyIndex + 1);
                          setInput(terminalHistory[historyIndex + 1]);
                        } else {
                          setHistoryIndex(null);
                          setInput("");
                        }
                      }
                    }
                  }}
                />
                <span
                  className="cursor bg-indigo-700"
                  style={{ left: `${input.length * 10 + 15}px` }}
                ></span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <nav className="terminal-bar bg-[#0d1224] border-t-[1px] border-indigo-900">
        <div className="screen  text-indigo-700">0</div>
        <div className="bar bg-[#0A0D37]  text-indigo-700">zsh</div>
        <div className="battery  text-indigo-700">&hearts; 100%</div>
        <div className="name  text-indigo-700">@souvir</div>
      </nav>
    </div>
  );
};
