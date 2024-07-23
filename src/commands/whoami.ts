const whoamiObj = {
  "message": [
    [
      "In the digital weave of existence,",
      "I am a coder crafting solutions,",
      "exploring the analog and the digital realms - "
    ],
    [
      "Amidst the hum of shortwave signals,",
      "I navigate the frequencies of innovation,",
      "while finding joy in vintage tones - "
    ],
    [
      "In the narrative of my journey,",
      "I am a storyteller with a camera and a pen,",
      "capturing moments and memories - "
    ],
    [
      "As stardust entwined with circuits,",
      "I ponder the intersections of technology and tradition,",
      "quietly seeking balance between the analog and the digital - "
    ],
    [
      "In the mosaic of passions and pursuits,",
      "I am a thread of curiosity and creativity,",
      "weaving through the pages of life - "
    ],
  ],
}

export const createWhoami = () : string[] => {
  const whoami : string[] = [];  
  const r = Math.floor(Math.random() * whoamiObj.message.length);
  whoami.push("<br>");

  whoamiObj.message[r].forEach((ele, idx) => {
    if (idx === whoamiObj.message[r].length - 1) {
      ele += "<span class='command'>who am I?</span>";
    }
    whoami.push(ele);
  });

  whoami.push("<br>");

  return whoami
}
