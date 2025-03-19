async function handleNPCGeneration(data: any, aiCall: any, NPC: any) {
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

export { handleNPCGeneration };