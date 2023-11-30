import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
const timeBetweenRuns = 1000;
const maxTryes = 60;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function sendMessage(message) {
  const thread = await openai.beta.threads.create({
    messages: [
      {
        "role": "user",
        "content": message,
      }
    ]
  });

  let run = await openai.beta.threads.runs.create(
    thread.id,
    {
      assistant_id: process.env.CHAT_ASSISTANT_ID,
    }
  );

  run = await openai.beta.threads.runs.retrieve(
    thread.id,
    run.id
  );
  let tryes = 0;
  console.log(`Starting to get run status for thread ${thread.id}`)
  while(tryes < maxTryes && run.status != "completed") {
    console.log("Checking run status...")
    run = await openai.beta.threads.runs.retrieve(
      thread.id,
      run.id
    );
    if(run.status == "completed") {
      const response = await openai.beta.threads.messages.list(
        thread.id
      );
      const { text } = response.data[0].content[0];
      console.log(response);
      return {
        "response": text.value
      }  
    } else if(run.status == "cancelled" || run.status == "expired" || run.status == "failed") {
      throw new Error(`Run enter in bad status ${run.status}`);  
    }
    tryes++;
    await snooze(timeBetweenRuns);
  }
  throw new Error("Can't get chat response!");
}

export default sendMessage;