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
  } else if (data.get('generate') == 'item') {
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

function handleItemGeneration(data: any, aiCall: any) {
  const values = ITEM.generateItem(
    data.get('type'),
    data.get('rarity'),
    data.get('item_tier'),
    data.get('wondrous_item'),
    data.get('class'));

  const systemPrompt = `Generate in language: pt-BR and in this output format: escaped JSON example: {"name":"[based on weapon and category]","rarity":"[rarity]","weapon_type":"[based on weapon]","damage":{"base":"[based on weapon and category]","versatile":"[based on weapon]"},"requirements":"[based on category]","evolution_levels":[{"level":1,"player_level":"1_to_4","bonus":{"extra_attack":"[based on class eg. when hitting an attack, roll an additional die of the weapon category (1d8 or 1d10 if wielded with two hands)]"},"appearance":"[based on class eg. the runes glow softly when hitting a target, as if absorbing the impact force]","evolution_requirement":"[eg. hit 3 attacks with a roll of 17 or higher]"},{"level":2,"player_level":"8_to_14","bonus":{"divine_smite":"[based on class eg. when hitting a roll of 17 or higher, the wielder can cast divine smite without expending a spell slot]","additional_damage":"[based on class eg. 2d8 radiantdamage]","stacks_with":"[based on class eg. extra die from level 1]"},"appearance":"[based on class eg. the blade shines intensely with a divine golden light when activating divine smite]","evolution_requirement":"[based on class eg. defeat a powerful evil enemy using divine smite 3 times]"},{"level":3,"player_level":"15_to_20","bonus":{"attributes":"[based on class eg. +1 to all attributes while wielding the weapon]","special_effect":"[based on class eg. while wielding the blade of divine justice, the user is considered under the effect of protection from evil and good]"},"appearance":"[based on class eg. the sword is surrounded by a constant golden aura, and the runes emit a dazzling glow during combat]"}],"notes":["[based on class eg. the effect of divine smite does not consume spell slots, but can only be activated once per turn]","[based on class eg.if_the_character_is_a_paladin,_the_divine_smite_damage_from_this_weapon_is_added_to_the_normal_divine_smite_damage"]} ${values.prompt}`;
}