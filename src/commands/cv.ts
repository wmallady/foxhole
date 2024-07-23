import command from '../../config.json' assert {type: 'json'};

const createCV = () : string[] => {
  const cv : string[] = [];

  const SPACE = "&nbsp;";

  const NAME = "Name";
  const ROLE = "Role";
  const EXPERIENCE = "Experience";
  const EDUCATION = "Education";
  const SKILLS = "Skills";

  const name = `<i class='fa-solid fa-user'></i> ${NAME}`;
  const role = `<i class='fa-solid fa-briefcase'></i> ${ROLE}`;
  const experience = `<i class='fa-solid fa-cogs'></i> ${EXPERIENCE}`;
  const education = `<i class='fa-solid fa-graduation-cap'></i> ${EDUCATION}`;
  const skills = `<i class='fa-solid fa-laptop-code'></i> ${SKILLS}`;
  let string = "";

  cv.push("<br>");
  cv.push(command.cvGreeting);
  cv.push("<br><br>");
  
  // Name
  string = SPACE.repeat(2);
  string += name;
  string += SPACE.repeat(17 - NAME.length);
  string += "William Mallady";
  cv.push(string);
  cv.push("<br><br>");

  // Role
  string = '';
  string += SPACE.repeat(2);
  string += role;
  string += SPACE.repeat(17 - ROLE.length);
  string += "Software Engineer | Non-Profit Healthcare Facility";
  cv.push(string);
  cv.push("<br><br>");

  // Experience
  string = '';
  string += SPACE.repeat(2);
  string += experience;
  string += SPACE.repeat(17 - EXPERIENCE.length);
  string += "Grace Health | Battle Creek, MI";
  string += SPACE.repeat(2);
  string += "OCT 2023 - PRESENT";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Spearheaded the development of scalable desktop and web applications using a tech stack including TypeScript, Node.js, and React, driving enhanced patient outreach";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += `• Applied PowerShell, Microsoft Power Automate to streamline business processes, achieving remarkable efficiencies with document approval time slashed by up to 80%.`;
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Pioneered the implementation of robust source control practices utilizing Git/GitHub.";
  cv.push(string);
  cv.push("<br><br>");

  string = '';
  string += SPACE.repeat(2);
  string += experience;
  string += SPACE.repeat(17 - EXPERIENCE.length);
  string += "Ozinga | Mokena, IL";
  string += SPACE.repeat(2);
  string += "AUG 2021 – JAN 2022";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Instrumental in leveraging Lightning Web Components, employing JavaScript, HTML/CSS, and SQL, alongside IoT sensor APIs.";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Reduced quote times by up to 50% using these technologies.";
  cv.push(string);
  cv.push("<br><br>");

  string = '';
  string += SPACE.repeat(2);
  string += experience;
  string += SPACE.repeat(17 - EXPERIENCE.length);
  string += "Ozinga | Mokena, IL";
  string += SPACE.repeat(2);
  string += "MAY 2021 – AUG 2021";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Engineered Amazon S3 bucket automation using Python, yielding over $200k in rebates for the company.";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Demonstrated a proactive approach to optimizing processes and driving cost savings.";
  cv.push(string);
  cv.push("<br><br>");

  // Education
  string = '';
  string += SPACE.repeat(2);
  string += education;
  string += SPACE.repeat(17 - EDUCATION.length);
  string += "Bachelor of Science in Information Technology";
  string += SPACE.repeat(2);
  string += "Arizona State University, Ira A. Fulton School of Engineering";
  string += SPACE.repeat(2);
  string += "2019 - 2023";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Relevant Coursework: Full-Stack Development, Web Application Development, Database Systems Administration";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• Obtained degree while employed full-time";
  cv.push(string);
  cv.push("<br>");

  string = '';
  string += SPACE.repeat(4);
  string += "• GPA: 3.5 (Cum Laude)";
  cv.push(string);
  cv.push("<br><br>");

  // Skills
  string = '';
  string += SPACE.repeat(2);
  string += skills;
  string += SPACE.repeat(17 - SKILLS.length);
  string += "React, JavaScript & TypeScript, Node.js and Express";
  cv.push(string);
  cv.push("<br>");
  
  string = '';
  string += SPACE.repeat(2);
  string += SPACE.repeat(17 - SKILLS.length);
  string += "Agile Methodologies, Infrastructure as Code, Troubleshooting, Debugging and Testing";
  cv.push(string);
  cv.push("<br><br>");

  return cv;
}

export const CV = createCV();
