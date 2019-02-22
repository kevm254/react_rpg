enum Character {
  KEN = "./img/ken.jpg",
  SAGAT = "./img/sagat.jpg"
}

export const SceneData = {
  initial: [
    {
      text: `The stranger looks at you menacingly. A sinister smile slowly
        creeps across his face. "Well look what we have here...`,
      displayProfile: false,
      profileImage: null
    },
    {
      text: `Who are you? What do you want?`,
      displayProfile: true,
      profileImage: Character.KEN
    },
    {
      text: `Don't worry about that. I'll be asking the questions here.
        Do you want to live? If so, follow me.`,
      displayProfile: true,
      profileImage: Character.SAGAT
    },
    {
      text: `I guess I better follow him.`,
      displayProfile: true,
      profileImage: Character.KEN
    },
    {
      text: `I need to find a weapon. There's no way I can
      take this guy out unarmed. This guy is way too large to
      try to fight him hand-to-hand.`,
      displayProfile: true,
      profileImage: Character.KEN
    },
    {
      text: `I suggest you get a move on it. If you value that
      pretty face of yours, you better not stall. I won't ask you again.`,
      displayProfile: true,
      profileImage: Character.SAGAT
    },
    {
      text: `Ok... whatever you say`,
      displayProfile: true,
      profileImage: Character.KEN
    }
  ]
};
