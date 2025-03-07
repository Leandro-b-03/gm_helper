import OpenAI from 'openai';

export const aiHandler = () => {
  const runtimeConfig = useRuntimeConfig();

  const OPENAI_URL = runtimeConfig.deepseekUrl;
  const OPENAI_API_KEY = runtimeConfig.deepseekKey;
  
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_URL,
  });

  const aiCall = async (systemPrompt: string, prompt: string) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      console.log(completion.choices[0].message.content);
      return completion.choices[0].message.content;
    } catch (error) {
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