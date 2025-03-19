import { aiHandler } from '@/server/utils/aiHandler';
import { NPC } from '@/server/generate/npc';
import { ITEM } from '@/server/generate/item';
import { handleNPCGeneration } from '@/server/utils/npc';
import { handleItemGeneration } from '@/server/utils/item';

export default eventHandler(async (event) => {
  console.log('Generate event handler');
  const { aiCall } = aiHandler();
  const method = event.node.req.method;

  const hasFiles = event.node.req.headers['content-type']?.includes('multipart/form-data');

  const data = await readFormData(event);

  if (data.get('generate') == 'NPC') {
    return await handleNPCGeneration(data, aiCall, NPC);
  } else if (data.get('generate') == 'ITEM') {
    return await handleItemGeneration(data, aiCall, ITEM);
  }
});