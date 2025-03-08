import random from '@/server/utils/random';

export function generateNPC(
  affiliation: string,
  age: any,
  alignment: string,
  appearance: string,
  background: string,
  backstory: string,
  class_: string,
  gender: string,
  goal: string,
  job: string,
  level: any,
  personality: string,
  race: string,
  sex_orientation: string
) {
  return {
    name: "generateNPC",
    description: "Generate",
    async run() {
      if (affiliation === 'random') {
        affiliation = random.affiliation().value;
      }
      if (age === 'random') {
        age = random.age().value;
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
      
      const npc = {
        affiliation,
        age,
        alignment,
        appearance,
        background,
        backstory,
        class: class_,
        gender,
        goal,
        job,
        level,
        personality,
        race,
        sex_orientation
      };

      const prompt = {
        prompt: "Create an NPC with the following traits:",
        npc
      };

      return prompt;
    },
  };
}