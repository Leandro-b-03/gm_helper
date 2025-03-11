import random from '@/server/utils/random';
import { ref } from 'vue';

interface NPCType {
  affiliation: string;
  age: number | string;
  alignment: string;
  appearance: string;
  background: string;
  backstory: string;
  class: string;
  difficult: string;
  enemy: boolean;
  gender: string;
  goal: string;
  job: string;
  level: number | string;
  personality: string;
  race: string;
  sex_orientation: string;
}

const generateNPC = (
  affiliation: string,
  age: number | string,
  alignment: string,
  appearance: string,
  background: string,
  backstory: string,
  class_: string, // Changed class_ to class_
  difficult: string,
  enemy: boolean,
  gender: string,
  goal: string,
  job: string,
  level: number | string,
  personality: string,
  race: string,
  sex_orientation: string,
) => {
  if (affiliation === 'random') {
    affiliation = random.affiliation().value;
  }
  if (age === 'random') {
    age = random.age().value;

    if (typeof age === 'number' && age >= 100) {
      age = '100+';
    }
  }
  if (alignment === 'random') {
    alignment = random.alignment().value;
  }
  if (appearance === 'random') {
    appearance = random.appearance().value;
  }
  if (background === 'random') {
    background = random.background().value;
  }
  if (backstory === 'random') {
    backstory = random.backstory().value;
  }
  if (class_ === 'random') {
    class_ = random.class_().value;
  }
  if (difficult === 'random') {
    difficult = random.difficult().value;
  }
  if (gender === 'random') {
    gender = random.gender_().value;
  }
  if (goal === 'random') {
    goal = random.goal().value;
  }
  if (job === 'random') {
    job = random.job().value;
  }
  if (level === 'random') {
    level = random.level().value;
  }
  if (personality === 'random') {
    personality = random.personality().value;
  }
  if (race === 'random') {
    race = random.race().value;
  }
  if (sex_orientation === 'random') {
    sex_orientation = random.sex_orientation().value;
  }

  const npc: NPCType = { //Create a new object inside of the function.
    affiliation: affiliation,
    age: age,
    alignment: alignment,
    appearance: appearance,
    background: background,
    backstory: backstory,
    class: class_, // Use class_ here.
    difficult: difficult,
    enemy: enemy,
    gender: gender,
    goal: goal,
    job: job,
    level: level,
    personality: personality,
    race: race,
    sex_orientation: sex_orientation,
  };

  let prompt = `Create an NPC with the following traits: ${npcToReadableString(npc)}`;

  if (enemy) {
    prompt = `Create an Enemy NPC with the following traits: ${npcToReadableString(npc)}`;
  }

  const values = {
    prompt: prompt,
    attr: npc,
  };

  return values;
};

function npcToReadableString(npc: NPCType): string {
  return `
    Affiliation: ${npc.affiliation},
    Age: ${npc.age},
    Alignment: ${npc.alignment},
    Appearance: ${npc.appearance},
    Background: ${npc.background},
    Backstory: ${npc.backstory},
    Class: ${npc.class},
    Gender: ${npc.gender},
    Goal: ${npc.goal},
    Job: ${npc.job},
    Level: ${npc.level},
    Personality: ${npc.personality},
    Race: ${npc.race},
    Sex Orientation: ${npc.sex_orientation},
    Difficult: ${npc.difficult},
  `;
}

export const NPC = {
  generateNPC,
};