export interface Item {
  name: string;
  type: "weapon" | "armor" | "tool" | "trinket" | "valuable" | "consumable";
  description?: string;
  quantity: number;
}

export interface Boon {
  name: string;
  description: string;
  requiredReputation: number;
}

export interface Bane {
  name: string;
  description: string;
  requiredNegativeReputation: number;
}

export interface NPC {
  name: string;
  race: string;
  class: string;
  background: string;
  alignment: string;
  level: number;
  goals: string[];
  roleplayingHints: string[];
  deity: string;
  sex: string;
  uniqueTrait: string;
  backstory: string;
  age: number;
  occupation: string;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  inventory: Item[];
  gold: number;
  faction: {
    name: string;
    role: string;
    standing: "Leader" | "High-ranking" | "Member" | "Initiate";
    area: string;
  } | null;
  contacts: {
    name: string;
    faction: string;
    role: string;
    relationship: "Ally" | "Rival" | "Mentor" | "Friend" | "Business Partner";
  }[];
  boon: Boon;
  bane: Bane;
}

export type DndClass =
  | "Barbarian"
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Monk"
  | "Paladin"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Warlock"
  | "Wizard";

export type DndRace =
  | "Human"
  | "Elf"
  | "Dwarf"
  | "Halfling"
  | "Gnome"
  | "Half-Elf"
  | "Half-Orc"
  | "Tiefling"
  | "Dragonborn";

export type DndAlignment =
  | "Lawful Good"
  | "Neutral Good"
  | "Chaotic Good"
  | "Lawful Neutral"
  | "True Neutral"
  | "Chaotic Neutral"
  | "Lawful Evil"
  | "Neutral Evil"
  | "Chaotic Evil";

export type DndBackground =
  | "Acolyte"
  | "Criminal"
  | "Folk Hero"
  | "Noble"
  | "Sage"
  | "Soldier"
  | "Merchant"
  | "Entertainer"
  | "Outlander"
  | "Hermit";
