import { createOpenAI } from "@ai-sdk/openai";

// The one place the model is configured.
//   - cheaper for a workshop → a "-mini" / "-nano" variant (e.g. "gpt-5-mini")
//   - this default            → "gpt-5.5"
//
// No OpenAI key? Any OpenAI-compatible provider works — set these in .dev.vars:
//   OPENAI_BASE_URL  e.g. https://api.groq.com/openai/v1
//   OPENAI_MODEL     e.g. llama-3.3-70b-versatile
//   OPENAI_API_KEY   that provider's key
//
// The provider reads these from the environment (the server loads them from
// .dev.vars on startup).
const baseURL = process.env.OPENAI_BASE_URL;
const modelName = process.env.OPENAI_MODEL ?? "gpt-5.5";

const provider = createOpenAI({ baseURL });

// OpenAI itself → the Responses API. Compatible providers only speak
// Chat Completions, so use .chat() when a custom base URL is set.
export const model = baseURL ? provider.chat(modelName) : provider(modelName);
