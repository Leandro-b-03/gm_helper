import random from '@/server/utils/random';

interface ITEMType {
  class: string;
  type: string;
  rarity: string;
  item_tier: string;
  wondrous_item: string;
  weapon: string;
}

const generateItem = (
  class_: string,
  type: string,
  rarity: string,
  item_tier: string,
  wondrous_item: string,
  weapon: string,
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
  if (type === 'wondrous_item' && wondrous_item === 'random') {
    wondrous_item = random.wondrous_item().value;
  } else if (type === 'weapon' && weapon === 'random') {
    weapon = random.weapon().value;
  }

  const item: ITEMType = { //Create a new object inside of the function.
    class: class_, // Use class_ here.
    type: type,
    rarity: rarity,
    item_tier: item_tier,
    wondrous_item: wondrous_item,
    weapon: weapon,
  };

  console.log(item);

  let prompt = `Create an ITEM with the following traits: ${itemToReadableString(item)}`;

  const values = {
    prompt: prompt,
    attr: item,
  };

  return values;
};

function itemToReadableString(item: ITEMType): string {
  return `
    Class: ${item.class},
    Type: ${item.type},
    Rarity: ${item.rarity},
    Item Tier: ${item.item_tier},
    Wondrous Item: ${item.wondrous_item},
    Weapon: ${item.weapon},
  `;
}

export const ITEM = {
  generateItem,
};