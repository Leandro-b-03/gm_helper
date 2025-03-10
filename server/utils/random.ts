import affiliations from '@/public/tables/affiliations.json';
import age from '@/public/tables/age.json';
import alignments from '@/public/tables/alignments.json';
import appearances from '@/public/tables/appearances.json';
import backgrounds from '@/public/tables/backgrounds.json';
import backstories from '@/public/tables/backstories.json';
import classes from '@/public/tables/classes.json';
import gender from '@/public/tables/gender.json';
import goals from '@/public/tables/goals.json';
import jobs from '@/public/tables/jobs.json';
import levels from '@/public/tables/levels.json';
import personalities from '@/public/tables/personalities.json';
import races from '@/public/tables/races.json';
import sex_orientations from '@/public/tables/sex_orientations.json';

const random = {
  affiliation: () => affiliations[Math.floor(Math.random() * (affiliations.length - 1)) + 1],
  age: () => age[Math.floor(Math.random() * (age.length - 1)) + 1],
  alignment: () => alignments[Math.floor(Math.random() * (alignments.length - 1)) + 1],
  appearance: () => appearances[Math.floor(Math.random() * (appearances.length - 1)) + 1],
  background: () => backgrounds[Math.floor(Math.random() * (backgrounds.length - 1)) + 1],
  backstory: () => backstories[Math.floor(Math.random() * (backstories.length - 1)) + 1],
  class_: () => classes[Math.floor(Math.random() * (classes.length - 1)) + 1],
  gender_: () => gender[Math.floor(Math.random() * (gender.length - 1)) + 1],
  goal: () => goals[Math.floor(Math.random() * (goals.length - 1)) + 1],
  job: () => jobs[Math.floor(Math.random() * (jobs.length - 1)) + 1],
  level: () => levels[Math.floor(Math.random() * (levels.length - 1)) + 1],
  personality: () => personalities[Math.floor(Math.random() * (personalities.length - 1)) + 1],
  race: () => races[Math.floor(Math.random() * (races.length - 1)) + 1],
  sex_orientation: () => sex_orientations[Math.floor(Math.random() * (sex_orientations.length - 1)) + 1]
};

export default random;