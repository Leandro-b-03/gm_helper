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
  affiliation: () => affiliations[Math.floor(Math.random() * affiliations.length)],
  age: () => age[Math.floor(Math.random() * age.length)],
  alignment: () => alignments[Math.floor(Math.random() * alignments.length)],
  appearance: () => appearances[Math.floor(Math.random() * appearances.length)],
  background: () => backgrounds[Math.floor(Math.random() * backgrounds.length)],
  backstory: () => backstories[Math.floor(Math.random() * backstories.length)],
  class_: () => classes[Math.floor(Math.random() * classes.length)],
  gender_: () => gender[Math.floor(Math.random() * gender.length)],
  goal: () => goals[Math.floor(Math.random() * goals.length)],
  job: () => jobs[Math.floor(Math.random() * jobs.length)],
  level: () => levels[Math.floor(Math.random() * levels.length)],
  personality: () => personalities[Math.floor(Math.random() * personalities.length)],
  race: () => races[Math.floor(Math.random() * races.length)],
  sex_orientation: () => sex_orientations[Math.floor(Math.random() * sex_orientations.length)]
};

export default random;