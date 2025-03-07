import { defineEventHandler, readBody, getQuery } from 'h3';
import { aiHandler } from '@/server/utils/aiHandler';
import { handle } from '@primeuix/themes/aura/imagecompare';

export default defineEventHandler(async (event) => {
  const storage = useStorage('redis');
  const { aiCall } = aiHandler();
  const method = event.node.req.method;

  const hasFiles = event.node.req.headers['content-type']?.includes('multipart/form-data');

  // Use a single object to hold both body and query parameters
  const data = await readFormData(event);

  if (data.generate.type == 'NPC') {
    handleNPCGeneration(data, aiCall, storage);
  }
});

async function handleNPCGeneration(data: any, aiCall: any, storage: any) {
  
}