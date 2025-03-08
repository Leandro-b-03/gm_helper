import { defineEventHandler, readBody, getQuery } from 'h3';
import { aiHandler } from '@/server/utils/aiHandler';
import npc from '@/server/generate/npc';

export default defineEventHandler(async (event) => {
  const { aiCall } = aiHandler();
  const method = event.node.req.method;

  const hasFiles = event.node.req.headers['content-type']?.includes('multipart/form-data');

  // Use a single object to hold both body and query parameters
  const data = await readFormData(event);

  if (data.get('generate') == 'NPC') {
    handleNPCGeneration(data, aiCall);
  }
});

async function handleNPCGeneration(data: any, aiCall: any) {
  const prompt = npc.generateNPC(
    data.affiliation,
    data.age,
    data.alignment,
    data.appearance,
    data.background,
    data.backstory,
    data.class_,
    data.gender,
    data.goal,
    data.job,
    data.level,
    data.personality,
    data.race,
    data.sex_orientation);

    const systemPrompt = `Generate in language: pt-BR and in this output format: JSON example: {"name":"[random race name]","age":"[age]","race":"[race]","class":"[class]","job":"[job]","armourClass":"[based on class and race]","initiative":"[based on class and level]","speed":"[based on class]","hitPoints":"[based on class and level]","hitDice":"[based on class, level and race]","description":"[random created description based on background and backstory]","appearance":"[random created appearance based on traits]","attr":{"str":{"title":"attr.str","short":"STR","value":"[based on class and level]","bonus":"[value mod always lower]"},"dex":{"title":"attr.dex","short":"DEX","value":"[based on class and level]","bonus":"[value mod always lower]"},"con":{"title":"attr.con","short":"CON","value":"[based on class and level]","bonus":"[value mod always lower]"},"int":{"title":"attr.int","short":"INT","value":"[based on class and level]","bonus":"[value mod always lower]"},"wis":{"title":"attr.wis","short":"WIS","value":"[based on class and level]","bonus":"[value mod always lower]"},"cha":{"title":"attr.cha","short":"CHA","value":"[based on class and level]","bonus":"[value mod always lower]"}}}`;

    console.log(prompt);

    aiCall(systemPrompt, prompt);
}