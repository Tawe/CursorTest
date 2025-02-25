import {
  NPC,
  DndClass,
  DndRace,
  DndAlignment,
  DndBackground,
  Item,
} from "../types/npc";

const deities = [
  "Bahamut",
  "Tyr",
  "Pelor",
  "Moradin",
  "Corellon",
  "Sehanine",
  "Selûne",
  "Lathander",
  "Helm",
  "Torm",
  "Tempus",
  "Bane",
  "Cyric",
  "Shar",
  "Lolth",
];

const uniqueTraits = [
  "Has a distinctive scar across their face",
  "Speaks with a stutter when nervous",
  "Always carries a lucky charm",
  "Has heterochromatic eyes",
  "Constantly fidgets with a coin",
  "Whistles when thinking deeply",
  "Has an unusual accent",
  "Collects strange trinkets",
  "Never makes eye contact",
  "Always speaks in metaphors",
];

const goals = [
  "Seek revenge for a past wrong",
  "Protect their hometown",
  "Find a legendary artifact",
  "Prove their worth to their family",
  "Amass great wealth",
  "Gain political power",
  "Atone for past mistakes",
  "Discover ancient knowledge",
  "Find true love",
  "Achieve immortality",
];

const roleplayingHints = [
  "Speaks in a formal, educated manner",
  "Quick to anger but quick to forgive",
  "Distrusts authority figures",
  "Always tries to help those in need",
  "Values gold above all else",
  "Keeps secrets from everyone",
  "Extremely superstitious",
  "Loves telling old war stories",
  "Frequently quotes religious texts",
  "Has a dark sense of humor",
];

const childhoodEvents = [
  "was orphaned at a young age",
  "grew up in a noble household",
  "was raised by wolves in the wilderness",
  "lived in a monastery",
  "grew up on the streets of a major city",
  "was part of a traveling carnival",
  "was educated by a powerful wizard",
  "worked as a servant in a castle",
  "was raised by druids in a sacred grove",
  "grew up in a fishing village",
];

const lifeEvents = [
  "survived a devastating plague",
  "witnessed a dragon's attack",
  "found an ancient artifact",
  "saved a noble's life",
  "was falsely accused of a crime",
  "won a prestigious competition",
  "lost everything in a fire",
  "made a deal with a mysterious entity",
  "discovered a hidden talent",
  "inherited an unexpected fortune",
];

const motivations = [
  "seeking redemption for past mistakes",
  "trying to break a family curse",
  "searching for a lost sibling",
  "pursuing ancient knowledge",
  "seeking revenge against a powerful enemy",
  "trying to restore their family's honor",
  "protecting a powerful secret",
  "fulfilling an ancient prophecy",
  "repaying a life debt",
  "proving their worth to a mentor",
];

const occupations = [
  "Blacksmith",
  "Merchant",
  "Innkeeper",
  "Guard",
  "Farmer",
  "Scholar",
  "Artisan",
  "Sailor",
  "Miner",
  "Healer",
  "Alchemist",
  "Hunter",
  "Scribe",
  "Jeweler",
  "Carpenter",
];

const weapons = [
  {
    name: "Longsword",
    type: "weapon",
    description: "Versatile martial weapon",
  },
  {
    name: "Dagger",
    type: "weapon",
    description: "Simple melee or throwing weapon",
  },
  { name: "Shortbow", type: "weapon", description: "Simple ranged weapon" },
  { name: "Quarterstaff", type: "weapon", description: "Simple wooden staff" },
  {
    name: "Warhammer",
    type: "weapon",
    description: "Martial bludgeoning weapon",
  },
  { name: "Crossbow", type: "weapon", description: "Mechanical ranged weapon" },
] as const;

const armor = [
  {
    name: "Leather Armor",
    type: "armor",
    description: "Light armor made of leather",
  },
  {
    name: "Chain Shirt",
    type: "armor",
    description: "Medium armor made of interlocking metal rings",
  },
  {
    name: "Scale Mail",
    type: "armor",
    description: "Medium armor made of overlapping metal scales",
  },
  { name: "Shield", type: "armor", description: "Wooden or metal shield" },
  {
    name: "Plate Armor",
    type: "armor",
    description: "Heavy armor offering excellent protection",
  },
] as const;

