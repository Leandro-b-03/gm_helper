import OpenAI from 'openai';

export const aiHandler = () => {
  const runtimeConfig = useRuntimeConfig();

  const OPENAI_URL = runtimeConfig.deepseekUrl;
  const OPENAI_API_KEY = runtimeConfig.deepseekKey;
  
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_URL,
  });

  const aiCall = async (prompt: string) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "deepseek-chat",
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error(error);
      switch (error.response.status) {
        case 400:
          throw createError({ statusCode: 400, message: 'Bad Request' });
        case 401:
          throw createError({ statusCode: 401, message: 'Unauthorized' });
        case 403:
          throw createError({ statusCode: 403, message: 'Forbidden' });
        case 404:
          throw createError({ statusCode: 404, message: 'Not Found' });
        case 500:
          throw createError({ statusCode: 500, message: 'Internal Server Error' });
        default:
          throw createError({ statusCode: 500, message: 'Internal Server Error' });
      }
    }
  };

  return { aiCall }; // Return the apiCall function
};