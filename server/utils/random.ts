import affiliations from '@/public/tables/affiliations.json';
import age from '@/public/tables/age.json';
import alignments from '@/public/tables/alignments.json';
import appearances from '@/public/tables/appearances.json';
import backgrounds from '@/public/tables/backgrounds.json';
import backstories from '@/public/tables/backstories.json';
import classes from '@/public/tables/classes.json';
import damage from '@/public/tables/damage_type.json';
import difficulty from '@/public/tables/difficulty.json';
import gender from '@/public/tables/gender.json';
import goals from '@/public/tables/goals.json';
import item_tier from '@/public/tables/item_tiers.json';
import jobs from '@/public/tables/jobs.json';
import levels from '@/public/tables/levels_random.json';
import personalities from '@/public/tables/personalities.json';
import races from '@/public/tables/races.json';
import rarity from '@/public/tables/rarities.json';
import sex_orientations from '@/public/tables/sex_orientations.json';
import types from '@/public/tables/types.json';
import weapon from '@/public/tables/weapons.json';
import wondrous_item from '@/public/tables/wondrous_items.json';

/**
 * Utility object for generating random attributes for RPG characters.
 */
const random = {
  /**
   * Generates a random affiliation.
   * @returns {string} A random affiliation.
   */
  affiliation: () => affiliations[Math.floor(Math.random() * (affiliations.length - 1)) + 1],

  /**
   * Generates a random age.
   * @returns {number} A random age.
   */
  age: () => age[Math.floor(Math.random() * (age.length - 1)) + 1],

  /**
   * Generates a random alignment.
   * @returns {string} A random alignment.
   */
  alignment: () => alignments[Math.floor(Math.random() * (alignments.length - 1)) + 1],

  /**
   * Generates a random appearance.
   * @returns {string} A random appearance.
   */
  appearance: () => appearances[Math.floor(Math.random() * (appearances.length - 1)) + 1],

  /**
   * Generates a random background.
   * @returns {string} A random background.
   */
  background: () => backgrounds[Math.floor(Math.random() * (backgrounds.length - 1)) + 1],

  /**
   * Generates a random backstory.
   * @returns {string} A random backstory.
   */
  backstory: () => backstories[Math.floor(Math.random() * (backstories.length - 1)) + 1],

  /**
   * Generates a random class.
   * @returns {string} A random class.
   */
  class_: () => classes[Math.floor(Math.random() * (classes.length - 1)) + 1],

  /**
   * Generates a random damage type.
   * @returns {string} A random damage
   */
  damage: () => damage[Math.floor(Math.random() * (damage.length - 1)) + 1],

  /**
   * Generates a random difficulty.
   * @returns {string} A random difficulty.
   */
  difficult: () => difficulty[Math.floor(Math.random() * (difficulty.length - 1)) + 1],

  /**
   * Generates a random gender.
   * @returns {string} A random gender.
   */
  gender_: () => gender[Math.floor(Math.random() * (gender.length - 1)) + 1],

  /**
   * Generates a random goal.
   * @returns {string} A random goal.
   */
  goal: () => goals[Math.floor(Math.random() * (goals.length - 1)) + 1],

  /**
   * Generates a random item tier.
   * @returns {string} A random item tier
   */
  item_tier: () => item_tier[Math.floor(Math.random() * (item_tier.length - 1)) + 1],

  /**
   * Generates a random job.
   * @returns {string} A random job.
   */
  job: () => jobs[Math.floor(Math.random() * (jobs.length - 1)) + 1],

  /**
   * Generates a random level based on the given difficulty.
   * @param {string} difficulty - The difficulty level.
   * @returns {number} A random level.
   */
  level: (difficulty: keyof typeof levels[0]) => {
    const levelsForDifficulty = levels[0][difficulty];
    return levelsForDifficulty[Math.floor(Math.random() * levelsForDifficulty.length)];
  },

  /**
   * Generates a random personality.
   * @returns {string} A random personality.
   */
  personality: () => personalities[Math.floor(Math.random() * (personalities.length - 1)) + 1],

  /**
   * Generates a random race.
   * @returns {string} A random race.
   */
  race: () => races[Math.floor(Math.random() * (races.length - 1)) + 1],

  /**
   * Generates a random rarity.
   * @returns {string} A random rarity.
   */
  rarity: () => rarity[Math.floor(Math.random() * (rarity.length - 1)) + 1],

  /**
   * Generates a random sexual orientation.
   * @returns {string} A random sexual orientation.
   */
  sex_orientation: () => sex_orientations[Math.floor(Math.random() * (sex_orientations.length - 1)) + 1],

  /**
   * Generates a random type.
   * @returns {string} A random type.
   */
  type: () => types[Math.floor(Math.random() * (types.length - 1)) + 1],

  /**
   * Generates a random weapon.
   * @returns {string} A random weapon.
   */
  weapon: () => weapon[Math.floor(Math.random() * (weapon.length - 1)) + 1],

  /**
   * Generates a random wondrous item.
   * @returns {boolean} A random wondrous item.
   */
  wondrous_item: () => wondrous_item[Math.floor(Math.random() * (wondrous_item.length - 1)) + 1],
};

export default random;