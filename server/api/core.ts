import { aiHandler } from '@/server/utils/aiHandler';
import { NPC } from '@/server/generate/npc';
import { ITEM } from '@/server/generate/item';

export default eventHandler(async (event) => {
  console.log('Generate event handler');
  const { aiCall } = aiHandler();
  const method = event.node.req.method;

  const hasFiles = event.node.req.headers['content-type']?.includes('multipart/form-data');

  const data = await readFormData(event);

  if (data.get('generate') == 'NPC') {
    return await handleNPCGeneration(data, aiCall);
  } else if (data.get('generate') == 'ITEM') {
    return await handleItemGeneration(data, aiCall);
  }
});

async function handleNPCGeneration(data: any, aiCall: any) {
  const values = NPC.generateNPC(
    data.get('affiliation'),
    data.get('age'),
    data.get('alignment'),
    data.get('appearance'),
    data.get('background'),
    data.get('backstory'),
    data.get('class_'),
    data.get('difficult'),
    data.get('enemy'),
    data.get('gender'),
    data.get('goal'),
    data.get('job'),
    data.get('level'),
    data.get('personality'),
    data.get('race'),
    data.get('sex_orientation'));

    const systemPrompt = `Generate in language: pt-BR and in this output format: escaped JSON example: {"name":"[generated name based on race + possible surname/nickname]","age":"[age]","race":"[race]","class":"[class]","job":"[job]","initiative":"[based on class and level]","speed":"[based on class in feet and meters eg.: 30ft 9m]","hit_points":"[based on class and level eg. 145]","hit_dice":"[based on class, level and race eg. 15d10 + 75]","description":"[random created description based on background and backstory]","appearance":"[random created appearance based on traits]","languages":"[common + based on class and race]","armour_class":"[based on level]","saving_throws":"[based on level, class, job and race eg. STR +1, DEx +1, ...]","attr":{"str":{"title":"attr.str","short":"STR","value":"[based on class and level]","bonus":"[value mod always lower]"},"dex":{"title":"attr.dex","short":"DEX","value":"[based on class and level]","bonus":"[value mod always lower]"},"con":{"title":"attr.con","short":"CON","value":"[based on class and level]","bonus":"[value mod always lower]"},"int":{"title":"attr.int","short":"INT","value":"[based on class and level]","bonus":"[value mod always lower]"},"wis":{"title":"attr.wis","short":"WIS","value":"[based on class and level]","bonus":"[value mod always lower]"},"cha":{"title":"attr.cha","short":"CHA","value":"[based on class and level]","bonus":"[value mod always lower]"}},"items": {"weapon": "[based on class, difficult and level]","armor":"[based on class, difficult and level]","other":"[based on class, difficult and level]","potions":"[may or not have, based on difficult more rare potions can be found]"},"secret_plot":"[based on race, level and background","spells":"{[based on the class, level and difficult if have eg. {"cantrips":[],"level_1":[],"level_2":[],"level_n":[]}]}"} ${values.prompt}`;
    
    const aiResponse = await aiCall(systemPrompt);

    let response = "";

    try {
      response = aiResponse.trim();
      if(response.startsWith('```json')){
        response = response.substring(7, response.length -3).trim();
      }    
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }

    const attr = values.attr;

    const npc = JSON.parse(response);
    npc.race = attr.race;
    npc.class = attr.class;
    npc.job = attr.job;
    npc.sex_orientation = attr.sex_orientation;
    npc.appearance_ = npc.appearance;
    npc.affiliation = attr.affiliation;
    npc.alignment = attr.alignment;
    npc.appearance = attr.appearance;
    npc.background = attr.background;
    npc.backstory = attr.backstory;
    npc.gender = attr.gender;
    npc.goal = attr.goal;
    npc.level = attr.level;
    npc.personality = attr.personality;
    npc.sex_orientation = attr.sex_orientation;
    npc.age = attr.age == 'unknown' ? -1 : attr.age;

    if (data.get('enemy')) {
      npc.enemy = true;
      npc.difficult = attr.difficult;
    }

    console.log(npc);

    return await npc;
}

