#!/usr/bin/env node

import ollama from "ollama";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";


async function main() {
  const rl = createInterface({ input, output });

  while (true) {
    const userInput = await rl.question("-> ");
    if (userInput.toLowerCase() === "sair") break;


    const response = await ollama.chat({
      model: "qwen3.5:9b-q4_K_M",
       messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput },
      ],
      stream: true,
    });


    for await (const { message } of response) {
      if (message.thinking) 
        process.stdout.write(message.thinking);
      
      if (message.content) 
        process.stdout.write(message.content);
    }

    }
    process.stdout.write("\n");

    rl.close();
  }

await main();
