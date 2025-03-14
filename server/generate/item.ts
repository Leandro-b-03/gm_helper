import random from '@/server/utils/random';

interface ITEMType {
  class: string;
  type: string;
  rarity: string;
  item_tier: string;
  wondrous_item: string;
}

const generateItem = (
  class_: string,
  type: string,
  rarity: string,
  item_tier: string,
  wondrous_item: string,
) => {
  if (class_ === 'random') {
    class_ = random.class_().value;
  }
  if (type === 'random') {
    type = random.type().value;
  }
  if (rarity === 'random') {
    rarity = random.rarity().value;
  }
  if (item_tier === 'random') {
    item_tier = random.item_tier().value;
  }
  if (wondrous_item === 'random') {
    wondrous_item = random.wondrous_item().value;
  }

  const item: ITEMType = { //Create a new object inside of the function.
    class: class_, // Use class_ here.
    type: type,
    rarity: rarity,
    item_tier: item_tier,
    wondrous_item: wondrous_item,
  };

  let prompt = `Create an ITEM with the following traits: ${itemToReadableString(item)}`;

  const values = {
    prompt: prompt,
    attr: item,
  };

  return values;
};

function itemToReadableString(item: ITEMType): string {
  return `
    Affiliation: ${item.affiliation},
    Age: ${item.age},
    Alignment: ${item.alignment},
    Appearance: ${item.appearance},
    Background: ${item.background},
    Backstory: ${item.backstory},
    Class: ${item.class},
    Gender: ${item.gender},
    Goal: ${item.goal},
    Job: ${item.job},
    Level: ${item.level},
    Personality: ${item.personality},
    Race: ${item.race},
    Sex Orientation: ${item.sex_orientation},
    Difficult: ${item.difficult},
  `;
}

export const ITEM = {
  generateItem,
};