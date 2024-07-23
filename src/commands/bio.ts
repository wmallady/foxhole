import command from '../../config.json' assert {type: 'json'};

const createBio = () : string[] => {
  const bio : string[] = [];

  const SPACE = "&nbsp;";

  const NAME = "Name";
  const ROLE = "Role";
  const PASSIONS = "Passions";
  const HOBBIES = "Hobbies";
  
  const name = `<i class='fa-solid fa-user'></i> ${NAME}`;
  const role = `<i class='fa-solid fa-briefcase'></i> ${ROLE}`;
  const passions = `<i class='fa-solid fa-heart'></i> ${PASSIONS}`;
  const hobbies = `<i class='fa-solid fa-bicycle'></i> ${HOBBIES}`;
  let string = "";

  bio.push("<br>");
  bio.push(command.bioGreeting);
  bio.push("<br>");
  
  // Name
  string = SPACE.repeat(2);
  string += name;
  string += SPACE.repeat(17 - NAME.length);
  string += "William Mallady";
  bio.push(string);

  // Role
  string = '';
  string += SPACE.repeat(2);
  string += role;
  string += SPACE.repeat(17 - ROLE.length);
  string += "Software Engineer at a Non-Profit Healthcare Facility";
  bio.push(string);

  // Passions
  string = '';
  string += SPACE.repeat(2);
  string += passions;
  string += SPACE.repeat(17 - PASSIONS.length);
  string += "Photography, Reading, Writing, Board Games, Trading Card Games, and my 4-legged pals (3 cats, 1 dog)";
  bio.push(string);

  // Hobbies
  string = '';
  string += SPACE.repeat(2);
  string += hobbies;
  string += SPACE.repeat(17 - HOBBIES.length);
  string += "Bike Riding, Working Out, Plant Care, and Cat Spoiling";
  bio.push(string);

  return bio;
}

export const BIO = createBio();