const tools = [
  {
    name: "Thieves' Tools",
    type: "tool",
    description: "Tools for picking locks and disarming traps",
  },
  {
    name: "Herbalism Kit",
    type: "tool",
    description: "Tools for creating herbal remedies",
  },
  {
    name: "Smith's Tools",
    type: "tool",
    description: "Tools for metalworking",
  },
  {
    name: "Musical Instrument",
    type: "tool",
    description: "A musical instrument for performance",
  },
  {
    name: "Cartographer's Tools",
    type: "tool",
    description: "Tools for mapmaking",
  },
] as const;

const trinkets = [
  {
    name: "Lucky Coin",
    type: "trinket",
    description: "A coin that seems to bring good fortune",
  },
  {
    name: "Old Letter",
    type: "trinket",
    description: "A mysterious letter with cryptic contents",
  },
  {
    name: "Small Mirror",
    type: "trinket",
    description: "A pocket mirror with ornate decorations",
  },
  {
    name: "Strange Crystal",
    type: "trinket",
    description: "A crystal that glows faintly in moonlight",
  },
  {
    name: "Wooden Figurine",
    type: "trinket",
    description: "A small carved figurine of unknown origin",
  },
] as const;

const valuables = [
  { name: "Gemstone", type: "valuable", description: "A precious gemstone" },
  {
    name: "Silver Ring",
    type: "valuable",
    description: "A finely crafted silver ring",
  },
  {
    name: "Gold Necklace",
    type: "valuable",
    description: "An ornate golden necklace",
  },
  {
    name: "Ancient Coin",
    type: "valuable",
    description: "A coin from a lost civilization",
  },
  { name: "Pearl", type: "valuable", description: "A lustrous pearl" },
] as const;

const consumables = [
  {
    name: "Healing Potion",
    type: "consumable",
    description: "A red potion that heals wounds",
  },
  { name: "Antidote", type: "consumable", description: "Cures common poisons" },
  { name: "Rations", type: "consumable", description: "A day's worth of food" },
  {
    name: "Holy Water",
    type: "consumable",
    description: "Water blessed by a deity",
  },
  {
    name: "Torch",
    type: "consumable",
    description: "Provides light for 1 hour",
  },
] as const;

const factions = [
  {
    name: "The Harpers",
    possibleRoles: ["Spy", "Loremaster", "Scout", "Informant"] as string[],
    description: "A scattered network of spellcasters and spies",
    areas: [
      "Waterdeep",
      "Silverymoon",
      "Baldur's Gate",
      "Neverwinter",
    ] as string[],
  },
  {
    name: "Order of the Gauntlet",
    possibleRoles: [
      "Crusader",
      "Inquisitor",
      "Defender",
      "Strategist",
    ] as string[],
    description: "Faithful and vigilant seekers of justice",
    areas: ["Elturel", "Elturgard", "Helm's Hold", "Citadel Adbar"] as string[],
  },
  {
    name: "Emerald Enclave",
    possibleRoles: [
      "Warden",
      "Beast Handler",
      "Herbalist",
      "Pathfinder",
    ] as string[],
    description: "Defenders of the natural world",
    areas: [
      "High Forest",
      "Misty Forest",
      "Moonshae Isles",
      "The Reaching Woods",
    ] as string[],
  },
  {
    name: "Lords' Alliance",
    possibleRoles: ["Diplomat", "Commander", "Advisor", "Agent"] as string[],
    description: "A coalition of political powers",
    areas: ["Waterdeep", "Neverwinter", "Mirabar", "Silverymoon"] as string[],
  },
  {
    name: "Zhentarim",
    possibleRoles: ["Enforcer", "Smuggler", "Merchant", "Assassin"] as string[],
    description: "An unscrupulous shadow network",
    areas: [
      "Darkhold",
      "The Citadel of the Raven",
      "Zhentil Keep",
      "The Moonsea",
    ] as string[],
  },
  {
    name: "Red Wizards",
    possibleRoles: [
      "Arcanist",
      "Researcher",
      "Collector",
      "Apprentice",
    ] as string[],
    description: "Powerful and ambitious magic users",
    areas: ["Thay", "Bezantur", "Eltabbar", "Surthay"] as string[],
  },
  {
    name: "Thieves' Guild",
    possibleRoles: ["Burglar", "Fence", "Lookout", "Pickpocket"] as string[],
    description: "Organized criminal enterprise",
    areas: [
      "The Dock Ward",
      "The Trade Ward",
      "The Warrens",
      "The Shadow District",
    ] as string[],
  },
  {
    name: "Merchant's Consortium",
    possibleRoles: ["Trader", "Broker", "Appraiser", "Negotiator"] as string[],
    description: "Alliance of wealthy traders",
    areas: [
      "Trade Way",
      "Sword Coast",
      "Sea of Fallen Stars",
      "Dragon Coast",
    ] as string[],
  },
] as const;