async function handleItemGeneration(data: any, aiCall: any) {
  const values = ITEM.generateItem(
    data.get('class_'),
    data.get('type'),
    data.get('rarity'),
    data.get('item_tier'),
    data.get('wondrous_item'),
    data.get('weapons')
  );

  const systemPrompt = `Generate a magical item for Dungeons & Dragons 5e 2024 in PT-BR with a progressive evolution system. The item should start with basic abilities and become more powerful as the player levels up. Output format: a only escaped JSON object containing detailed information about the item, including name, description, damage, requirements, five evolution levels, specific bonuses per level, and additional notes. Evolution rules: The item evolves in five levels, following the character's progression. Each level grants a progressive bonus, such as extra damage, damage resistance, attribute improvements, or magical abilities. From Level 2 onwards, the item gains a +1 bonus per level, up to +4 at Level 5. Evolution may require fusions with other magical items or specific player challenges. Item structure: 1. Name: [Item name based on its category and theme] 2. Description: [A detailed introduction about the item's history and appearance] 3. Damage: [If a weapon, specify damage dice and possible modifiers] 4. Requirements: [Who can use the item, such as class, race, or alignment] 5. Evolution: - Level 1 (1-4): [Initial ability, extra damage, minor special effect] - Level 2 (5-8): [+1 to the item, enhanced effect, additional damage] - Level 3 (9-12): [+2 to the item, minor magical property, attribute bonus] - Level 4 (13-16): [+3 to the item, strong special effect, +1 to two attributes] - Level 5 (17-20): [+4 to the item, legendary effect, powerful unique ability] 6. Notes: [Special rules, restrictions, or unique interactions] Example output: {"name":"[Based on weapon and category, e.g., Blade of Divine Justice]","damage":{"base":"[Based on weapon type, e.g., 1d8 slashing]","versatile":"[Based on weapon type, e.g., 1d10]"},"requirements":"[Based on category, e.g., Any character who wields longswords]","evolution_levels":[{"level":1,"player_level":"1_to_4","bonus":{"extra_attack":"[Based on class, e.g., When hitting an attack, roll an additional die of the weapon category (1d8 or 1d10 if wielded with two hands).]"},"appearance":"[Based on class, e.g., The runes glow softly when hitting a target, as if absorbing the impact force.]","evolution_requirement":"[Based on class, e.g., Hit 3 attacks with a roll of 17 or higher.]"},{"level":2,"player_level":"5_to_8","bonus":{"weapon_bonus":"[+1 to the weapon]","divine_smite":"[Based on class, e.g., When hitting a roll of 17 or higher, the wielder can cast Divine Smite without expending a spell slot.]","additional_damage":"[Based on class, e.g., 2d8 radiant damage.]"},"appearance":"[Based on class, e.g., The blade shines intensely with a divine golden light when activating Divine Smite.]","evolution_requirement":"[Based on class, e.g., Fusion with a +1 magical weapon.]"}],"notes":["[Based on class, e.g., The effect of Divine Smite does not consume spell slots but can only be activated once per turn.]","[Based on class, e.g., If the character is a Paladin, the Divine Smite damage from this weapon is added to the normal Divine Smite damage.]"],"evolution_notes":["[Based on mechanics, e.g., For evolution, roll 2d20; if both rolls are 20, the weapon gains one random attribute from the extra attribute table.]","[Based on mechanics, e.g., If either of the 2d20 rolls is a 1, you lose the fusion weapon and need another one to continue evolution.]"]} Use creativity to generate engaging names and descriptions for the items. Balance the bonuses to keep the game challenging. Follow the provided structure to ensure consistency in the generated JSON and the traits bellow. ${values.prompt}`;

  const aiResponse = await aiCall(systemPrompt);

  let response = "";

  try {
    response = aiResponse.trim();
    if(response.startsWith('```json')){
      response = response.substring(7, response.length -3).trim();
    }    
  } catch (error) {
    console.error("Error parsing AI response:", error);
  }

  const attr = values.attr;

  const item = JSON.parse(response);
  item.class = attr.class;
  item.type = attr.type;
  item.rarity = attr.rarity;
  item.item_tier = attr.item_tier;
  item.wondrous_item = attr.wondrous_item;
  item.weapon = attr.weapon;

  return await item;
}