const boons = [
  {
    name: "Valuable Information",
    description: "Will share secret knowledge about local threats or treasures",
    requiredReputation: 50,
  },
  {
    name: "Merchant's Discount",
    description: "Offers a 20% discount on goods and services",
    requiredReputation: 30,
  },
  {
    name: "Combat Support",
    description: "Will provide combat assistance in times of need",
    requiredReputation: 70,
  },
  {
    name: "Safe Haven",
    description: "Offers a secure place to rest and recover",
    requiredReputation: 40,
  },
  {
    name: "Political Favor",
    description: "Will speak on your behalf to local authorities",
    requiredReputation: 60,
  },
];

const banes = [
  {
    name: "False Accusations",
    description: "Spreads harmful rumors about the party to local authorities",
    requiredNegativeReputation: -50,
  },
  {
    name: "Merchant's Markup",
    description: "Charges 50% more for goods and services",
    requiredNegativeReputation: -30,
  },
  {
    name: "Hidden Enemy",
    description: "Secretly works against the party's interests",
    requiredNegativeReputation: -70,
  },
  {
    name: "Information Broker",
    description:
      "Sells information about the party's activities to their enemies",
    requiredNegativeReputation: -40,
  },
  {
    name: "Resource Denial",
    description: "Convinces other merchants and innkeepers to refuse service",
    requiredNegativeReputation: -60,
  },
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getUniqueRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateName = (): string => {
  const firstNames = [
    "Aldrich",
    "Branwen",
    "Cedric",
    "Daria",
    "Eldeth",
    "Finn",
    "Gwendolyn",
    "Harald",
    "Isolde",
    "Jormund",
  ];
  const lastNames = [
    "Blackwood",
    "Stormwind",
    "Ironweaver",
    "Thornheart",
    "Moonshadow",
    "Frostbeard",
    "Silvertongue",
    "Swiftsword",
  ];
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
};

const generateContacts = (
  npc: Partial<NPC>,
  availableFactions: typeof factions
): NPC["contacts"] => {
  const firstNames = [
    "Theron",
    "Lyra",
    "Magnus",
    "Vesper",
    "Raven",
    "Cyrus",
    "Nova",
    "Felix",
    "Sage",
    "Echo",
    "Atlas",
    "Iris",
    "Drake",
    "Faye",
    "Orion",
  ];

  const lastNames = [
    "Shadowweave",
    "Brightforge",
    "Stormchaser",
    "Nightshade",
    "Dawnkeeper",
    "Frostwind",
    "Flameheart",
    "Moonshadow",
    "Starweaver",
    "Thunderbrand",
  ];

  const relationships: NPC["contacts"][number]["relationship"][] = [
    "Ally",
    "Rival",
    "Mentor",
    "Friend",
    "Business Partner",
  ];

  // Get two random factions different from the NPC's faction
  const contactFactions = getUniqueRandomElements(
    availableFactions.filter(
      (f) => !npc.faction || f.name !== npc.faction.name
    ),
    2
  );

  return contactFactions.map((faction) => ({
    name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
    faction: faction.name,
    role: getRandomElement(faction.possibleRoles),
    relationship: getRandomElement(relationships),
  }));
};

const generateFaction = (npc: Partial<NPC>): NPC["faction"] => {
  const availableFactions = [...factions];

  // Some backgrounds are more likely to be in certain factions
  const backgroundFactionPreferences: Record<string, string[]> = {
    Acolyte: ["Order of the Gauntlet", "The Harpers"],
    Criminal: ["Thieves' Guild", "Zhentarim"],
    "Folk Hero": ["Emerald Enclave", "Lords' Alliance"],
    Noble: ["Lords' Alliance", "Merchant's Consortium"],
    Sage: ["The Harpers", "Red Wizards"],
    Merchant: ["Merchant's Consortium", "Zhentarim"],
    Outlander: ["Emerald Enclave"],
    Hermit: ["Emerald Enclave", "Red Wizards"],
  };

  let selectedFaction;

  // Try to select a preferred faction first
  if (npc.background && backgroundFactionPreferences[npc.background]) {
    const preferredFactionNames = backgroundFactionPreferences[npc.background];
    selectedFaction = availableFactions.find((f) =>
      preferredFactionNames.includes(f.name)
    );
  }

  // If no preferred faction was found, select a random one
  if (!selectedFaction) {
    selectedFaction = getRandomElement(availableFactions);
  }

  // 20% chance to have no faction
  if (Math.random() < 0.2) {
    return null;
  }

  return {
    name: selectedFaction.name,
    role: getRandomElement(selectedFaction.possibleRoles),
    standing: getRandomElement([
      "Leader",
      "High-ranking",
      "Member",
      "Member",
      "Initiate",
    ] as const),
    area: getRandomElement(selectedFaction.areas),
  };
};

const generateBackstory = (npc: Partial<NPC>): string => {
  const childhood = getRandomElement(childhoodEvents);
  const event = getRandomElement(lifeEvents);
  const motivation = getRandomElement(motivations);

  const backgroundDetails =
    {
      Acolyte: "devoted their life to religious studies",
      Criminal: "learned the art of deception and stealth",
      "Folk Hero": "became known for their brave deeds",
      Noble: "was groomed for leadership from birth",
      Sage: "spent years studying ancient texts",
      Soldier: "served in numerous military campaigns",
      Merchant: "traveled far and wide trading goods",
      Entertainer: "performed in grand halls and humble taverns",
      Outlander: "lived off the land in the wilderness",
      Hermit: "sought enlightenment in solitude",
    }[npc.background || ""] || "lived a remarkable life";

  const classDetails =
    {
      Barbarian: "honing their raw strength and primal instincts",
      Bard: "collecting stories and songs from every corner of the realm",
      Cleric: "serving their deity with unwavering devotion",
      Druid: "learning the secrets of nature",
      Fighter: "mastering the art of combat",
      Monk: "perfecting body and mind through rigorous training",
      Paladin: "upholding sacred oaths and pursuing justice",
      Ranger: "protecting the wilderness and its inhabitants",
      Rogue: "developing a particular set of skills in the shadows",
      Sorcerer: "learning to control their innate magical abilities",
      Warlock: "drawing power from their otherworldly patron",
      Wizard: "studying the arcane arts through ancient tomes",
    }[npc.class || ""] || "developing their abilities";

  // Generate faction narrative
  const factionContext = {
    "The Harpers": {
      Leader: "rose to command a network of spies and informants",
      "High-ranking": "earned trust through countless covert missions",
      Member: "joined the fight to preserve knowledge and oppose tyranny",
      Initiate: "recently discovered the hidden world of information gathering",
    },
    "Order of the Gauntlet": {
      Leader: "commands a chapter dedicated to vanquishing evil",
      "High-ranking": "proven themselves in numerous battles against darkness",
      Member: "fights to protect the innocent from evil's influence",
      Initiate: "took sacred vows to combat wickedness",
    },
    "Emerald Enclave": {
      Leader: "guides others in maintaining nature's delicate balance",
      "High-ranking": "respected for their dedication to natural harmony",
      Member: "works to preserve the natural order",
      Initiate: "learning the ways of nature's guardians",
    },
    "Lords' Alliance": {
      Leader: "coordinates the efforts of multiple city-states",
      "High-ranking": "represents their city's interests in grand councils",
      Member: "serves the alliance's political objectives",
      Initiate: "learning the intricacies of political power",
    },
    Zhentarim: {
      Leader: "controls a vast network of illegal operations",
      "High-ranking": "manages numerous profitable ventures",
      Member: "operates in the shadows of commerce and politics",
      Initiate: "proving their worth in the black market",
    },
    "Red Wizards": {
      Leader: "directs ambitious magical research",
      "High-ranking": "conducts dangerous arcane experiments",
      Member: "studies forbidden magical knowledge",
      Initiate: "learning the secrets of powerful magic",
    },
    "Thieves' Guild": {
      Leader: "masterminds the city's underground operations",
      "High-ranking": "orchestrates complex heists",
      Member: "executes various illegal activities",
      Initiate: "learning the tricks of the criminal trade",
    },
    "Merchant's Consortium": {
      Leader: "controls major trade routes and negotiations",
      "High-ranking": "brokers significant commercial deals",
      Member: "facilitates trade between distant lands",
      Initiate: "learning the arts of commerce and negotiation",
    },
  };

  let factionNarrative = "";
  if (npc.faction) {
    const factionDetails =
      factionContext[npc.faction.name as keyof typeof factionContext];
    if (factionDetails) {
      factionNarrative = ` Through their adventures, they ${
        factionDetails[npc.faction.standing]
      }.`;
    }
  }

  // Generate contacts narrative
  let contactsNarrative = "";
  if (npc.contacts && npc.contacts.length > 0) {
    const contactStories = npc.contacts.map((contact) => {
      const relationshipContext = {
        Ally: "formed a strong alliance",
        Rival: "maintains a competitive rivalry",
        Mentor: "learned valuable lessons",
        Friend: "forged a lasting friendship",
        "Business Partner": "established a profitable partnership",
      };
      return `${relationshipContext[contact.relationship]} with ${
        contact.name
      }, a ${contact.role.toLowerCase()} of the ${contact.faction}`;
    });
    contactsNarrative = ` Along the way, they ${contactStories.join(" and ")}.`;
  }

  return `${
    npc.name
  } ${childhood}. During their youth, they ${backgroundDetails}. Their life changed dramatically when they ${event.toLowerCase()}, ${classDetails}.${factionNarrative}${contactsNarrative} Now, they are ${motivation}, which drives them forward on their adventures. ${
    npc.deity !== "None"
      ? `Their unwavering faith in ${npc.deity} guides their path.`
      : ""
  }`;
};

const generateAbilityScore = (): number => {
  // Roll 4d6, drop lowest, sum remaining
  const rolls = Array.from(
    { length: 4 },
    () => Math.floor(Math.random() * 6) + 1
  )
    .sort((a, b) => b - a)
    .slice(0, 3);
  return rolls.reduce((sum, roll) => sum + roll, 0);
};

const generateAge = (race: string): number => {
  const baseAges: Record<string, { min: number; max: number }> = {
    Human: { min: 18, max: 70 },
    Elf: { min: 50, max: 500 },
    Dwarf: { min: 40, max: 300 },
    Halfling: { min: 20, max: 120 },
    Gnome: { min: 25, max: 200 },
    "Half-Elf": { min: 20, max: 140 },
    "Half-Orc": { min: 16, max: 60 },
    Tiefling: { min: 18, max: 80 },
    Dragonborn: { min: 15, max: 70 },
  };

  const { min, max } = baseAges[race] || baseAges.Human;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateOccupation = (background: string): string => {
  // Some backgrounds imply specific occupations
  const backgroundOccupations: Record<string, string[]> = {
    Acolyte: ["Temple Priest", "Scribe", "Healer"],
    Criminal: ["Fence", "Smuggler", "Thief"],
    "Folk Hero": ["Village Elder", "Local Guide", "Militia Leader"],
    Noble: ["Estate Owner", "Diplomat", "Court Advisor"],
    Sage: ["Scholar", "Researcher", "Professor"],
    Soldier: ["Guard Captain", "Weapon Trainer", "Mercenary"],
    Merchant: ["Shop Owner", "Trader", "Caravan Leader"],
    Entertainer: ["Tavern Performer", "Street Artist", "Court Jester"],
    Outlander: ["Hunter", "Guide", "Ranger"],
    Hermit: ["Herbalist", "Mystic", "Researcher"],
  };

  const specificOccupations = backgroundOccupations[background] || occupations;
  return getRandomElement(specificOccupations);
};

const generateInventory = (npc: Partial<NPC>): Item[] => {
  const inventory: Item[] = [];

  // Add class-specific equipment
  const classEquipment: Record<string, Item[]> = {
    Barbarian: [
      { ...weapons[0], quantity: 1 }, // Longsword
      { ...armor[0], quantity: 1 }, // Leather Armor
    ],
    Bard: [
      { ...weapons[1], quantity: 1 }, // Dagger
      { ...tools[3], quantity: 1 }, // Musical Instrument
    ],
    Cleric: [
      { ...weapons[4], quantity: 1 }, // Warhammer
      { ...armor[2], quantity: 1 }, // Scale Mail
      { ...armor[3], quantity: 1 }, // Shield
    ],
    Druid: [
      { ...weapons[3], quantity: 1 }, // Quarterstaff
      { ...tools[1], quantity: 1 }, // Herbalism Kit
    ],
    Fighter: [
      { ...weapons[0], quantity: 1 }, // Longsword
      { ...armor[4], quantity: 1 }, // Plate Armor
      { ...armor[3], quantity: 1 }, // Shield
    ],
    Monk: [
      { ...weapons[3], quantity: 1 }, // Quarterstaff
    ],
    Paladin: [
      { ...weapons[0], quantity: 1 }, // Longsword
      { ...armor[4], quantity: 1 }, // Plate Armor
      { ...armor[3], quantity: 1 }, // Shield
    ],
    Ranger: [
      { ...weapons[2], quantity: 1 }, // Shortbow
      { ...armor[0], quantity: 1 }, // Leather Armor
    ],
    Rogue: [
      { ...weapons[1], quantity: 2 }, // Daggers
      { ...tools[0], quantity: 1 }, // Thieves' Tools
    ],
    Sorcerer: [
      { ...weapons[1], quantity: 1 }, // Dagger
    ],
    Warlock: [
      { ...weapons[5], quantity: 1 }, // Crossbow
    ],
    Wizard: [
      { ...weapons[3], quantity: 1 }, // Quarterstaff
    ],
  };

  // Add class equipment
  if (npc.class && classEquipment[npc.class]) {
    inventory.push(...classEquipment[npc.class]);
  }

  // Add background-specific items
  const backgroundItems: Record<string, Item[]> = {
    Acolyte: [
      { ...consumables[3], quantity: 2 }, // Holy Water
    ],
    Criminal: [
      { ...tools[0], quantity: 1 }, // Thieves' Tools
    ],
    "Folk Hero": [
      { ...tools[2], quantity: 1 }, // Smith's Tools
    ],
    Noble: [
      { ...valuables[1], quantity: 1 }, // Silver Ring
    ],
    Sage: [
      { ...tools[4], quantity: 1 }, // Cartographer's Tools
    ],
  };

  if (npc.background && backgroundItems[npc.background]) {
    inventory.push(...backgroundItems[npc.background]);
  }

  // Add random trinket
  inventory.push({
    ...getRandomElement(Array.from(trinkets)),
    quantity: 1,
  });

  // Add random consumables
  const randomConsumables = getUniqueRandomElements(Array.from(consumables), 2);
  inventory.push(
    ...randomConsumables.map((item) => ({
      ...item,
      quantity: getRandomNumber(1, 3),
    }))
  );

  return inventory;
};

const generateGold = (level: number): number => {
  // Generate gold based on level
  const baseGold = 10;
  const goldMultiplier = Math.pow(2, Math.floor((level - 1) / 4));
  return Math.floor(baseGold * goldMultiplier * (0.8 + Math.random() * 0.4));
};

const generateBoonAndBane = () => {
  return {
    boon: getRandomElement(boons),
    bane: getRandomElement(banes),
  };
};

export const generateNPC = (): NPC => {
  const { boon, bane } = generateBoonAndBane();
  console.log("Generated boon and bane:", { boon, bane });

  const classes = Object.values({
    Barbarian: "Barbarian",
    Bard: "Bard",
    Cleric: "Cleric",
    Druid: "Druid",
    Fighter: "Fighter",
    Monk: "Monk",
    Paladin: "Paladin",
    Ranger: "Ranger",
    Rogue: "Rogue",
    Sorcerer: "Sorcerer",
    Warlock: "Warlock",
    Wizard: "Wizard",
  } as Record<DndClass, DndClass>);

  const races = Object.values({
    Human: "Human",
    Elf: "Elf",
    Dwarf: "Dwarf",
    Halfling: "Halfling",
    Gnome: "Gnome",
    "Half-Elf": "Half-Elf",
    "Half-Orc": "Half-Orc",
    Tiefling: "Tiefling",
    Dragonborn: "Dragonborn",
  } as Record<DndRace, DndRace>);

  const alignments = Object.values({
    "Lawful Good": "Lawful Good",
    "Neutral Good": "Neutral Good",
    "Chaotic Good": "Chaotic Good",
    "Lawful Neutral": "Lawful Neutral",
    "True Neutral": "True Neutral",
    "Chaotic Neutral": "Chaotic Neutral",
    "Lawful Evil": "Lawful Evil",
    "Neutral Evil": "Neutral Evil",
    "Chaotic Evil": "Chaotic Evil",
  } as Record<DndAlignment, DndAlignment>);

  const backgrounds = Object.values({
    Acolyte: "Acolyte",
    Criminal: "Criminal",
    "Folk Hero": "Folk Hero",
    Noble: "Noble",
    Sage: "Sage",
    Soldier: "Soldier",
    Merchant: "Merchant",
    Entertainer: "Entertainer",
    Outlander: "Outlander",
    Hermit: "Hermit",
  } as Record<DndBackground, DndBackground>);

  const npc: NPC = {
    name: generateName(),
    race: getRandomElement(races),
    class: getRandomElement(classes),
    background: getRandomElement(backgrounds),
    alignment: getRandomElement(alignments),
    level: getRandomNumber(1, 20),
    goals: getUniqueRandomElements(goals, 2),
    roleplayingHints: getUniqueRandomElements(roleplayingHints, 2),
    deity: getRandomElement([...deities, "None"]),
    sex: getRandomElement(["Male", "Female", "Non-binary"]),
    uniqueTrait: getRandomElement(uniqueTraits),
    backstory: "",
    age: 0,
    occupation: "",
    abilityScores: {
      strength: generateAbilityScore(),
      dexterity: generateAbilityScore(),
      constitution: generateAbilityScore(),
      intelligence: generateAbilityScore(),
      wisdom: generateAbilityScore(),
      charisma: generateAbilityScore(),
    },
    inventory: [],
    gold: 0,
    faction: null,
    contacts: [],
    boon,
    bane,
  };

  npc.age = generateAge(npc.race);
  npc.occupation = generateOccupation(npc.background);
  npc.inventory = generateInventory(npc);
  npc.gold = generateGold(npc.level);
  npc.faction = generateFaction(npc);
  npc.contacts = generateContacts(npc, factions);
  npc.backstory = generateBackstory(npc);
  return npc;
};
