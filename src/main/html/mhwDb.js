/** Sever is the only section that's deleted if empty. all empty sections are partial data.
 * Empty ranks are deleted (HR/MR would be partial data). */
const monsterData = {
   "Acidic Glavenus": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Acidic Glavenus Shard", "itemCount": 1, "probability": 0.31},
               {"material": "Acidic Glavenus Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Acidic Glavenus Hardfang", "itemCount": 1, "probability": 0.19},
               {"material": "Acidic Glavenus Spineshell", "itemCount": 1, "probability": 0.14},
               {"material": "Acidic Glavenus Tailedge", "itemCount": 1, "probability": 0.09},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Acidic Glavenus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Acidic Glavenus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Acidic Glavenus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Honed Acidcryst", "itemCount": 1, "probability": 0.14},
               {"material": "Acidic Glavenus Spineshell", "itemCount": 1, "probability": 0.11},
               {"material": "Acidic Glavenus Tailedge", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Acidic Glavenus Hardfang", "itemCount": 1, "probability": 0.65},
               {"material": "Acidic Glavenus Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.03}],
            "back": [
               {"material": "Acidic Glavenus Spineshell", "itemCount": 1, "probability": 0.65},
               {"material": "Acidic Glavenus Cortex", "itemCount": 1, "probability": 0.35}],
            "foreleg": [
               {"material": "Acidic Glavenus Shard", "itemCount": 1, "probability": 0.7},
               {"material": "Acidic Glavenus Cortex", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Acidic Glavenus Tailedge", "itemCount": 1, "probability": 0.7},
               {"material": "Acidic Glavenus Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Acidic Glavenus Hardfang", "itemCount": 1, "probability": 0.2},
               {"material": "Honed Acidcryst", "itemCount": 1, "probability": 0.18},
               {"material": "Acidic Glavenus Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Acidic Glavenus Spineshell", "itemCount": 1, "probability": 0.14},
               {"material": "Acidic Glavenus Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Acidic Glavenus Tailedge", "itemCount": 1, "probability": 0.12},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Acidic Glavenus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Acidic Glavenus Spineshell", "itemCount": 1, "probability": 0.16},
               {"material": "Acidic Glavenus Tailedge", "itemCount": 1, "probability": 0.14},
               {"material": "Honed Acidcryst", "itemCount": 2, "probability": 0.14},
               {"material": "Acidic Glavenus Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Acidic Glavenus Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Acidic Glavenus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Acidic Glavenus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Acidic Glavenus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Honed Acidcryst", "itemCount": 1, "probability": 0.14},
               {"material": "Acidic Glavenus Spineshell", "itemCount": 1, "probability": 0.11},
               {"material": "Acidic Glavenus Tailedge", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Acidic Glavenus Cortex", "Acidic Glavenus Hardfang", "Acidic Glavenus Shard", "Acidic Glavenus Spineshell",
            "Acidic Glavenus Tailedge", "Ancient Feystone", "Carved Feystone", "Glavenus Mantle", "Honed Acidcryst",
            "Sealed Feystone"]
      }
   },
   "Alatreon": {
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Alatreon Mantle", "itemCount": 1, "probability": 0.32},
               {"material": "Alatreon Pallium", "itemCount": 1, "probability": 0.24},
               {"material": "Alatreon Riptalon", "itemCount": 1, "probability": 0.19},
               {"material": "Alatreon Direwing", "itemCount": 1, "probability": 0.12},
               {"material": "Alatreon Diretail", "itemCount": 1, "probability": 0.08},
               {"material": "Azure Dragonsphire", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Alatreon Pallium", "itemCount": 1, "probability": 0.31},
               {"material": "Alatreon Mantle", "itemCount": 1, "probability": 0.25},
               {"material": "Alatreon Riptalon", "itemCount": 1, "probability": 0.19},
               {"material": "Alatreon Direwing", "itemCount": 1, "probability": 0.13},
               {"material": "Alatreon Diretail", "itemCount": 1, "probability": 0.09},
               {"material": "Azure Dragonsphire", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "horn": [
               {"material": "Skyswayer", "itemCount": 1, "probability": 0.92},
               {"material": "Azure Dragonsphire", "itemCount": 1, "probability": 0.08}],
            "wings": [{"material": "Alatreon Direwing", "itemCount": 1, "probability": 1}],
            "foreleg": [
               {"material": "Alatreon Pallium", "itemCount": 1, "probability": 0.69},
               {"material": "Alatreon Mantle", "itemCount": 1, "probability": 0.3},
               {"material": "Azure Dragonsphire", "itemCount": 1, "probability": 0.01}]
         },
         "Sever": {
            "tail": [
               {"material": "Alatreon Diretail", "itemCount": 1, "probability": 0.91},
               {"material": "Azure Dragonsphire", "itemCount": 1, "probability": 0.09}]
         },
         "Investigation": {},
         "material": [
            "Alatreon Diretail", "Alatreon Direwing", "Alatreon Mantle", "Alatreon Pallium", "Alatreon Riptalon",
            "Azure Dragonsphire", "Skyswayer"]
      }
   },
   "Ancient Leshen": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Ancient Leshen Claw", "itemCount": 1, "probability": 0.4},
               {"material": "Ancient Cursed Bone", "itemCount": 1, "probability": 0.3},
               {"material": "Leshen Resin", "itemCount": 1, "probability": 0.25},
               {"material": "Mutagen", "itemCount": 1, "probability": 0.05}],
            "Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Break": {
            "antlers": [
               {"material": "Ancient Leshen Antlers", "itemCount": 1, "probability": 0.93},
               {"material": "Mutagen", "itemCount": 1, "probability": 0.07}],
            "body": [
               {"material": "Leshen Resin", "itemCount": 1, "probability": 0.93},
               {"material": "Mutagen", "itemCount": 1, "probability": 0.07}]
         },
         "Investigation": {},
         "material": [
            "Ancient Cursed Bone", "Ancient Leshen Antlers", "Ancient Leshen Claw", "Leshen Resin", "Monster Bone L", "Mutagen"]
      }
   },
   "Anjanath": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Anjanath Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Anjanath Pelt", "itemCount": 1, "probability": 0.25},
               {"material": "Anjanath Nosebone", "itemCount": 1, "probability": 0.2},
               {"material": "Anjanath Fang", "itemCount": 1, "probability": 0.15},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Anjanath Pelt", "itemCount": 1, "probability": 0.27},
               {"material": "Anjanath Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Flame Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Nosebone", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Bone L", "itemCount": 2, "probability": 0.1},
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Anjanath Fang", "itemCount": 1, "probability": 0.62},
               {"material": "Anjanath Nosebone", "itemCount": 1, "probability": 0.35},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.03}],
            "hindlegs": [{"material": "Anjanath Scale", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Anjanath Scale", "itemCount": 1, "probability": 0.25},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.21},
               {"material": "Anjanath Fang", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Nosebone", "itemCount": 1, "probability": 0.17},
               {"material": "Flame Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Anjanath Pelt", "itemCount": 2, "probability": 0.12},
               {"material": "Anjanath Scale", "itemCount": 2, "probability": 0.1},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.21},
               {"material": "Anjanath Fang", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Anjanath Nosebone", "itemCount": 1, "probability": 0.15},
               {"material": "Flame Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Anjanath Pelt", "itemCount": 3, "probability": 0.1},
               {"material": "Anjanath Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Anjanath Pelt", "itemCount": 1, "probability": 0.27},
               {"material": "Anjanath Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Flame Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Nosebone", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Bone L", "itemCount": 2, "probability": 0.1},
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Anjanath Fang", "Anjanath Nosebone", "Anjanath Pelt", "Anjanath Plate", "Anjanath Scale", "Anjanath Tail", "Flame Sac",
            "Monster Bone L"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Anjanath Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Anjanath Pelt+", "itemCount": 1, "probability": 0.24},
               {"material": "Anjanath Nosebone+", "itemCount": 1, "probability": 0.2},
               {"material": "Anjanath Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Anjanath Pelt+", "itemCount": 1, "probability": 0.27},
               {"material": "Anjanath Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Nosebone+", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Anjanath Fang+", "itemCount": 1, "probability": 0.62},
               {"material": "Anjanath Nosebone+", "itemCount": 1, "probability": 0.35},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.03}],
            "hindlegs": [{"material": "Anjanath Scale+", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Anjanath Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.07},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Anjanath Fang+", "itemCount": 1, "probability": 0.24},
               {"material": "Anjanath Nosebone+", "itemCount": 1, "probability": 0.2},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Anjanath Pelt+", "itemCount": 2, "probability": 0.14},
               {"material": "Anjanath Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.1},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Anjanath Fang+", "itemCount": 1, "probability": 0.23},
               {"material": "Anjanath Nosebone+", "itemCount": 1, "probability": 0.19},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Inferno Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Anjanath Pelt+", "itemCount": 3, "probability": 0.12},
               {"material": "Anjanath Scale+", "itemCount": 3, "probability": 0.11},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Anjanath Pelt+", "itemCount": 1, "probability": 0.27},
               {"material": "Anjanath Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Nosebone+", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Anjanath Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Anjanath Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Anjanath Fang+", "Anjanath Gem", "Anjanath Nosebone+", "Anjanath Pelt+", "Anjanath Plate", "Anjanath Scale+",
            "Anjanath Tail", "Glowing Feystone", "Inferno Sac", "Monster Keenbone", "Mysterious Feystone", "Warped Feystone",
            "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Anjanath Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Anjanath Fur", "itemCount": 1, "probability": 0.24},
               {"material": "Heavy Anjanath Nosebone", "itemCount": 1, "probability": 0.2},
               {"material": "Anjanath Hardfang", "itemCount": 1, "probability": 0.15},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Anjanath Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Anjanath Fur", "itemCount": 1, "probability": 0.29},
               {"material": "Anjanath Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Heavy Anjanath Nosebone", "itemCount": 1, "probability": 0.14},
               {"material": "Anjanath Lash", "itemCount": 1, "probability": 0.1},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Anjanath Hardfang", "itemCount": 1, "probability": 0.62},
               {"material": "Heavy Anjanath Nosebone", "itemCount": 1, "probability": 0.35},
               {"material": "Anjanath Mantle", "itemCount": 1, "probability": 0.03}],
            "hindlegs": [{"material": "Anjanath Shard", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Anjanath Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Anjanath Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.07},
               {"material": "Anjanath Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Anjanath Lash", "itemCount": 1, "probability": 0.23},
               {"material": "Anjanath Hardfang", "itemCount": 1, "probability": 0.19},
               {"material": "Heavy Anjanath Nosebone", "itemCount": 1, "probability": 0.19},
               {"material": "Anjanath Fur", "itemCount": 2, "probability": 0.16},
               {"material": "Anjanath Shard", "itemCount": 2, "probability": 0.13},
               {"material": "Anjanath Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Anjanath Hardfang", "itemCount": 1, "probability": 0.21},
               {"material": "Heavy Anjanath Nosebone", "itemCount": 1, "probability": 0.21},
               {"material": "Anjanath Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Anjanath Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Anjanath Fur", "itemCount": 3, "probability": 0.12},
               {"material": "Anjanath Shard", "itemCount": 3, "probability": 0.09}],
            "Bronze": [
               {"material": "Anjanath Fur", "itemCount": 1, "probability": 0.29},
               {"material": "Anjanath Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Heavy Anjanath Nosebone", "itemCount": 1, "probability": 0.14},
               {"material": "Anjanath Lash", "itemCount": 1, "probability": 0.1},
               {"material": "Anjanath Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Anjanath Fur", "Anjanath Gem", "Anjanath Hardfang", "Anjanath Lash", "Anjanath Mantle",
            "Anjanath Shard", "Carved Feystone", "Conflagrant Sac", "Heavy Anjanath Nosebone"]
      }
   },
   "Azure Rathalos": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Azure Rathalos Scale+", "itemCount": 1, "probability": 0.33},
               {"material": "Azure Rathalos Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Azure Rathalos Wing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Azure Rathalos Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Azure Rathalos Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Azure Rathalos Wing", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Azure Rathalos Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Azure Rathalos Scale+", "itemCount": 1, "probability": 0.65},
               {"material": "Azure Rathalos Carapace", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.04},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Azure Rathalos Carapace", "itemCount": 1, "probability": 0.69},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Azure Rathalos Wing", "itemCount": 1, "probability": 0.65},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Azure Rathalos Tail", "itemCount": 1, "probability": 0.65},
               {"material": "Azure Rathalos Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Azure Rathalos Tail", "itemCount": 1, "probability": 0.2},
               {"material": "Azure Rathalos Wing", "itemCount": 1, "probability": 0.2},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Azure Rathalos Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.13},
               {"material": "Azure Rathalos Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.07}],
            "Gold": [
               {"material": "Azure Rathalos Tail", "itemCount": 1, "probability": 0.2},
               {"material": "Azure Rathalos Wing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.14},
               {"material": "Inferno Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Azure Rathalos Scale+", "itemCount": 3, "probability": 0.1},
               {"material": "Azure Rathalos Carapace", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Azure Rathalos Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Azure Rathalos Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Azure Rathalos Wing", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Azure Rathalos Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Azure Rathalos Carapace", "Azure Rathalos Scale+", "Azure Rathalos Tail", "Azure Rathalos Wing", "Glowing Feystone",
            "Inferno Sac", "Monster Hardbone", "Rath Wingtalon", "Rathalos Medulla", "Rathalos Plate", "Rathalos Ruby",
            "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Azure Rathalos Shard", "itemCount": 1, "probability": 0.33},
               {"material": "Azure Rathalos Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Azure Rathalos Fellwing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Azure Rathalos Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Azure Rathalos Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Azure Rathalos Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.1},
               {"material": "Azure Rathalos Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Azure Rathalos Cortex", "itemCount": 1, "probability": 0.65},
               {"material": "Azure Rathalos Shard", "itemCount": 1, "probability": 0.27},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.03}],
            "back": [
               {"material": "Azure Rathalos Cortex", "itemCount": 1, "probability": 0.68},
               {"material": "Rathalos Medulla", "itemCount": 2, "probability": 0.3},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Azure Rathalos Fellwing", "itemCount": 1, "probability": 0.65},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Azure Rathalos Lash", "itemCount": 1, "probability": 0.65},
               {"material": "Azure Rathalos Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Azure Rathalos Cortex", "itemCount": 2, "probability": 0.22},
               {"material": "Azure Rathalos Lash", "itemCount": 1, "probability": 0.21},
               {"material": "Azure Rathalos Shard", "itemCount": 2, "probability": 0.2},
               {"material": "Azure Rathalos Fellwing", "itemCount": 1, "probability": 0.17},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.1},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Azure Rathalos Lash", "itemCount": 1, "probability": 0.24},
               {"material": "Azure Rathalos Fellwing", "itemCount": 1, "probability": 0.19},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Azure Rathalos Cortex", "itemCount": 3, "probability": 0.16},
               {"material": "Azure Rathalos Shard", "itemCount": 3, "probability": 0.13},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Azure Rathalos Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Azure Rathalos Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Azure Rathalos Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.1},
               {"material": "Azure Rathalos Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Azure Rathalos Cortex", "Azure Rathalos Fellwing", "Azure Rathalos Lash", "Azure Rathalos Shard",
            "Carved Feystone", "Conflagrant Sac", "Rath Wingtalon+", "Rathalos Mantle", "Rathalos Medulla", "Rathalos Ruby",
            "Sealed Feystone"]
      }
   },
   "Banbaro": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Glowing Feystone", "Mysterious Feystone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Banbaro Cortex", "itemCount": 1, "probability": 0.36},
               {"material": "Banbaro Chine", "itemCount": 1, "probability": 0.28},
               {"material": "Banbaro Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Banbaro Great Horn", "itemCount": 1, "probability": 0.15},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Banbaro Chine", "itemCount": 1, "probability": 0.3},
               {"material": "Banbaro Cortex", "itemCount": 1, "probability": 0.23},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.18},
               {"material": "Banbaro Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Banbaro Great Horn", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "horn": [{"material": "Banbaro Great Horn", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Banbaro Chine", "itemCount": 1, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Banbaro Lash", "itemCount": 1, "probability": 0.77},
               {"material": "Banbaro Cortex", "itemCount": 1, "probability": 0.2},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Banbaro Chine", "itemCount": 2, "probability": 0.28},
               {"material": "Banbaro Cortex", "itemCount": 2, "probability": 0.24},
               {"material": "Banbaro Lash", "itemCount": 1, "probability": 0.21},
               {"material": "Banbaro Great Horn", "itemCount": 1, "probability": 0.17},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Banbaro Lash", "itemCount": 1, "probability": 0.25},
               {"material": "Banbaro Chine", "itemCount": 3, "probability": 0.2},
               {"material": "Banbaro Great Horn", "itemCount": 1, "probability": 0.2},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Banbaro Cortex", "itemCount": 3, "probability": 0.17}],
            "Bronze": [
               {"material": "Banbaro Chine", "itemCount": 1, "probability": 0.3},
               {"material": "Banbaro Cortex", "itemCount": 1, "probability": 0.23},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.18},
               {"material": "Banbaro Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Banbaro Great Horn", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Banbaro Chine", "Banbaro Cortex", "Banbaro Great Horn", "Banbaro Lash", "Carved Feystone",
            "Dash Extract", "Large Wyvern Gem"]
      }
   },
   "Barioth": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Barioth Cortex", "itemCount": 1, "probability": 0.3},
               {"material": "Barioth Thickfur", "itemCount": 1, "probability": 0.24},
               {"material": "Barioth Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Barioth Greatspike", "itemCount": 1, "probability": 0.15},
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Barioth Thickfur", "itemCount": 1, "probability": 0.27},
               {"material": "Barioth Cortex", "itemCount": 1, "probability": 0.21},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Barioth Greatspike", "itemCount": 1, "probability": 0.13},
               {"material": "Barioth Hardclaw", "itemCount": 1, "probability": 0.11},
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "head": [{"material": "Amber Hardfang", "itemCount": 1, "probability": 1}],
            "forelimbs": [
               {"material": "Barioth Hardclaw", "itemCount": 1, "probability": 0.65},
               {"material": "Barioth Greatspike", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.6},
               {"material": "Barioth Greatspike", "itemCount": 1, "probability": 0.35},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Amber Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Barioth Thickfur", "itemCount": 2, "probability": 0.14},
               {"material": "Cryo Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.12},
               {"material": "Barioth Cortex", "itemCount": 2, "probability": 0.12},
               {"material": "Barioth Hardclaw", "itemCount": 2, "probability": 0.09},
               {"material": "Barioth Greatspike", "itemCount": 2, "probability": 0.09}],
            "Gold": [
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Amber Hardfang", "itemCount": 1, "probability": 0.22},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Barioth Hardclaw", "itemCount": 2, "probability": 0.14},
               {"material": "Barioth Greatspike", "itemCount": 2, "probability": 0.14},
               {"material": "Cryo Sac", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Barioth Thickfur", "itemCount": 1, "probability": 0.27},
               {"material": "Barioth Cortex", "itemCount": 1, "probability": 0.21},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Barioth Greatspike", "itemCount": 1, "probability": 0.13},
               {"material": "Barioth Hardclaw", "itemCount": 1, "probability": 0.11},
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Amber Hardfang", "Ancient Feystone", "Barioth Cortex", "Barioth Greatspike", "Barioth Hardclaw", "Barioth Lash",
            "Barioth Thickfur", "Carved Feystone", "Cryo Sac", "Large Wyvern Gem", "Sealed Feystone"]
      }
   },
   "Barroth": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Barroth Shell", "itemCount": 1, "probability": 0.31},
               {"material": "Barroth Ridge", "itemCount": 1, "probability": 0.24},
               {"material": "Barroth Claw", "itemCount": 1, "probability": 0.18},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.15},
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Barroth Ridge", "itemCount": 1, "probability": 0.26},
               {"material": "Barroth Shell", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Claw", "itemCount": 1, "probability": 0.16},
               {"material": "Fertile Mud", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone M", "itemCount": 1, "probability": 0.13},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "forelimbs": [{"material": "Barroth Claw", "itemCount": 1, "probability": 1}],
            "hindlegs": [{"material": "Barroth Shell", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Barroth Shell", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Barroth Claw", "itemCount": 1, "probability": 0.22},
               {"material": "Barroth Ridge", "itemCount": 2, "probability": 0.18},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.18},
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Shell", "itemCount": 2, "probability": 0.14},
               {"material": "Fertile Mud", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Barroth Claw", "itemCount": 1, "probability": 0.24},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.22},
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Ridge", "itemCount": 3, "probability": 0.14},
               {"material": "Barroth Shell", "itemCount": 3, "probability": 0.1},
               {"material": "Fertile Mud", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Barroth Ridge", "itemCount": 1, "probability": 0.26},
               {"material": "Barroth Shell", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Claw", "itemCount": 1, "probability": 0.16},
               {"material": "Fertile Mud", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone M", "itemCount": 1, "probability": 0.13},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Barroth Claw", "Barroth Ridge", "Barroth Scalp", "Barroth Shell", "Barroth Tail", "Fertile Mud", "Monster Bone M"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Barroth Carapace", "itemCount": 1, "probability": 0.3},
               {"material": "Barroth Ridge+", "itemCount": 1, "probability": 0.24},
               {"material": "Barroth Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.15},
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.11},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Barroth Ridge+", "itemCount": 1, "probability": 0.25},
               {"material": "Barroth Carapace", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Claw+", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.15},
               {"material": "Fertile Mud", "itemCount": 2, "probability": 0.12},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.11},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "forelimbs": [{"material": "Barroth Claw+", "itemCount": 1, "probability": 1}],
            "hindlegs": [{"material": "Barroth Carapace", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Barroth Carapace", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Barroth Claw+", "itemCount": 1, "probability": 0.26},
               {"material": "Barroth Ridge+", "itemCount": 2, "probability": 0.18},
               {"material": "Barroth Scalp", "itemCount": 2, "probability": 0.18},
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Barroth Claw+", "itemCount": 1, "probability": 0.26},
               {"material": "Barroth Scalp", "itemCount": 2, "probability": 0.18},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Ridge+", "itemCount": 3, "probability": 0.14},
               {"material": "Barroth Carapace", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Barroth Ridge+", "itemCount": 1, "probability": 0.25},
               {"material": "Barroth Carapace", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Claw+", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.15},
               {"material": "Fertile Mud", "itemCount": 2, "probability": 0.12},
               {"material": "Barroth Scalp", "itemCount": 1, "probability": 0.11},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Barroth Carapace", "Barroth Claw+", "Barroth Ridge+", "Barroth Scalp", "Barroth Tail", "Fertile Mud", "Glowing Feystone",
            "Monster Keenbone", "Mysterious Feystone", "Warped Feystone", "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Barroth Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Barroth Chine", "itemCount": 1, "probability": 0.23},
               {"material": "Barroth Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Barroth Crown", "itemCount": 1, "probability": 0.14},
               {"material": "Barroth Lash", "itemCount": 1, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Barroth Chine", "itemCount": 1, "probability": 0.3},
               {"material": "Barroth Cortex", "itemCount": 1, "probability": 0.21},
               {"material": "Rich Mud", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Crown", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "forelimbs": [{"material": "Barroth Hardclaw", "itemCount": 1, "probability": 1}],
            "hindlegs": [{"material": "Barroth Cortex", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Barroth Lash", "itemCount": 1, "probability": 0.8},
               {"material": "Barroth Cortex", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Barroth Hardclaw", "itemCount": 1, "probability": 0.26},
               {"material": "Barroth Chine", "itemCount": 2, "probability": 0.18},
               {"material": "Barroth Crown", "itemCount": 2, "probability": 0.18},
               {"material": "Barroth Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Barroth Hardclaw", "itemCount": 1, "probability": 0.26},
               {"material": "Barroth Crown", "itemCount": 2, "probability": 0.18},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Chine", "itemCount": 3, "probability": 0.14},
               {"material": "Barroth Cortex", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Barroth Chine", "itemCount": 1, "probability": 0.3},
               {"material": "Barroth Cortex", "itemCount": 1, "probability": 0.21},
               {"material": "Rich Mud", "itemCount": 1, "probability": 0.2},
               {"material": "Barroth Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Barroth Crown", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Barroth Chine", "Barroth Cortex", "Barroth Crown", "Barroth Hardclaw", "Barroth Lash",
            "Carved Feystone", "Large Wyvern Gem", "Rich Mud", "Wyvern Gem"]
      }
   },
   "Bazelgeuse": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Bazelgeuse Scale+", "itemCount": 1, "probability": 0.32},
               {"material": "Bazelgeuse Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Bazelgeuse Talon", "itemCount": 1, "probability": 0.17},
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.14},
               {"material": "Bazelgeuse Wing", "itemCount": 1, "probability": 0.11},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Bazelgeuse Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Bazelgeuse Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Bazelgeuse Talon", "itemCount": 1, "probability": 0.14},
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.11},
               {"material": "Bazelgeuse Wing", "itemCount": 1, "probability": 0.09},
               {"material": "Bazelgeuse Tail", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.66},
               {"material": "Bazelgeuse Scale+", "itemCount": 2, "probability": 0.32},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.02}],
            "back": [
               {"material": "Bazelgeuse Carapace", "itemCount": 1, "probability": 0.69},
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.3},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Bazelgeuse Wing", "itemCount": 1, "probability": 0.65},
               {"material": "Bazelgeuse Talon", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Bazelgeuse Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Bazelgeuse Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Bazelgeuse Talon", "itemCount": 1, "probability": 0.24},
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.18},
               {"material": "Bazelgeuse Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Bazelgeuse Wing", "itemCount": 1, "probability": 0.14},
               {"material": "Bazelgeuse Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Bazelgeuse Tail", "itemCount": 1, "probability": 0.12},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Bazelgeuse Talon", "itemCount": 1, "probability": 0.23},
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.16},
               {"material": "Bazelgeuse Wing", "itemCount": 1, "probability": 0.14},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Bazelgeuse Carapace", "itemCount": 3, "probability": 0.12},
               {"material": "Bazelgeuse Tail", "itemCount": 1, "probability": 0.12},
               {"material": "Bazelgeuse Scale+", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Bazelgeuse Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Bazelgeuse Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Bazelgeuse Talon", "itemCount": 1, "probability": 0.14},
               {"material": "Bazelgeuse Fuse", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.11},
               {"material": "Bazelgeuse Wing", "itemCount": 1, "probability": 0.09},
               {"material": "Bazelgeuse Tail", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Bazelgeuse Carapace", "Bazelgeuse Fuse", "Bazelgeuse Gem", "Bazelgeuse Scale+", "Bazelgeuse Tail", "Bazelgeuse Talon",
            "Bazelgeuse Wing", "Glowing Feystone", "Monster Hardbone", "Shining Streamstone", "Sullied Streamstone",
            "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {"Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]},
         "Break": {
            "head": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "wings": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Gold": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Bronze": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}]
         },
         "material": ["Ancient Feystone", "Carved Feystone", "Iron Ore", "Monster Bone L", "Sealed Feystone"]
      }
   },
   "Behemoth": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Behemoth Mane", "itemCount": 1, "probability": 0.35},
               {"material": "Behemoth Bone", "itemCount": 1, "probability": 0.29},
               {"material": "Behemoth Shearclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Behemoth Tail", "itemCount": 1, "probability": 0.13},
               {"material": "Behemoth Great Horn", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Behemoth Bone", "itemCount": 1, "probability": 0.32},
               {"material": "Aetheryte Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Behemoth Mane", "itemCount": 1, "probability": 0.21},
               {"material": "Behemoth Shearclaw", "itemCount": 1, "probability": 0.14},
               {"material": "Behemoth Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Behemoth Great Horn", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "horn": [{"material": "Behemoth Great Horn", "itemCount": 1, "probability": 1}],
            "foreleg": [{"material": "Behemoth Shearclaw", "itemCount": 1, "probability": 1}]
         },
         "Sever": {"tail": [{"material": "Behemoth Tail", "itemCount": 1, "probability": 1}]},
         "Investigation": {
            "Silver": [
               {"material": "Behemoth Bone", "itemCount": 1, "probability": 0.32},
               {"material": "Aetheryte Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Behemoth Mane", "itemCount": 1, "probability": 0.21},
               {"material": "Behemoth Shearclaw", "itemCount": 1, "probability": 0.14},
               {"material": "Behemoth Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Behemoth Great Horn", "itemCount": 1, "probability": 0.03}],
            "Gold": [
               {"material": "Behemoth Bone", "itemCount": 1, "probability": 0.32},
               {"material": "Aetheryte Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Behemoth Mane", "itemCount": 1, "probability": 0.21},
               {"material": "Behemoth Shearclaw", "itemCount": 1, "probability": 0.14},
               {"material": "Behemoth Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Behemoth Great Horn", "itemCount": 1, "probability": 0.03}],
            "Bronze": [
               {"material": "Kulve Taroth Golden Shell", "itemCount": 1, "probability": 0.33},
               {"material": "Kulve Taroth Golden Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Kulve Taroth Golden Tailshell", "itemCount": 1, "probability": 0.18},
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Elder Dragon Bone", "itemCount": 3, "probability": 0.07},
               {"material": "Elder Dragon Blood", "itemCount": 3, "probability": 0.07}]
         },
         "material": [
            "Aetheryte Shard", "Behemoth Bone", "Behemoth Great Horn", "Behemoth Mane", "Behemoth Shearclaw", "Behemoth Tail",
            "Elder Dragon Blood", "Elder Dragon Bone", "Kulve Taroth Golden Scale", "Kulve Taroth Golden Shell",
            "Kulve Taroth Golden Spiralhorn", "Kulve Taroth Golden Tailshell", "Monster Bone L"]
      },
      "Master Rank": {
         "General": {"Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]},
         "Break": {
            "horn": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "foreleg": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Silver": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Gold": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Bronze": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}]
         },
         "material": ["Iron Ore", "Monster Bone L"]
      }
   },
   "Beotodus": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Glowing Feystone", "Mysterious Feystone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Beotodus Shard", "itemCount": 1, "probability": 0.36},
               {"material": "Beotodus Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.2},
               {"material": "Beotodus Hardhorn", "itemCount": 1, "probability": 0.15},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Beotodus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Beotodus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Beotodus Hardhorn", "itemCount": 1, "probability": 0.16},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [{"material": "Beotodus Hardhorn", "itemCount": 1, "probability": 1}],
            "fin": [
               {"material": "Beotodus Cortex", "itemCount": 2, "probability": 0.75},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.25}],
            "tail": [
               {"material": "Beotodus Shard", "itemCount": 2, "probability": 0.75},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.25}],
            "leg fins": [{"material": "Beotodus Grandfin", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Beotodus Hardhorn", "itemCount": 1, "probability": 0.32},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.23},
               {"material": "Beotodus Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Cryo Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Beotodus Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Beotodus Hardhorn", "itemCount": 1, "probability": 0.3},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.24},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Beotodus Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Cryo Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Beotodus Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Beotodus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Beotodus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Beotodus Hardhorn", "itemCount": 1, "probability": 0.16},
               {"material": "Beotodus Grandfin", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Beotodus Cortex", "Beotodus Grandfin", "Beotodus Hardhorn", "Beotodus Shard", "Carved Feystone",
            "Cryo Sac", "Large Wyvern Gem"]
      }
   },
   "Black Diablos": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Black Diablos Carapace", "itemCount": 1, "probability": 0.31},
               {"material": "Black Diablos Ridge+", "itemCount": 1, "probability": 0.24},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.13},
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.12},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.04}],
            "Hunt": [
               {"material": "Black Diablos Ridge+", "itemCount": 1, "probability": 0.26},
               {"material": "Black Diablos Carapace", "itemCount": 1, "probability": 0.21},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 2, "probability": 0.14},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "horns": [
               {"material": "Black Spiral Horn+", "itemCount": 1, "probability": 0.65},
               {"material": "Twisted Horn", "itemCount": 2, "probability": 0.35}],
            "back": [
               {"material": "Black Diablos Ridge+", "itemCount": 1, "probability": 0.7},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.4},
               {"material": "Black Diablos Carapace", "itemCount": 1, "probability": 0.34},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.22},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.04}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.2},
               {"material": "Black Diablos Ridge+", "itemCount": 2, "probability": 0.2},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Black Diablos Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Black Spiral Horn+", "itemCount": 1, "probability": 0.14},
               {"material": "Diablos Fang", "itemCount": 2, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.24},
               {"material": "Black Spiral Horn+", "itemCount": 1, "probability": 0.18},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Black Diablos Ridge+", "itemCount": 3, "probability": 0.12},
               {"material": "Black Diablos Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Diablos Fang", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Black Diablos Ridge+", "itemCount": 1, "probability": 0.26},
               {"material": "Black Diablos Carapace", "itemCount": 1, "probability": 0.21},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 2, "probability": 0.14},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Black Diablos Carapace", "Black Diablos Ridge+", "Black Spiral Horn+", "Blos Medulla", "Dash Extract", "Diablos Fang",
            "Diablos Tailcase", "Glowing Feystone", "Monster Hardbone", "Shining Streamstone", "Sullied Streamstone", "Twisted Horn",
            "Warped Feystone", "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Black Diablos Cortex", "itemCount": 1, "probability": 0.34},
               {"material": "Black Diablos Chine", "itemCount": 1, "probability": 0.26},
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.15},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.12},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Black Diablos Chine", "itemCount": 1, "probability": 0.33},
               {"material": "Black Diablos Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.15},
               {"material": "Blackcurl Stouthorn", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 2, "probability": 0.09},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "horns": [
               {"material": "Blackcurl Stouthorn", "itemCount": 1, "probability": 0.83},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.17}],
            "back": [
               {"material": "Black Diablos Chine", "itemCount": 1, "probability": 0.7},
               {"material": "Blos Medulla", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.6},
               {"material": "Black Diablos Cortex", "itemCount": 1, "probability": 0.35},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Black Diablos Chine", "itemCount": 2, "probability": 0.25},
               {"material": "Black Diablos Cortex", "itemCount": 2, "probability": 0.21},
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.18},
               {"material": "Blackcurl Stouthorn", "itemCount": 1, "probability": 0.16},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.12},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.18},
               {"material": "Blackcurl Stouthorn", "itemCount": 1, "probability": 0.18},
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.17},
               {"material": "Black Diablos Chine", "itemCount": 3, "probability": 0.16},
               {"material": "Black Diablos Cortex", "itemCount": 3, "probability": 0.13}],
            "Bronze": [
               {"material": "Black Diablos Chine", "itemCount": 1, "probability": 0.33},
               {"material": "Black Diablos Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.15},
               {"material": "Blackcurl Stouthorn", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 2, "probability": 0.09},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Black Diablos Chine", "Black Diablos Cortex", "Blackcurl Stouthorn", "Blos Medulla",
            "Carved Feystone", "Dash Extract", "Diablos Hardhorn", "Diablos Tailcase+", "Large Wyvern Gem", "Sealed Feystone",
            "Wyvern Gem"]
      }
   },
   "Blackveil Vaal Hazak": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Deceased Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Vaal Hazak Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Vaal Hazak Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Shadowpierce Fang", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Vaal Hazak Cortex", "itemCount": 1, "probability": 0.23},
               {"material": "Deceased Shard", "itemCount": 1, "probability": 0.18},
               {"material": "Vaal Hazak Fellwing", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Flail", "itemCount": 1, "probability": 0.13},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Deathweaver Membrane", "itemCount": 1, "probability": 0.09},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Shadowpierce Fang", "itemCount": 1, "probability": 0.66},
               {"material": "Deathweaver Membrane", "itemCount": 1, "probability": 0.32},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "forelimbs": [
               {"material": "Vaal Hazak Hardclaw", "itemCount": 1, "probability": 0.8},
               {"material": "Vaal Hazak Cortex", "itemCount": 1, "probability": 0.2}],
            "stomach": [
               {"material": "Vaal Hazak Fellwing", "itemCount": 1, "probability": 0.7},
               {"material": "Deathweaver Membrane", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Vaal Hazak Flail", "itemCount": 1, "probability": 0.75},
               {"material": "Deceased Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Deathweaver Membrane", "itemCount": 1, "probability": 0.22},
               {"material": "Vaal Hazak Hardclaw", "itemCount": 1, "probability": 0.22},
               {"material": "Vaal Hazak Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Vaal Hazak Flail", "itemCount": 1, "probability": 0.16},
               {"material": "Shadowpierce Fang", "itemCount": 1, "probability": 0.14},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Vaal Hazak Flail", "itemCount": 1, "probability": 0.22},
               {"material": "Shadowpierce Fang", "itemCount": 1, "probability": 0.18},
               {"material": "Vaal Hazak Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Deathweaver Membrane", "itemCount": 2, "probability": 0.14},
               {"material": "Vaal Hazak Hardclaw", "itemCount": 2, "probability": 0.12}],
            "Bronze": [
               {"material": "Vaal Hazak Cortex", "itemCount": 1, "probability": 0.23},
               {"material": "Deceased Shard", "itemCount": 1, "probability": 0.18},
               {"material": "Vaal Hazak Fellwing", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Flail", "itemCount": 1, "probability": 0.13},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Deathweaver Membrane", "itemCount": 1, "probability": 0.09},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Carved Feystone", "Deathweaver Membrane", "Deceased Shard", "Large Elder Dragon Bone", "Large Elder Dragon Gem",
            "Pure Dragon Blood", "Sealed Feystone", "Shadowpierce Fang", "Vaal Hazak Cortex", "Vaal Hazak Fellwing",
            "Vaal Hazak Flail", "Vaal Hazak Gem", "Vaal Hazak Hardclaw"]
      }
   },
   "Brachydios": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Brachydios Cortex", "itemCount": 1, "probability": 0.32},
               {"material": "Fine Brachydios Ebonshell", "itemCount": 1, "probability": 0.24},
               {"material": "Brachydios Pounder+", "itemCount": 1, "probability": 0.19},
               {"material": "Brachydios Crown", "itemCount": 1, "probability": 0.14},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Fine Brachydios Ebonshell", "itemCount": 1, "probability": 0.28},
               {"material": "Brachydios Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Brachydios Pounder+", "itemCount": 1, "probability": 0.16},
               {"material": "Glowing Slime", "itemCount": 1, "probability": 0.14},
               {"material": "Brachydios Crown", "itemCount": 1, "probability": 0.11},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Brachydios Crown", "itemCount": 1, "probability": 0.66},
               {"material": "Brachydios Cortex", "itemCount": 1, "probability": 0.32},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.02}],
            "foreleg": [
               {"material": "Brachydios Pounder+", "itemCount": 1, "probability": 0.97},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.03}]
         },
         "Sever": {
            "tail": [
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Fine Brachydios Ebonshell", "itemCount": 1, "probability": 0.27},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Brachydios Pounder+", "itemCount": 1, "probability": 0.22},
               {"material": "Glowing Slime", "itemCount": 1, "probability": 0.18},
               {"material": "Fine Brachydios Ebonshell", "itemCount": 2, "probability": 0.14},
               {"material": "Brachydios Crown", "itemCount": 1, "probability": 0.14},
               {"material": "Brachydios Cortex", "itemCount": 2, "probability": 0.12},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.12},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Brachydios Pounder+", "itemCount": 1, "probability": 0.18},
               {"material": "Brachydios Crown", "itemCount": 1, "probability": 0.16},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.16},
               {"material": "Glowing Slime", "itemCount": 2, "probability": 0.14},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Fine Brachydios Ebonshell", "itemCount": 3, "probability": 0.12},
               {"material": "Brachydios Cortex", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Fine Brachydios Ebonshell", "itemCount": 1, "probability": 0.28},
               {"material": "Brachydios Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Brachydios Pounder+", "itemCount": 1, "probability": 0.16},
               {"material": "Glowing Slime", "itemCount": 1, "probability": 0.14},
               {"material": "Brachydios Crown", "itemCount": 1, "probability": 0.11},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Ancient Feystone", "Brachydios Cortex", "Brachydios Crown", "Brachydios Lash", "Brachydios Pallium",
            "Brachydios Pounder+", "Carved Feystone", "Fine Brachydios Ebonshell", "Glowing Slime", "Sealed Feystone"]
      }
   },
   "Brute Tigrex": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Brute Tigrex Shard", "itemCount": 1, "probability": 0.35},
               {"material": "Brute Tigrex Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Brute Tigrex Hardclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Brute Tigrex Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Brute Tigrex Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Brute Tigrex Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Solidbone", "itemCount": 1, "probability": 0.18},
               {"material": "Brute Tigrex Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Brute Tigrex Hardfang", "itemCount": 1, "probability": 0.13},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Brute Tigrex Hardfang", "itemCount": 1, "probability": 0.63},
               {"material": "Brute Tigrex Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.03}],
            "claws": [
               {"material": "Brute Tigrex Hardclaw", "itemCount": 1, "probability": 0.75},
               {"material": "Brute Tigrex Shard", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.72},
               {"material": "Brute Tigrex Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Brute Tigrex Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Brute Tigrex Hardfang", "itemCount": 1, "probability": 0.2},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Brute Tigrex Cortex", "itemCount": 2, "probability": 0.18},
               {"material": "Brute Tigrex Shard", "itemCount": 2, "probability": 0.14},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Brute Tigrex Hardclaw", "itemCount": 1, "probability": 0.22},
               {"material": "Brute Tigrex Hardfang", "itemCount": 1, "probability": 0.22},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Brute Tigrex Cortex", "itemCount": 3, "probability": 0.13},
               {"material": "Brute Tigrex Shard", "itemCount": 3, "probability": 0.11}],
            "Bronze": [
               {"material": "Brute Tigrex Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Brute Tigrex Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Solidbone", "itemCount": 1, "probability": 0.18},
               {"material": "Brute Tigrex Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Brute Tigrex Hardfang", "itemCount": 1, "probability": 0.13},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Ancient Feystone", "Brute Tigrex Cortex", "Brute Tigrex Hardclaw", "Brute Tigrex Hardfang", "Brute Tigrex Shard",
            "Carved Feystone", "Monster Solidbone", "Sealed Feystone", "Tigrex Lash", "Tigrex Mantle"]
      }
   },
   "Coral Pukei-Pukei": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Glowing Feystone", "Mysterious Feystone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 1, "probability": 0.29},
               {"material": "Coral Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Coral Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Large Coral Pukei-Pukei Sac", "itemCount": 1, "probability": 0.14},
               {"material": "Coral Pukei-Pukei Lash", "itemCount": 1, "probability": 0.12},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Coral Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Flood Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Coral Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Large Coral Pukei-Pukei Sac", "itemCount": 1, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Large Coral Pukei-Pukei Sac", "itemCount": 1, "probability": 0.75},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 2, "probability": 0.25}],
            "back": [
               {"material": "Coral Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.8},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 1, "probability": 0.2}],
            "wings": [
               {"material": "Coral Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.8},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 1, "probability": 0.2}]
         },
         "Sever": {
            "tail": [
               {"material": "Coral Pukei-Pukei Lash", "itemCount": 1, "probability": 0.8},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Large Coral Pukei-Pukei Sac", "itemCount": 1, "probability": 0.25},
               {"material": "Coral Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.22},
               {"material": "Flood Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 2, "probability": 0.14},
               {"material": "Coral Pukei-Pukei Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.11}],
            "Gold": [
               {"material": "Large Coral Pukei-Pukei Sac", "itemCount": 1, "probability": 0.25},
               {"material": "Coral Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.22},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.17},
               {"material": "Coral Pukei-Pukei Cortex", "itemCount": 3, "probability": 0.14},
               {"material": "Flood Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Coral Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Flood Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Coral Pukei-Pukei Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Coral Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Large Coral Pukei-Pukei Sac", "itemCount": 1, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Coral Pukei-Pukei Cortex", "Coral Pukei-Pukei Fellwing", "Coral Pukei-Pukei Lash",
            "Coral Pukei-Pukei Shard", "Fey Wyvern Gem", "Flood Sac", "Large Coral Pukei-Pukei Sac"]
      }
   },
   "Deviljho": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.28},
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.24},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.17},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.13},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.08},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.14},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.65},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.32},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.03}],
            "chest": [
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.66},
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.32},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Sever": {
            "tail": [
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.75},
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.22},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.13},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.13},
               {"material": "Deviljho Hide", "itemCount": 2, "probability": 0.12},
               {"material": "Deviljho Scale", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 3, "probability": 0.1},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.12},
               {"material": "Deviljho Hide", "itemCount": 3, "probability": 0.1},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 3, "probability": 0.1},
               {"material": "Deviljho Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.14},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Deviljho Gem", "Deviljho Hide", "Deviljho Saliva", "Deviljho Scale", "Deviljho Scalp", "Deviljho Tail",
            "Deviljho Tallfang", "Deviljho Talon", "Glowing Feystone", "Monster Hardbone", "Shining Streamstone",
            "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.28},
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.24},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.17},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.13},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.08},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.14},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.65},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.32},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.03}],
            "chest": [
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.66},
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.32},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Sever": {
            "tail": [
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.75},
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.22},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.13},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.13},
               {"material": "Deviljho Hide", "itemCount": 2, "probability": 0.12},
               {"material": "Deviljho Scale", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 3, "probability": 0.1},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Deviljho Scalp", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.12},
               {"material": "Deviljho Hide", "itemCount": 3, "probability": 0.1},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 3, "probability": 0.1},
               {"material": "Deviljho Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Deviljho Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Deviljho Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Deviljho Talon", "itemCount": 1, "probability": 0.14},
               {"material": "Deviljho Tallfang", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Saliva", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Tail", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Deviljho Gem", "Deviljho Hide", "Deviljho Saliva", "Deviljho Scale",
            "Deviljho Scalp", "Deviljho Tail", "Deviljho Tallfang", "Deviljho Talon", "Monster Hardbone", "Sealed Feystone"]
      }
   },
   "Diablos": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Diablos Shell", "itemCount": 1, "probability": 0.31},
               {"material": "Diablos Ridge", "itemCount": 1, "probability": 0.24},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.18},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.15},
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Diablos Ridge", "itemCount": 1, "probability": 0.26},
               {"material": "Diablos Shell", "itemCount": 1, "probability": 0.21},
               {"material": "Dash Extract", "itemCount": 1, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.15},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.13},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "horns": [{"material": "Twisted Horn", "itemCount": 1, "probability": 1}],
            "back": [
               {"material": "Diablos Ridge", "itemCount": 1, "probability": 0.7},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.72},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.28}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.2},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.18},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.17},
               {"material": "Diablos Ridge", "itemCount": 2, "probability": 0.14},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.12},
               {"material": "Diablos Shell", "itemCount": 2, "probability": 0.11},
               {"material": "Twisted Horn", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.2},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.16},
               {"material": "Twisted Horn", "itemCount": 1, "probability": 0.16},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.16},
               {"material": "Diablos Ridge", "itemCount": 3, "probability": 0.12},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.1},
               {"material": "Diablos Shell", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Diablos Ridge", "itemCount": 1, "probability": 0.26},
               {"material": "Diablos Shell", "itemCount": 1, "probability": 0.21},
               {"material": "Dash Extract", "itemCount": 1, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.15},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.13},
               {"material": "Diablos Marrow", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Dash Extract", "Diablos Fang", "Diablos Marrow", "Diablos Ridge", "Diablos Shell", "Diablos Tailcase", "Monster Bone+",
            "Twisted Horn"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Diablos Carapace", "itemCount": 1, "probability": 0.31},
               {"material": "Diablos Ridge+", "itemCount": 1, "probability": 0.24},
               {"material": "Diablos Fang", "itemCount": 1, "probability": 0.15},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.15},
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.12},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Diablos Ridge+", "itemCount": 1, "probability": 0.26},
               {"material": "Diablos Carapace", "itemCount": 1, "probability": 0.21},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 2, "probability": 0.14},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "horns": [
               {"material": "Majestic Horn", "itemCount": 1, "probability": 0.65},
               {"material": "Twisted Horn", "itemCount": 2, "probability": 0.35}],
            "back": [
               {"material": "Diablos Ridge+", "itemCount": 1, "probability": 0.7},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Diablos Tailcase", "itemCount": 1, "probability": 0.4},
               {"material": "Diablos Carapace", "itemCount": 1, "probability": 0.35},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.22},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Diablos Ridge+", "itemCount": 2, "probability": 0.2},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.2},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Diablos Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Majestic Horn", "itemCount": 1, "probability": 0.14},
               {"material": "Diablos Fang", "itemCount": 2, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.24},
               {"material": "Majestic Horn", "itemCount": 1, "probability": 0.18},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Diablos Ridge+", "itemCount": 3, "probability": 0.12},
               {"material": "Diablos Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Diablos Fang", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Diablos Ridge+", "itemCount": 1, "probability": 0.26},
               {"material": "Diablos Carapace", "itemCount": 1, "probability": 0.21},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Diablos Fang", "itemCount": 2, "probability": 0.14},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Blos Medulla", "Dash Extract", "Diablos Carapace", "Diablos Fang", "Diablos Ridge+", "Diablos Tailcase",
            "Glowing Feystone", "Majestic Horn", "Monster Hardbone", "Shining Streamstone", "Sullied Streamstone", "Twisted Horn",
            "Warped Feystone", "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Diablos Cortex", "itemCount": 1, "probability": 0.34},
               {"material": "Diablos Chine", "itemCount": 1, "probability": 0.26},
               {"material": "Blos Medulla", "itemCount": 1, "probability": 0.17},
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.15},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Diablos Chine", "itemCount": 1, "probability": 0.33},
               {"material": "Diablos Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.16},
               {"material": "Twisted Stouthorn", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 2, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "horns": [
               {"material": "Twisted Stouthorn", "itemCount": 1, "probability": 0.89},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.11}],
            "back": [
               {"material": "Diablos Chine", "itemCount": 1, "probability": 0.7},
               {"material": "Blos Medulla", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.7},
               {"material": "Diablos Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Diablos Chine", "itemCount": 2, "probability": 0.25},
               {"material": "Diablos Cortex", "itemCount": 2, "probability": 0.21},
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.2},
               {"material": "Twisted Stouthorn", "itemCount": 1, "probability": 0.16},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.12},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Diablos Tailcase+", "itemCount": 1, "probability": 0.22},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Twisted Stouthorn", "itemCount": 1, "probability": 0.18},
               {"material": "Diablos Chine", "itemCount": 3, "probability": 0.16},
               {"material": "Diablos Cortex", "itemCount": 3, "probability": 0.13},
               {"material": "Diablos Hardhorn", "itemCount": 1, "probability": 0.13}],
            "Bronze": [
               {"material": "Diablos Chine", "itemCount": 1, "probability": 0.33},
               {"material": "Diablos Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.16},
               {"material": "Twisted Stouthorn", "itemCount": 1, "probability": 0.13},
               {"material": "Blos Medulla", "itemCount": 2, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Ancient Feystone", "Blos Medulla", "Carved Feystone", "Dash Extract", "Diablos Chine", "Diablos Cortex",
            "Diablos Hardhorn", "Diablos Tailcase+", "Large Wyvern Gem", "Sealed Feystone", "Twisted Stouthorn", "Wyvern Gem"]
      }
   },
   "Dodogama": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Dodogama Scale+", "itemCount": 1, "probability": 0.31},
               {"material": "Dodogama Hide+", "itemCount": 1, "probability": 0.24},
               {"material": "Dodogama Jaw", "itemCount": 1, "probability": 0.18},
               {"material": "Dodogama Talon", "itemCount": 1, "probability": 0.15},
               {"material": "Dodogama Tail", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Dodogama Hide+", "itemCount": 1, "probability": 0.26},
               {"material": "Dodogama Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Dodogama Talon", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.13},
               {"material": "Dodogama Jaw", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [{"material": "Dodogama Jaw", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Dodogama Talon", "itemCount": 1, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Dodogama Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Dodogama Hide+", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Dodogama Talon", "itemCount": 1, "probability": 0.3},
               {"material": "Dodogama Jaw", "itemCount": 1, "probability": 0.25},
               {"material": "Dodogama Hide+", "itemCount": 2, "probability": 0.17},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Dodogama Scale+", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Dodogama Talon", "itemCount": 1, "probability": 0.36},
               {"material": "Dodogama Jaw", "itemCount": 1, "probability": 0.3},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Dodogama Hide+", "itemCount": 3, "probability": 0.12},
               {"material": "Dodogama Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Dodogama Hide+", "itemCount": 1, "probability": 0.26},
               {"material": "Dodogama Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Dodogama Talon", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.13},
               {"material": "Dodogama Jaw", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Dodogama Hide+", "Dodogama Jaw", "Dodogama Scale+", "Dodogama Tail", "Dodogama Talon", "Monster Keenbone",
            "Nourishing Extract"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Dodogama Shard", "itemCount": 1, "probability": 0.31},
               {"material": "Dodogama Thickhide", "itemCount": 1, "probability": 0.24},
               {"material": "Dodogama Mandible", "itemCount": 1, "probability": 0.18},
               {"material": "Dodogama Hardclaw", "itemCount": 1, "probability": 0.15},
               {"material": "Dodogama Lash", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Dodogama Thickhide", "itemCount": 1, "probability": 0.26},
               {"material": "Dodogama Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Hard Armor Sphere", "itemCount": 1, "probability": 0.16},
               {"material": "Dodogama Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.13},
               {"material": "Dodogama Mandible", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [{"material": "Dodogama Mandible", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Dodogama Hardclaw", "itemCount": 1, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Dodogama Lash", "itemCount": 1, "probability": 0.8},
               {"material": "Dodogama Thickhide", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Dodogama Hardclaw", "itemCount": 1, "probability": 0.3},
               {"material": "Dodogama Mandible", "itemCount": 1, "probability": 0.25},
               {"material": "Dodogama Thickhide", "itemCount": 2, "probability": 0.17},
               {"material": "Hard Armor Sphere", "itemCount": 2, "probability": 0.16},
               {"material": "Dodogama Shard", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Dodogama Hardclaw", "itemCount": 1, "probability": 0.34},
               {"material": "Dodogama Mandible", "itemCount": 1, "probability": 0.28},
               {"material": "Hard Armor Sphere", "itemCount": 2, "probability": 0.18},
               {"material": "Dodogama Thickhide", "itemCount": 3, "probability": 0.12},
               {"material": "Dodogama Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Dodogama Thickhide", "itemCount": 1, "probability": 0.26},
               {"material": "Dodogama Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Hard Armor Sphere", "itemCount": 1, "probability": 0.16},
               {"material": "Dodogama Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.13},
               {"material": "Dodogama Mandible", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Dodogama Hardclaw", "Dodogama Lash", "Dodogama Mandible", "Dodogama Shard", "Dodogama Thickhide", "Hard Armor Sphere",
            "Nourishing Extract"]
      }
   },
   "Ebony Odogaron": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Ebony Odogaron Shard", "itemCount": 1, "probability": 0.35},
               {"material": "Hard Ebony Odogaron Sinew", "itemCount": 1, "probability": 0.26},
               {"material": "Ebony Odogaron Hardclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Ebony Odogaron Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Ebony Odogaron Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Hard Ebony Odogaron Sinew", "itemCount": 1, "probability": 0.31},
               {"material": "Ebony Odogaron Shard", "itemCount": 1, "probability": 0.24},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.18},
               {"material": "Ebony Odogaron Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Ebony Odogaron Lash", "itemCount": 1, "probability": 0.11}]
         },
         "Break": {
            "head": [
               {"material": "Ebony Odogaron Hardfang", "itemCount": 1, "probability": 0.63},
               {"material": "Ebony Odogaron Shard", "itemCount": 1, "probability": 0.36},
               {"material": "Ebony Odogaron Mantle", "itemCount": 1, "probability": 0.01}],
            "forelimbs": [
               {"material": "Ebony Odogaron Hardclaw", "itemCount": 1, "probability": 0.75},
               {"material": "Ebony Odogaron Shard", "itemCount": 2, "probability": 0.25}],
            "hindlegs": [
               {"material": "Hard Ebony Odogaron Sinew", "itemCount": 1, "probability": 0.75},
               {"material": "Ebony Odogaron Shard", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Ebony Odogaron Lash", "itemCount": 1, "probability": 0.72},
               {"material": "Ebony Odogaron Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Ebony Odogaron Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Ebony Odogaron Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Ebony Odogaron Hardclaw", "itemCount": 1, "probability": 0.19},
               {"material": "Ebony Odogaron Hardfang", "itemCount": 1, "probability": 0.19},
               {"material": "Hard Ebony Odogaron Sinew", "itemCount": 2, "probability": 0.16},
               {"material": "Ebony Odogaron Shard", "itemCount": 2, "probability": 0.14},
               {"material": "Ebony Odogaron Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Ebony Odogaron Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Ebony Odogaron Hardfang", "itemCount": 1, "probability": 0.2},
               {"material": "Ebony Odogaron Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Ebony Odogaron Lash", "itemCount": 1, "probability": 0.15},
               {"material": "Hard Ebony Odogaron Sinew", "itemCount": 3, "probability": 0.14},
               {"material": "Ebony Odogaron Shard", "itemCount": 3, "probability": 0.13}],
            "Bronze": [
               {"material": "Hard Ebony Odogaron Sinew", "itemCount": 1, "probability": 0.31},
               {"material": "Ebony Odogaron Shard", "itemCount": 1, "probability": 0.24},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.18},
               {"material": "Ebony Odogaron Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Ebony Odogaron Lash", "itemCount": 1, "probability": 0.11}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Ebony Odogaron Hardclaw", "Ebony Odogaron Hardfang", "Ebony Odogaron Lash",
            "Ebony Odogaron Mantle", "Ebony Odogaron Shard", "Hard Ebony Odogaron Sinew", "Nourishing Extract", "Sealed Feystone"]
      }
   },
   "Fatalis": {
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Fatalis Shard", "itemCount": 1, "probability": 0.29},
               {"material": "Fatalis Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Fatalis Pectus", "itemCount": 1, "probability": 0.17},
               {"material": "Fatalis Hardhorn", "itemCount": 1, "probability": 0.13},
               {"material": "Fatalis Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Fatalis Evil Eye", "itemCount": 1, "probability": 0.07}],
            "Hunt": [
               {"material": "Fatalis Cortex", "itemCount": 1, "probability": 0.33},
               {"material": "Fatalis Shard", "itemCount": 1, "probability": 0.27},
               {"material": "Fatalis Pectus", "itemCount": 1, "probability": 0.19},
               {"material": "Fatalis Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Fatalis Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "horn": [{"material": "Fatalis Hardhorn", "itemCount": 1, "probability": 1}],
            "eye": [{"material": "Fatalis Evil Eye", "itemCount": 1, "probability": 1}],
            "left wing": [{"material": "Fatalis Fellwing", "itemCount": 1, "probability": 1}],
            "right wing": [{"material": "Fatalis Fellwing", "itemCount": 1, "probability": 1}],
            "chest": [{"material": "Fatalis Pectus", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {},
         "material": ["Fatalis Cortex", "Fatalis Evil Eye", "Fatalis Fellwing", "Fatalis Hardhorn", "Fatalis Pectus", "Fatalis Shard"]
      }
   },
   "Frostfang Barioth": {
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Silversnow Pelt", "itemCount": 1, "probability": 0.36},
               {"material": "Bergcrusher Claw", "itemCount": 1, "probability": 0.24},
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Silverwhite Frostfang", "itemCount": 1, "probability": 0.14},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Hunt": [
               {"material": "Silversnow Pelt", "itemCount": 1, "probability": 0.36},
               {"material": "Barioth Greatspike", "itemCount": 1, "probability": 0.24},
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Bergcrusher Claw", "itemCount": 1, "probability": 0.13},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "fang": [{"material": "Silverwhite Frostfang", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Bergcrusher Claw", "itemCount": 1, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Barioth Lash", "itemCount": 1, "probability": 0.87},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.13}]
         },
         "Investigation": {},
         "material": [
            "Barioth Greatspike", "Barioth Lash", "Bergcrusher Claw", "Large Wyvern Gem", "Silversnow Pelt", "Silverwhite Frostfang"]
      }
   },
   "Fulgur Anjanath": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Fulgur Anjanath Shard", "itemCount": 1, "probability": 0.35},
               {"material": "Fulgur Anjanath Thickfur", "itemCount": 1, "probability": 0.26},
               {"material": "Heavy Fulgur Anjanath Nosebone", "itemCount": 1, "probability": 0.21},
               {"material": "Fulgur Anjanath Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Fulgur Anjanath Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Fulgur Anjanath Thickfur", "itemCount": 1, "probability": 0.29},
               {"material": "Fulgur Anjanath Shard", "itemCount": 1, "probability": 0.24},
               {"material": "Lightning Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Heavy Fulgur Anjanath Nosebone", "itemCount": 1, "probability": 0.15},
               {"material": "Fulgur Anjanath Lash", "itemCount": 1, "probability": 0.11}]
         },
         "Break": {
            "head": [
               {"material": "Fulgur Anjanath Hardfang", "itemCount": 1, "probability": 0.62},
               {"material": "Heavy Fulgur Anjanath Nosebone", "itemCount": 1, "probability": 0.35},
               {"material": "Fulgur Anjanath Mantle", "itemCount": 1, "probability": 0.03}],
            "hindlegs": [{"material": "Fulgur Anjanath Shard", "itemCount": 2, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Fulgur Anjanath Lash", "itemCount": 1, "probability": 0.72},
               {"material": "Fulgur Anjanath Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Fulgur Anjanath Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Fulgur Anjanath Lash", "itemCount": 1, "probability": 0.23},
               {"material": "Fulgur Anjanath Hardfang", "itemCount": 1, "probability": 0.19},
               {"material": "Heavy Fulgur Anjanath Nosebone", "itemCount": 1, "probability": 0.19},
               {"material": "Fulgur Anjanath Thickfur", "itemCount": 2, "probability": 0.16},
               {"material": "Fulgur Anjanath Shard", "itemCount": 2, "probability": 0.13},
               {"material": "Fulgur Anjanath Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Fulgur Anjanath Hardfang", "itemCount": 1, "probability": 0.21},
               {"material": "Heavy Fulgur Anjanath Nosebone", "itemCount": 1, "probability": 0.21},
               {"material": "Fulgur Anjanath Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Fulgur Anjanath Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Fulgur Anjanath Thickfur", "itemCount": 3, "probability": 0.12},
               {"material": "Fulgur Anjanath Shard", "itemCount": 3, "probability": 0.09}],
            "Bronze": [
               {"material": "Fulgur Anjanath Thickfur", "itemCount": 1, "probability": 0.29},
               {"material": "Fulgur Anjanath Shard", "itemCount": 1, "probability": 0.24},
               {"material": "Lightning Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Heavy Fulgur Anjanath Nosebone", "itemCount": 1, "probability": 0.15},
               {"material": "Fulgur Anjanath Lash", "itemCount": 1, "probability": 0.11}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Fulgur Anjanath Hardfang", "Fulgur Anjanath Lash", "Fulgur Anjanath Mantle",
            "Fulgur Anjanath Shard", "Fulgur Anjanath Thickfur", "Heavy Fulgur Anjanath Nosebone", "Lightning Sac", "Sealed Feystone"]
      }
   },
   "Furious Rajang": {
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Rajang Apoplexy", "itemCount": 1, "probability": 0.32},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.23},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.21},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.15},
               {"material": "Rajang Heart", "itemCount": 1, "probability": 0.09}],
            "Hunt": [
               {"material": "Rajang Apoplexy", "itemCount": 1, "probability": 0.32},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.23},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.17},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Ghoulish Gold Gorer", "itemCount": 1, "probability": 0.09},
               {"material": "Rajang Heart", "itemCount": 1, "probability": 0.05}]
         },
         "Break": {
            "horn": [
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.7},
               {"material": "Ghoulish Gold Gorer", "itemCount": 1, "probability": 0.3}],
            "horns": [{"material": "Ghoulish Gold Gorer", "itemCount": 1, "probability": 1}],
            "left foreleg": [
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Rajang Apoplexy", "itemCount": 1, "probability": 0.3}],
            "right foreleg": [
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Rajang Apoplexy", "itemCount": 1, "probability": 0.3}],
            "tail": [
               {"material": "Rajang Tail", "itemCount": 1, "probability": 0.9},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.24},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.2},
               {"material": "Rajang Hardclaw", "itemCount": 2, "probability": 0.17},
               {"material": "Rajang Apoplexy", "itemCount": 2, "probability": 0.17},
               {"material": "Ghoulish Gold Gorer", "itemCount": 1, "probability": 0.14},
               {"material": "Rajang Heart", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Ghoulish Gold Gorer", "itemCount": 1, "probability": 0.25},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.2},
               {"material": "Rajang Heart", "itemCount": 1, "probability": 0.16},
               {"material": "Rajang Hardclaw", "itemCount": 3, "probability": 0.14},
               {"material": "Rajang Apoplexy", "itemCount": 3, "probability": 0.14},
               {"material": "Rajang Hardhorn", "itemCount": 2, "probability": 0.11}],
            "Bronze": [
               {"material": "Rajang Apoplexy", "itemCount": 1, "probability": 0.32},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.23},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.17},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Ghoulish Gold Gorer", "itemCount": 1, "probability": 0.09},
               {"material": "Rajang Heart", "itemCount": 1, "probability": 0.05}]
         },
         "material": [
            "Ghoulish Gold Gorer", "Gold Rajang Pelt+", "Rajang Apoplexy", "Rajang Hardclaw", "Rajang Hardhorn", "Rajang Heart",
            "Rajang Tail"]
      }
   },
   "Glavenus": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Glavenus Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Glavenus Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Glavenus Hardfang", "itemCount": 1, "probability": 0.19},
               {"material": "Glavenus Hellshell", "itemCount": 1, "probability": 0.14},
               {"material": "Glavenus Tailedge", "itemCount": 1, "probability": 0.09},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Glavenus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Glavenus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Glavenus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Molten Bursa", "itemCount": 1, "probability": 0.14},
               {"material": "Glavenus Hellshell", "itemCount": 1, "probability": 0.11},
               {"material": "Glavenus Tailedge", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Glavenus Hardfang", "itemCount": 1, "probability": 0.66},
               {"material": "Glavenus Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.02}],
            "back": [
               {"material": "Glavenus Hellshell", "itemCount": 1, "probability": 0.65},
               {"material": "Glavenus Cortex", "itemCount": 1, "probability": 0.35}],
            "foreleg": [
               {"material": "Glavenus Shard", "itemCount": 1, "probability": 0.7},
               {"material": "Glavenus Cortex", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Glavenus Tailedge", "itemCount": 1, "probability": 0.7},
               {"material": "Glavenus Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Glavenus Hardfang", "itemCount": 1, "probability": 0.22},
               {"material": "Molten Bursa", "itemCount": 1, "probability": 0.18},
               {"material": "Glavenus Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Glavenus Hellshell", "itemCount": 1, "probability": 0.14},
               {"material": "Glavenus Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Glavenus Tailedge", "itemCount": 1, "probability": 0.12},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Glavenus Hardfang", "itemCount": 1, "probability": 0.18},
               {"material": "Glavenus Hellshell", "itemCount": 1, "probability": 0.16},
               {"material": "Glavenus Mantle", "itemCount": 1, "probability": 0.16},
               {"material": "Glavenus Tailedge", "itemCount": 1, "probability": 0.14},
               {"material": "Molten Bursa", "itemCount": 2, "probability": 0.14},
               {"material": "Glavenus Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Glavenus Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Glavenus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Glavenus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Glavenus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Molten Bursa", "itemCount": 1, "probability": 0.14},
               {"material": "Glavenus Hellshell", "itemCount": 1, "probability": 0.11},
               {"material": "Glavenus Tailedge", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Glavenus Cortex", "Glavenus Hardfang", "Glavenus Hellshell", "Glavenus Mantle",
            "Glavenus Shard", "Glavenus Tailedge", "Molten Bursa", "Sealed Feystone"]
      }
   },
   "Gold Rathian": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Gold Rathian Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Gold Rathian Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.16},
               {"material": "Gold Rathian Surspike", "itemCount": 1, "probability": 0.13},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Gold Rathian Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Gold Rathian Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.18},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Weave", "itemCount": 2, "probability": 0.09},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [
               {"material": "Gold Rathian Cortex", "itemCount": 1, "probability": 0.62},
               {"material": "Gold Rathian Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.05}],
            "back": [
               {"material": "Gold Rathian Cortex", "itemCount": 1, "probability": 0.67},
               {"material": "Gold Rathian Surspike", "itemCount": 1, "probability": 0.3},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.03}],
            "wings": [
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.65},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Gold Rathian Surspike", "itemCount": 1, "probability": 0.6},
               {"material": "Gold Rathian Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Gold Rathian Cortex", "itemCount": 2, "probability": 0.23},
               {"material": "Gold Rathian Shard", "itemCount": 2, "probability": 0.19},
               {"material": "Rathian Weave", "itemCount": 2, "probability": 0.18},
               {"material": "Gold Rathian Surspike", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.12},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Gold Rathian Surspike", "itemCount": 1, "probability": 0.22},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.2},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Gold Rathian Cortex", "itemCount": 3, "probability": 0.15},
               {"material": "Gold Rathian Shard", "itemCount": 3, "probability": 0.13},
               {"material": "Rathian Weave", "itemCount": 2, "probability": 0.12}],
            "Bronze": [
               {"material": "Gold Rathian Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Gold Rathian Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.18},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Weave", "itemCount": 2, "probability": 0.09},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Carved Feystone", "Conflagrant Sac", "Gold Rathian Cortex", "Gold Rathian Shard", "Gold Rathian Surspike", "Rath Gleam",
            "Rath Wingtalon+", "Rathian Mantle", "Rathian Weave", "Sealed Feystone"]
      }
   },
   "Great Girros": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Great Girros Scale", "itemCount": 1, "probability": 0.31},
               {"material": "Great Girros Hide", "itemCount": 1, "probability": 0.24},
               {"material": "Great Girros Fang", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Hood", "itemCount": 1, "probability": 0.15},
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Great Girros Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Great Girros Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Paralysis Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Fang", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone L", "itemCount": 2, "probability": 0.1},
               {"material": "Great Girros Hood", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Great Girros Hood", "itemCount": 1, "probability": 0.75},
               {"material": "Great Girros Fang", "itemCount": 2, "probability": 0.25}],
            "forelimbs": [
               {"material": "Great Girros Hide", "itemCount": 1, "probability": 0.75},
               {"material": "Great Girros Scale", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Great Girros Scale", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Great Girros Fang", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Hide", "itemCount": 2, "probability": 0.18},
               {"material": "Great Girros Hood", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Great Girros Scale", "itemCount": 2, "probability": 0.14},
               {"material": "Paralysis Sac", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Great Girros Fang", "itemCount": 1, "probability": 0.24},
               {"material": "Great Girros Hood", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.2},
               {"material": "Great Girros Hide", "itemCount": 3, "probability": 0.14},
               {"material": "Paralysis Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Great Girros Scale", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Great Girros Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Great Girros Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Paralysis Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Fang", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone L", "itemCount": 2, "probability": 0.1},
               {"material": "Great Girros Hood", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Great Girros Fang", "Great Girros Hide", "Great Girros Hood", "Great Girros Scale", "Great Girros Tail",
            "Monster Bone L", "Paralysis Sac"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Great Girros Scale+", "itemCount": 1, "probability": 0.31},
               {"material": "Great Girros Hide+", "itemCount": 1, "probability": 0.24},
               {"material": "Great Girros Fang+", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Hood+", "itemCount": 1, "probability": 0.15},
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Great Girros Hide+", "itemCount": 1, "probability": 0.26},
               {"material": "Great Girros Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Omniplegia Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Fang+", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone+", "itemCount": 2, "probability": 0.1},
               {"material": "Great Girros Hood+", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Great Girros Hood+", "itemCount": 1, "probability": 0.75},
               {"material": "Great Girros Fang+", "itemCount": 2, "probability": 0.25}],
            "forelimbs": [
               {"material": "Great Girros Hide+", "itemCount": 1, "probability": 0.75},
               {"material": "Great Girros Scale+", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Great Girros Scale+", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Great Girros Fang+", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Hide+", "itemCount": 2, "probability": 0.18},
               {"material": "Great Girros Hood+", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Great Girros Scale+", "itemCount": 2, "probability": 0.14},
               {"material": "Omniplegia Sac", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Great Girros Fang+", "itemCount": 1, "probability": 0.24},
               {"material": "Great Girros Hood+", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Hide+", "itemCount": 3, "probability": 0.16},
               {"material": "Great Girros Tail", "itemCount": 2, "probability": 0.14},
               {"material": "Omniplegia Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Great Girros Scale+", "itemCount": 3, "probability": 0.12}],
            "Bronze": [
               {"material": "Great Girros Hide+", "itemCount": 1, "probability": 0.26},
               {"material": "Great Girros Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Omniplegia Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Fang+", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone+", "itemCount": 2, "probability": 0.1},
               {"material": "Great Girros Hood+", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Great Girros Fang+", "Great Girros Hide+", "Great Girros Hood+", "Great Girros Scale+", "Great Girros Tail",
            "Monster Bone+", "Omniplegia Sac"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Great Girros Shard", "itemCount": 1, "probability": 0.31},
               {"material": "Great Girros Thickhide", "itemCount": 1, "probability": 0.24},
               {"material": "Great Girros Hardfang", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Hardhood", "itemCount": 1, "probability": 0.15},
               {"material": "Great Girros Lash", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Great Girros Thickhide", "itemCount": 1, "probability": 0.28},
               {"material": "Ultraplegia Sac", "itemCount": 1, "probability": 0.23},
               {"material": "Great Girros Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Great Girros Hardhood", "itemCount": 1, "probability": 0.11}]
         },
         "Break": {
            "head": [
               {"material": "Great Girros Hardhood", "itemCount": 1, "probability": 0.75},
               {"material": "Great Girros Hardfang", "itemCount": 2, "probability": 0.25}],
            "forelimbs": [
               {"material": "Great Girros Thickhide", "itemCount": 1, "probability": 0.75},
               {"material": "Great Girros Shard", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Great Girros Lash", "itemCount": 1, "probability": 0.8},
               {"material": "Great Girros Shard", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Great Girros Hardfang", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Thickhide", "itemCount": 2, "probability": 0.18},
               {"material": "Great Girros Hardhood", "itemCount": 1, "probability": 0.18},
               {"material": "Great Girros Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Great Girros Shard", "itemCount": 2, "probability": 0.14},
               {"material": "Ultraplegia Sac", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Great Girros Hardfang", "itemCount": 1, "probability": 0.24},
               {"material": "Great Girros Hardhood", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Thickhide", "itemCount": 3, "probability": 0.16},
               {"material": "Great Girros Lash", "itemCount": 2, "probability": 0.14},
               {"material": "Ultraplegia Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Great Girros Shard", "itemCount": 3, "probability": 0.12}],
            "Bronze": [
               {"material": "Great Girros Thickhide", "itemCount": 1, "probability": 0.28},
               {"material": "Ultraplegia Sac", "itemCount": 1, "probability": 0.23},
               {"material": "Great Girros Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Great Girros Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Great Girros Hardhood", "itemCount": 1, "probability": 0.11}]
         },
         "material": [
            "Great Girros Hardfang", "Great Girros Hardhood", "Great Girros Lash", "Great Girros Shard", "Great Girros Thickhide",
            "Ultraplegia Sac"]
      }
   },
   "Great Jagras": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Great Jagras Scale", "itemCount": 1, "probability": 0.36},
               {"material": "Great Jagras Hide", "itemCount": 1, "probability": 0.28},
               {"material": "Great Jagras Claw", "itemCount": 1, "probability": 0.21},
               {"material": "Great Jagras Mane", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Great Jagras Hide", "itemCount": 1, "probability": 0.32},
               {"material": "Great Jagras Scale", "itemCount": 1, "probability": 0.23},
               {"material": "Great Jagras Mane", "itemCount": 1, "probability": 0.16},
               {"material": "Iron Ore", "itemCount": 2, "probability": 0.1},
               {"material": "Monster Bone S", "itemCount": 2, "probability": 0.1},
               {"material": "Great Jagras Claw", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [{"material": "Great Jagras Mane", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Great Jagras Claw", "itemCount": 1, "probability": 1}],
            "stomach": [{"material": "Great Jagras Hide", "itemCount": 2, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Great Jagras Mane", "itemCount": 1, "probability": 0.3},
               {"material": "Great Jagras Hide", "itemCount": 2, "probability": 0.25},
               {"material": "Great Jagras Claw", "itemCount": 1, "probability": 0.25},
               {"material": "Great Jagras Scale", "itemCount": 2, "probability": 0.2}],
            "Gold": [
               {"material": "Great Jagras Mane", "itemCount": 1, "probability": 0.4},
               {"material": "Great Jagras Claw", "itemCount": 1, "probability": 0.3},
               {"material": "Great Jagras Hide", "itemCount": 3, "probability": 0.16},
               {"material": "Great Jagras Scale", "itemCount": 3, "probability": 0.14}],
            "Bronze": [
               {"material": "Great Jagras Hide", "itemCount": 1, "probability": 0.32},
               {"material": "Great Jagras Scale", "itemCount": 1, "probability": 0.23},
               {"material": "Great Jagras Mane", "itemCount": 1, "probability": 0.16},
               {"material": "Iron Ore", "itemCount": 2, "probability": 0.1},
               {"material": "Monster Bone S", "itemCount": 2, "probability": 0.1},
               {"material": "Great Jagras Claw", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Great Jagras Claw", "Great Jagras Hide", "Great Jagras Mane", "Great Jagras Scale", "Iron Ore", "Monster Bone S"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Great Jagras Scale+", "itemCount": 1, "probability": 0.36},
               {"material": "Great Jagras Hide+", "itemCount": 1, "probability": 0.28},
               {"material": "Great Jagras Claw+", "itemCount": 1, "probability": 0.21},
               {"material": "Great Jagras Mane", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Great Jagras Hide+", "itemCount": 1, "probability": 0.32},
               {"material": "Great Jagras Scale+", "itemCount": 1, "probability": 0.23},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.2},
               {"material": "Great Jagras Mane", "itemCount": 2, "probability": 0.16},
               {"material": "Great Jagras Claw+", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Great Jagras Mane", "itemCount": 2, "probability": 0.63},
               {"material": "Great Jagras Hide+", "itemCount": 2, "probability": 0.37}],
            "forelimbs": [{"material": "Great Jagras Claw+", "itemCount": 1, "probability": 1}],
            "stomach": [{"material": "Great Jagras Hide+", "itemCount": 2, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Great Jagras Claw+", "itemCount": 1, "probability": 0.4},
               {"material": "Great Jagras Hide+", "itemCount": 2, "probability": 0.25},
               {"material": "Great Jagras Scale+", "itemCount": 2, "probability": 0.2},
               {"material": "Great Jagras Mane", "itemCount": 2, "probability": 0.15}],
            "Gold": [
               {"material": "Great Jagras Claw+", "itemCount": 1, "probability": 0.64},
               {"material": "Great Jagras Hide+", "itemCount": 3, "probability": 0.14},
               {"material": "Great Jagras Mane", "itemCount": 3, "probability": 0.12},
               {"material": "Great Jagras Scale+", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Great Jagras Hide+", "itemCount": 1, "probability": 0.32},
               {"material": "Great Jagras Scale+", "itemCount": 1, "probability": 0.23},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.2},
               {"material": "Great Jagras Mane", "itemCount": 2, "probability": 0.16},
               {"material": "Great Jagras Claw+", "itemCount": 1, "probability": 0.09}]
         },
         "material": ["Great Jagras Claw+", "Great Jagras Hide+", "Great Jagras Mane", "Great Jagras Scale+", "Monster Bone+"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Great Jagras Shard", "itemCount": 1, "probability": 0.36},
               {"material": "Great Jagras Thickhide", "itemCount": 1, "probability": 0.28},
               {"material": "Great Jagras Hardclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Great Jagras Mane+", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Great Jagras Thickhide", "itemCount": 1, "probability": 0.32},
               {"material": "Great Jagras Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Monster Toughbone", "itemCount": 1, "probability": 0.2},
               {"material": "Great Jagras Mane+", "itemCount": 1, "probability": 0.16},
               {"material": "Great Jagras Hardclaw", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [{"material": "Great Jagras Mane+", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Great Jagras Hardclaw", "itemCount": 1, "probability": 1}],
            "stomach": [{"material": "Great Jagras Thickhide", "itemCount": 2, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Great Jagras Mane+", "itemCount": 1, "probability": 0.3},
               {"material": "Great Jagras Thickhide", "itemCount": 2, "probability": 0.25},
               {"material": "Great Jagras Hardclaw", "itemCount": 1, "probability": 0.25},
               {"material": "Great Jagras Shard", "itemCount": 2, "probability": 0.2}],
            "Gold": [
               {"material": "Great Jagras Mane+", "itemCount": 1, "probability": 0.4},
               {"material": "Great Jagras Hardclaw", "itemCount": 1, "probability": 0.3},
               {"material": "Great Jagras Thickhide", "itemCount": 3, "probability": 0.16},
               {"material": "Great Jagras Shard", "itemCount": 3, "probability": 0.14}],
            "Bronze": [
               {"material": "Great Jagras Thickhide", "itemCount": 1, "probability": 0.32},
               {"material": "Great Jagras Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Monster Toughbone", "itemCount": 1, "probability": 0.2},
               {"material": "Great Jagras Mane+", "itemCount": 1, "probability": 0.16},
               {"material": "Great Jagras Hardclaw", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Great Jagras Hardclaw", "Great Jagras Mane+", "Great Jagras Shard", "Great Jagras Thickhide", "Monster Toughbone"]
      }
   },
   "Jyuratodus": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Jyuratodus Scale+", "itemCount": 1, "probability": 0.36},
               {"material": "Jyuratodus Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Jyuratodus Fin+", "itemCount": 1, "probability": 0.2},
               {"material": "Jyuratodus Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Jyuratodus Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Jyuratodus Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Torrent Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Jyuratodus Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Jyuratodus Fin+", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "head": [{"material": "Jyuratodus Fang+", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Jyuratodus Fin+", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Jyuratodus Fang+", "itemCount": 1, "probability": 0.32},
               {"material": "Jyuratodus Fin+", "itemCount": 1, "probability": 0.23},
               {"material": "Jyuratodus Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Torrent Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Jyuratodus Scale+", "itemCount": 2, "probability": 0.11},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Jyuratodus Fang+", "itemCount": 1, "probability": 0.3},
               {"material": "Jyuratodus Fin+", "itemCount": 1, "probability": 0.24},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Jyuratodus Carapace", "itemCount": 3, "probability": 0.12},
               {"material": "Torrent Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Jyuratodus Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Jyuratodus Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Jyuratodus Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Torrent Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Jyuratodus Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Jyuratodus Fin+", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Glowing Feystone", "Jyuratodus Carapace", "Jyuratodus Fang+", "Jyuratodus Fin+", "Jyuratodus Scale+", "Monster Keenbone",
            "Mysterious Feystone", "Torrent Sac", "Warped Feystone", "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Jyuratodus Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Jyuratodus Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Jyuratodus Grandfin", "itemCount": 1, "probability": 0.2},
               {"material": "Jyuratodus Hardfang", "itemCount": 1, "probability": 0.14},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Jyuratodus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Flood Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Jyuratodus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Jyuratodus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Jyuratodus Grandfin", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [{"material": "Jyuratodus Hardfang", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Jyuratodus Grandfin", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Jyuratodus Hardfang", "itemCount": 1, "probability": 0.32},
               {"material": "Jyuratodus Grandfin", "itemCount": 1, "probability": 0.23},
               {"material": "Jyuratodus Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Flood Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Jyuratodus Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Jyuratodus Hardfang", "itemCount": 1, "probability": 0.3},
               {"material": "Jyuratodus Grandfin", "itemCount": 1, "probability": 0.24},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Jyuratodus Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Flood Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Jyuratodus Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Jyuratodus Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Flood Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Jyuratodus Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Jyuratodus Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Jyuratodus Grandfin", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Flood Sac", "Jyuratodus Cortex", "Jyuratodus Grandfin", "Jyuratodus Hardfang",
            "Jyuratodus Shard", "Large Wyvern Gem", "Wyvern Gem"]
      }
   },
   "Kirin": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Kirin Hide", "itemCount": 1, "probability": 0.36},
               {"material": "Kirin Tail", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Mane", "itemCount": 1, "probability": 0.21},
               {"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Kirin Mane", "itemCount": 1, "probability": 0.35},
               {"material": "Kirin Hide", "itemCount": 1, "probability": 0.2},
               {"material": "Kirin Tail", "itemCount": 1, "probability": 0.2},
               {"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 0.16},
               {"material": "Lightcrystal", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {"horn": [{"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 1}]},
         "Investigation": {
            "Silver": [
               {"material": "Kirin Tail", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 0.22},
               {"material": "Lightcrystal", "itemCount": 1, "probability": 0.18},
               {"material": "Kirin Mane", "itemCount": 2, "probability": 0.18},
               {"material": "Kirin Hide", "itemCount": 2, "probability": 0.14}],
            "Gold": [
               {"material": "Kirin Tail", "itemCount": 1, "probability": 0.3},
               {"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 0.24},
               {"material": "Lightcrystal", "itemCount": 1, "probability": 0.22},
               {"material": "Kirin Mane", "itemCount": 3, "probability": 0.14},
               {"material": "Kirin Hide", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Kirin Mane", "itemCount": 1, "probability": 0.35},
               {"material": "Kirin Hide", "itemCount": 1, "probability": 0.2},
               {"material": "Kirin Tail", "itemCount": 1, "probability": 0.2},
               {"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 0.16},
               {"material": "Lightcrystal", "itemCount": 1, "probability": 0.09}]
         },
         "material": ["Kirin Hide", "Kirin Mane", "Kirin Tail", "Kirin Thunderhorn", "Lightcrystal"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Kirin Hide+", "itemCount": 1, "probability": 0.36},
               {"material": "Kirin Thundertail", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Mane", "itemCount": 1, "probability": 0.21},
               {"material": "Kirin Azure Horn", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Kirin Mane", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Hide+", "itemCount": 1, "probability": 0.21},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.16},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.13},
               {"material": "Kirin Thundertail", "itemCount": 1, "probability": 0.13},
               {"material": "Novacrystal", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "horn": [
               {"material": "Kirin Azure Horn", "itemCount": 1, "probability": 0.8},
               {"material": "Kirin Thunderhorn", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Kirin Thundertail", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Azure Horn", "itemCount": 1, "probability": 0.22},
               {"material": "Novacrystal", "itemCount": 1, "probability": 0.18},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.12},
               {"material": "Kirin Hide+", "itemCount": 2, "probability": 0.12},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.08}],
            "Gold": [
               {"material": "Kirin Azure Horn", "itemCount": 1, "probability": 0.26},
               {"material": "Novacrystal", "itemCount": 2, "probability": 0.22},
               {"material": "Kirin Thundertail", "itemCount": 1, "probability": 0.2},
               {"material": "Elder Dragon Blood", "itemCount": 3, "probability": 0.12},
               {"material": "Kirin Hide+", "itemCount": 3, "probability": 0.12},
               {"material": "Elder Dragon Bone", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Kirin Mane", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Hide+", "itemCount": 1, "probability": 0.21},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.16},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.13},
               {"material": "Kirin Thundertail", "itemCount": 1, "probability": 0.13},
               {"material": "Novacrystal", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Elder Dragon Blood", "Elder Dragon Bone", "Kirin Azure Horn", "Kirin Hide+", "Kirin Mane", "Kirin Thunderhorn",
            "Kirin Thundertail", "Novacrystal", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Kirin Finehide", "itemCount": 1, "probability": 0.36},
               {"material": "Kirin Thundertail+", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Silvermane", "itemCount": 1, "probability": 0.21},
               {"material": "Kirin Azure Horn+", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Kirin Silvermane", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Finehide", "itemCount": 1, "probability": 0.21},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.16},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.13},
               {"material": "Kirin Thundertail+", "itemCount": 1, "probability": 0.13},
               {"material": "Purecrystal", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "horn": [
               {"material": "Kirin Azure Horn+", "itemCount": 1, "probability": 0.8},
               {"material": "Kirin Azure Horn", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Kirin Thundertail+", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Azure Horn+", "itemCount": 1, "probability": 0.22},
               {"material": "Purecrystal", "itemCount": 1, "probability": 0.18},
               {"material": "Pure Dragon Blood", "itemCount": 2, "probability": 0.12},
               {"material": "Kirin Finehide", "itemCount": 2, "probability": 0.12},
               {"material": "Large Elder Dragon Bone", "itemCount": 2, "probability": 0.08}],
            "Gold": [
               {"material": "Kirin Azure Horn+", "itemCount": 1, "probability": 0.26},
               {"material": "Purecrystal", "itemCount": 2, "probability": 0.22},
               {"material": "Kirin Thundertail+", "itemCount": 1, "probability": 0.2},
               {"material": "Pure Dragon Blood", "itemCount": 3, "probability": 0.12},
               {"material": "Kirin Finehide", "itemCount": 3, "probability": 0.12},
               {"material": "Large Elder Dragon Bone", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Kirin Silvermane", "itemCount": 1, "probability": 0.28},
               {"material": "Kirin Finehide", "itemCount": 1, "probability": 0.21},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.16},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.13},
               {"material": "Kirin Thundertail+", "itemCount": 1, "probability": 0.13},
               {"material": "Purecrystal", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Carved Feystone", "Kirin Azure Horn", "Kirin Azure Horn+", "Kirin Finehide", "Kirin Silvermane", "Kirin Thundertail+",
            "Large Elder Dragon Bone", "Pure Dragon Blood", "Purecrystal", "Sealed Feystone"]
      }
   },
   "Kulu-Ya-Ku": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Kulu-Ya-Ku Scale", "itemCount": 1, "probability": 0.36},
               {"material": "Kulu-Ya-Ku Hide", "itemCount": 1, "probability": 0.28},
               {"material": "Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.21},
               {"material": "Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Kulu-Ya-Ku Hide", "itemCount": 1, "probability": 0.32},
               {"material": "Kulu-Ya-Ku Scale", "itemCount": 1, "probability": 0.23},
               {"material": "Monster Bone S", "itemCount": 1, "probability": 0.2},
               {"material": "Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.16},
               {"material": "Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [{"material": "Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.3},
               {"material": "Kulu-Ya-Ku Hide", "itemCount": 2, "probability": 0.25},
               {"material": "Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.25},
               {"material": "Kulu-Ya-Ku Scale", "itemCount": 2, "probability": 0.2}],
            "Gold": [
               {"material": "Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.4},
               {"material": "Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.3},
               {"material": "Kulu-Ya-Ku Hide", "itemCount": 3, "probability": 0.16},
               {"material": "Kulu-Ya-Ku Scale", "itemCount": 3, "probability": 0.14}],
            "Bronze": [
               {"material": "Kulu-Ya-Ku Hide", "itemCount": 1, "probability": 0.32},
               {"material": "Kulu-Ya-Ku Scale", "itemCount": 1, "probability": 0.23},
               {"material": "Monster Bone S", "itemCount": 1, "probability": 0.2},
               {"material": "Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.16},
               {"material": "Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.09}]
         },
         "material": ["Kulu-Ya-Ku Beak", "Kulu-Ya-Ku Hide", "Kulu-Ya-Ku Plume", "Kulu-Ya-Ku Scale", "Monster Bone S"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Kulu-Ya-Ku Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Kulu-Ya-Ku Hide+", "itemCount": 1, "probability": 0.27},
               {"material": "Kulu-Ya-Ku Beak+", "itemCount": 1, "probability": 0.2},
               {"material": "Kulu-Ya-Ku Plume+", "itemCount": 1, "probability": 0.14},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Kulu-Ya-Ku Hide+", "itemCount": 1, "probability": 0.32},
               {"material": "Kulu-Ya-Ku Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.18},
               {"material": "Kulu-Ya-Ku Plume+", "itemCount": 1, "probability": 0.15},
               {"material": "Kulu-Ya-Ku Beak+", "itemCount": 1, "probability": 0.11},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [{"material": "Kulu-Ya-Ku Beak+", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Kulu-Ya-Ku Plume+", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Kulu-Ya-Ku Plume+", "itemCount": 1, "probability": 0.28},
               {"material": "Kulu-Ya-Ku Beak+", "itemCount": 1, "probability": 0.23},
               {"material": "Kulu-Ya-Ku Hide+", "itemCount": 2, "probability": 0.2},
               {"material": "Kulu-Ya-Ku Scale+", "itemCount": 2, "probability": 0.18},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.11}],
            "Gold": [
               {"material": "Kulu-Ya-Ku Plume+", "itemCount": 1, "probability": 0.3},
               {"material": "Kulu-Ya-Ku Beak+", "itemCount": 1, "probability": 0.24},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.17},
               {"material": "Kulu-Ya-Ku Hide+", "itemCount": 3, "probability": 0.16},
               {"material": "Kulu-Ya-Ku Scale+", "itemCount": 3, "probability": 0.13}],
            "Bronze": [
               {"material": "Kulu-Ya-Ku Hide+", "itemCount": 1, "probability": 0.32},
               {"material": "Kulu-Ya-Ku Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.18},
               {"material": "Kulu-Ya-Ku Plume+", "itemCount": 1, "probability": 0.15},
               {"material": "Kulu-Ya-Ku Beak+", "itemCount": 1, "probability": 0.11},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Bird Wyvern Gem", "Kulu-Ya-Ku Beak+", "Kulu-Ya-Ku Hide+", "Kulu-Ya-Ku Plume+", "Kulu-Ya-Ku Scale+", "Monster Bone+"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Kulu-Ya-Ku Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Kulu-Ya-Ku Thickhide", "itemCount": 1, "probability": 0.27},
               {"material": "Large Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.2},
               {"material": "Large Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.14},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Kulu-Ya-Ku Thickhide", "itemCount": 1, "probability": 0.32},
               {"material": "Kulu-Ya-Ku Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Toughbone", "itemCount": 1, "probability": 0.18},
               {"material": "Large Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.15},
               {"material": "Large Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [{"material": "Large Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Large Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Large Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.28},
               {"material": "Large Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.23},
               {"material": "Kulu-Ya-Ku Thickhide", "itemCount": 2, "probability": 0.2},
               {"material": "Kulu-Ya-Ku Shard", "itemCount": 2, "probability": 0.18},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.11}],
            "Gold": [
               {"material": "Large Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.3},
               {"material": "Large Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.24},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.17},
               {"material": "Kulu-Ya-Ku Thickhide", "itemCount": 3, "probability": 0.16},
               {"material": "Kulu-Ya-Ku Shard", "itemCount": 3, "probability": 0.13}],
            "Bronze": [
               {"material": "Kulu-Ya-Ku Thickhide", "itemCount": 1, "probability": 0.32},
               {"material": "Kulu-Ya-Ku Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Toughbone", "itemCount": 1, "probability": 0.18},
               {"material": "Large Kulu-Ya-Ku Plume", "itemCount": 1, "probability": 0.15},
               {"material": "Large Kulu-Ya-Ku Beak", "itemCount": 1, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Fey Wyvern Gem", "Kulu-Ya-Ku Shard", "Kulu-Ya-Ku Thickhide", "Large Kulu-Ya-Ku Beak", "Large Kulu-Ya-Ku Plume",
            "Monster Toughbone"]
      }
   },
   "Kulve Taroth": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Kulve Taroth Golden Shell", "itemCount": 1, "probability": 0.61},
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 1, "probability": 0.31},
               {"material": "Dissolved Weapon", "itemCount": 1, "probability": 0.05},
               {"material": "Kulve Taroth Golden Glimstone", "itemCount": 1, "probability": 0.03}],
            "Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Break": {
            "giant horns": [
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 1, "probability": 0.72},
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 2, "probability": 0.25},
               {"material": "Kulve Taroth Golden Glimstone", "itemCount": 1, "probability": 0.03}],
            "tail": [
               {"material": "Kulve Taroth Golden Tailshell", "itemCount": 1, "probability": 0.71},
               {"material": "Kulve Taroth Golden Tailshell", "itemCount": 2, "probability": 0.26},
               {"material": "Kulve Taroth Golden Glimstone", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Kulve Taroth Golden Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Kulve Taroth Golden Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Kulve Taroth Golden Tailshell", "itemCount": 1, "probability": 0.18},
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Kulve Taroth Golden Nugget", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 3, "probability": 0.07},
               {"material": "Elder Dragon Blood", "itemCount": 3, "probability": 0.07}],
            "Gold": [
               {"material": "Kulve Taroth Golden Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Kulve Taroth Golden Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Kulve Taroth Golden Tailshell", "itemCount": 1, "probability": 0.18},
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Kulve Taroth Golden Nugget", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 3, "probability": 0.07},
               {"material": "Elder Dragon Blood", "itemCount": 3, "probability": 0.07}],
            "Bronze": [
               {"material": "Kulve Taroth Golden Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Kulve Taroth Golden Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Kulve Taroth Golden Tailshell", "itemCount": 1, "probability": 0.18},
               {"material": "Kulve Taroth Golden Spiralhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Kulve Taroth Golden Nugget", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 3, "probability": 0.07},
               {"material": "Elder Dragon Blood", "itemCount": 3, "probability": 0.07}]
         },
         "material": [
            "Dissolved Weapon", "Elder Dragon Blood", "Elder Dragon Bone", "Kulve Taroth Golden Glimstone",
            "Kulve Taroth Golden Nugget", "Kulve Taroth Golden Scale", "Kulve Taroth Golden Shell", "Kulve Taroth Golden Spiralhorn",
            "Kulve Taroth Golden Tailshell", "Monster Bone L"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Kulve Taroth Golden Scale+", "itemCount": 1, "probability": 0.45},
               {"material": "Kulve Taroth Golden Shell+", "itemCount": 1, "probability": 0.3},
               {"material": "Kulve Taroth Golden Tailshell+", "itemCount": 1, "probability": 0.21},
               {"material": "Golden Dragonsphire", "itemCount": 1, "probability": 0.04}],
            "Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Break": {
            "giant horns": [
               {"material": "Kulve Taroth Golden Spiralhorn+", "itemCount": 1, "probability": 0.97},
               {"material": "Golden Dragonsphire", "itemCount": 1, "probability": 0.03}],
            "tail": [
               {"material": "Kulve Taroth Golden Tailshell+", "itemCount": 1, "probability": 0.97},
               {"material": "Golden Dragonsphire", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Kulve Taroth Golden Nugget+", "itemCount": 1, "probability": 0.21},
               {"material": "Kulve Taroth Golden Spiralhorn+", "itemCount": 1, "probability": 0.21},
               {"material": "Kulve Taroth Golden Shell+", "itemCount": 2, "probability": 0.17},
               {"material": "Kulve Taroth Golden Tailshell+", "itemCount": 1, "probability": 0.16},
               {"material": "Kulve Taroth Golden Scale+", "itemCount": 2, "probability": 0.15},
               {"material": "Golden Dragonsphire", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Kulve Taroth Golden Spiralhorn+", "itemCount": 1, "probability": 0.24},
               {"material": "Kulve Taroth Golden Tailshell+", "itemCount": 1, "probability": 0.21},
               {"material": "Golden Dragonsphire", "itemCount": 1, "probability": 0.16},
               {"material": "Kulve Taroth Golden Nugget+", "itemCount": 2, "probability": 0.14},
               {"material": "Kulve Taroth Golden Shell+", "itemCount": 3, "probability": 0.13},
               {"material": "Kulve Taroth Golden Scale+", "itemCount": 3, "probability": 0.12}],
            "Bronze": [
               {"material": "Kulve Taroth Golden Shell+", "itemCount": 1, "probability": 0.33},
               {"material": "Kulve Taroth Golden Scale+", "itemCount": 1, "probability": 0.29},
               {"material": "Kulve Taroth Golden Nugget+", "itemCount": 3, "probability": 0.21},
               {"material": "Kulve Taroth Golden Tailshell+", "itemCount": 1, "probability": 0.14},
               {"material": "Golden Dragonsphire", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Golden Dragonsphire", "Kulve Taroth Golden Nugget+", "Kulve Taroth Golden Scale+", "Kulve Taroth Golden Shell+",
            "Kulve Taroth Golden Spiralhorn+", "Kulve Taroth Golden Tailshell+", "Monster Bone L"]
      }
   },
   "Kushala Daora": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Daora Dragon Scale+", "itemCount": 1, "probability": 0.32},
               {"material": "Daora Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Daora Claw+", "itemCount": 1, "probability": 0.19},
               {"material": "Daora Webbing", "itemCount": 1, "probability": 0.15},
               {"material": "Daora Horn+", "itemCount": 1, "probability": 0.08},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Daora Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Daora Dragon Scale+", "itemCount": 1, "probability": 0.22},
               {"material": "Daora Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Webbing", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Daora Horn+", "itemCount": 1, "probability": 0.66},
               {"material": "Daora Dragon Scale+", "itemCount": 2, "probability": 0.32},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Daora Webbing", "itemCount": 1, "probability": 0.7},
               {"material": "Daora Claw+", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Daora Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Daora Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Daora Tail", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Horn+", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Daora Dragon Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Daora Tail", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Horn+", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Daora Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Daora Dragon Scale+", "itemCount": 3, "probability": 0.09}],
            "Bronze": [
               {"material": "Daora Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Daora Dragon Scale+", "itemCount": 1, "probability": 0.22},
               {"material": "Daora Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Webbing", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Daora Carapace", "Daora Claw+", "Daora Dragon Scale+", "Daora Gem", "Daora Horn+", "Daora Tail", "Daora Webbing",
            "Elder Dragon Blood", "Elder Dragon Bone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone",
            "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Daora Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Daora Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Daora Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Daora Hardhorn", "itemCount": 1, "probability": 0.08},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Daora Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Daora Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Daora Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Daora Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Daora Hardhorn", "itemCount": 1, "probability": 0.66},
               {"material": "Daora Shard", "itemCount": 2, "probability": 0.32},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Daora Fellwing", "itemCount": 1, "probability": 0.7},
               {"material": "Daora Hardclaw", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Daora Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Daora Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Daora Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Daora Cortex", "itemCount": 2, "probability": 0.16},
               {"material": "Daora Hardhorn", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Hardclaw", "itemCount": 1, "probability": 0.14},
               {"material": "Daora Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Daora Lash", "itemCount": 1, "probability": 0.2},
               {"material": "Daora Hardhorn", "itemCount": 1, "probability": 0.18},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Fellwing", "itemCount": 1, "probability": 0.16},
               {"material": "Daora Cortex", "itemCount": 3, "probability": 0.14},
               {"material": "Daora Shard", "itemCount": 3, "probability": 0.08},
               {"material": "Daora Hardclaw", "itemCount": 2, "probability": 0.08}],
            "Bronze": [
               {"material": "Daora Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Daora Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Daora Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Daora Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08},
               {"material": "Daora Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Carved Feystone", "Daora Cortex", "Daora Fellwing", "Daora Gem", "Daora Hardclaw", "Daora Hardhorn", "Daora Lash",
            "Daora Shard", "Large Elder Dragon Bone", "Large Elder Dragon Gem", "Pure Dragon Blood", "Sealed Feystone"]
      }
   },
   "Lavasioth": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Lavasioth Scale+", "itemCount": 1, "probability": 0.35},
               {"material": "Lavasioth Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Lavasioth Fin+", "itemCount": 1, "probability": 0.2},
               {"material": "Lavasioth Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Lavasioth Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Lavasioth Scale+", "itemCount": 1, "probability": 0.24},
               {"material": "Lavasioth Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.14},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Lavasioth Fin+", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "head": [{"material": "Lavasioth Fang+", "itemCount": 1, "probability": 1}],
            "fin": [{"material": "Lavasioth Fin+", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Lavasioth Fang+", "itemCount": 1, "probability": 0.32},
               {"material": "Lavasioth Fin+", "itemCount": 1, "probability": 0.23},
               {"material": "Lavasioth Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Lavasioth Scale+", "itemCount": 2, "probability": 0.11},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Lavasioth Fang+", "itemCount": 1, "probability": 0.3},
               {"material": "Lavasioth Fin+", "itemCount": 1, "probability": 0.24},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Lavasioth Carapace", "itemCount": 3, "probability": 0.12},
               {"material": "Inferno Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Lavasioth Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Lavasioth Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Lavasioth Scale+", "itemCount": 1, "probability": 0.24},
               {"material": "Lavasioth Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.14},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Lavasioth Fin+", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Glowing Feystone", "Inferno Sac", "Lavasioth Carapace", "Lavasioth Fang+", "Lavasioth Fin+", "Lavasioth Scale+",
            "Monster Hardbone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Lavasioth Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Lavasioth Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Lavasioth Grandfin", "itemCount": 1, "probability": 0.2},
               {"material": "Lavasioth Hardfang", "itemCount": 1, "probability": 0.15},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Lavasioth Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Lavasioth Shard", "itemCount": 1, "probability": 0.24},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Lavasioth Hardfang", "itemCount": 1, "probability": 0.15},
               {"material": "Lavasioth Grandfin", "itemCount": 1, "probability": 0.09},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [{"material": "Lavasioth Hardfang", "itemCount": 1, "probability": 1}],
            "fin": [{"material": "Lavasioth Grandfin", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Lavasioth Hardfang", "itemCount": 1, "probability": 0.3},
               {"material": "Lavasioth Grandfin", "itemCount": 1, "probability": 0.21},
               {"material": "Lavasioth Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.12},
               {"material": "Lavasioth Shard", "itemCount": 2, "probability": 0.11}],
            "Gold": [
               {"material": "Lavasioth Hardfang", "itemCount": 1, "probability": 0.25},
               {"material": "Lavasioth Grandfin", "itemCount": 1, "probability": 0.25},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.2},
               {"material": "Lavasioth Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Conflagrant Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Lavasioth Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Lavasioth Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Lavasioth Shard", "itemCount": 1, "probability": 0.24},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Lavasioth Hardfang", "itemCount": 1, "probability": 0.15},
               {"material": "Lavasioth Grandfin", "itemCount": 1, "probability": 0.09},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Conflagrant Sac", "Large Wyvern Gem", "Lavasioth Cortex", "Lavasioth Grandfin",
            "Lavasioth Hardfang", "Lavasioth Shard", "Sealed Feystone"]
      }
   },
   "Legiana": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Legiana Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.25},
               {"material": "Legiana Claw", "itemCount": 1, "probability": 0.2},
               {"material": "Legiana Webbing", "itemCount": 1, "probability": 0.15},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.27},
               {"material": "Legiana Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Frost Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Claw", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Bone+", "itemCount": 2, "probability": 0.1},
               {"material": "Legiana Webbing", "itemCount": 1, "probability": 0.09},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.62},
               {"material": "Legiana Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03}],
            "back": [
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.99},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Legiana Webbing", "itemCount": 1, "probability": 0.7},
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.3}],
            "tail": [
               {"material": "Legiana Tail Webbing", "itemCount": 1, "probability": 0.7},
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.25},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Legiana Tail Webbing", "itemCount": 1, "probability": 0.22},
               {"material": "Legiana Webbing", "itemCount": 1, "probability": 0.17},
               {"material": "Legiana Claw", "itemCount": 1, "probability": 0.16},
               {"material": "Legiana Hide", "itemCount": 2, "probability": 0.14},
               {"material": "Frost Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Legiana Scale", "itemCount": 2, "probability": 0.11},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Legiana Claw", "itemCount": 1, "probability": 0.2},
               {"material": "Legiana Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Legiana Tail Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Legiana Hide", "itemCount": 3, "probability": 0.12},
               {"material": "Frost Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Legiana Scale", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Legiana Hide", "itemCount": 1, "probability": 0.27},
               {"material": "Legiana Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Frost Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Claw", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Bone+", "itemCount": 2, "probability": 0.1},
               {"material": "Legiana Webbing", "itemCount": 1, "probability": 0.09},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Frost Sac", "Legiana Claw", "Legiana Hide", "Legiana Plate", "Legiana Scale", "Legiana Tail Webbing", "Legiana Webbing",
            "Monster Bone+"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Legiana Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.24},
               {"material": "Legiana Claw+", "itemCount": 1, "probability": 0.2},
               {"material": "Legiana Wing", "itemCount": 1, "probability": 0.15},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.27},
               {"material": "Legiana Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Freezer Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Claw+", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Legiana Wing", "itemCount": 1, "probability": 0.09},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.62},
               {"material": "Legiana Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.96},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Legiana Wing", "itemCount": 1, "probability": 0.7},
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.3}],
            "tail": [
               {"material": "Legiana Tail Webbing", "itemCount": 1, "probability": 0.7},
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.24},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Legiana Claw+", "itemCount": 1, "probability": 0.24},
               {"material": "Legiana Wing", "itemCount": 1, "probability": 0.2},
               {"material": "Freezer Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Legiana Hide+", "itemCount": 2, "probability": 0.14},
               {"material": "Legiana Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.1},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Legiana Claw+", "itemCount": 1, "probability": 0.24},
               {"material": "Legiana Wing", "itemCount": 1, "probability": 0.19},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Freezer Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Legiana Hide+", "itemCount": 3, "probability": 0.12},
               {"material": "Legiana Scale+", "itemCount": 3, "probability": 0.1},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Legiana Hide+", "itemCount": 1, "probability": 0.27},
               {"material": "Legiana Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Freezer Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Claw+", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Legiana Wing", "itemCount": 1, "probability": 0.09},
               {"material": "Legiana Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Freezer Sac", "Glowing Feystone", "Legiana Claw+", "Legiana Gem", "Legiana Hide+", "Legiana Plate", "Legiana Scale+",
            "Legiana Tail Webbing", "Legiana Wing", "Monster Hardbone", "Shining Streamstone", "Sullied Streamstone",
            "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.24},
               {"material": "Legiana Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Legiana Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.29},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.23},
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Legiana Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Legiana Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.62},
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.96},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Legiana Fellwing", "itemCount": 1, "probability": 0.7},
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.3}],
            "tail": [
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.7},
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.24},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.01}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.22},
               {"material": "Legiana Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Legiana Thickhide", "itemCount": 2, "probability": 0.14},
               {"material": "Cryo Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Legiana Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.07}],
            "Gold": [
               {"material": "Legiana Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.14},
               {"material": "Legiana Thickhide", "itemCount": 3, "probability": 0.12},
               {"material": "Cryo Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Legiana Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Legiana Thickhide", "itemCount": 1, "probability": 0.29},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.23},
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Legiana Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Legiana Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Legiana Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Cryo Sac", "Legiana Fellwing", "Legiana Gem", "Legiana Hardclaw",
            "Legiana Mantle", "Legiana Shard", "Legiana Tail Webbing+", "Legiana Thickhide", "Sealed Feystone"]
      }
   },
   "Leshen": {
      "High Rank": {
         "General": {
            "Kill": [{"material": "Leshen Skull", "itemCount": 1, "probability": 1}],
            "Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Break": {
            "antlers": [{"material": "Leshen Antlers", "itemCount": 1, "probability": 1}],
            "body": [{"material": "Leshen Resin", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {},
         "material": ["Leshen Antlers", "Leshen Resin", "Leshen Skull", "Monster Bone L"]
      }
   },
   "Lunastra": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Lunastra Scale+", "itemCount": 1, "probability": 0.31},
               {"material": "Lunastra Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Lunastra Mane", "itemCount": 1, "probability": 0.19},
               {"material": "Lunastra Tail", "itemCount": 1, "probability": 0.15},
               {"material": "Lunastra Wing", "itemCount": 1, "probability": 0.08},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Lunastra Carapace", "itemCount": 1, "probability": 0.22},
               {"material": "Lunastra Mane", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Scale+", "itemCount": 1, "probability": 0.18},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.12},
               {"material": "Lunastra Wing", "itemCount": 1, "probability": 0.12},
               {"material": "Lunastra Horn", "itemCount": 1, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Lunastra Horn", "itemCount": 1, "probability": 0.65},
               {"material": "Lunastra Mane", "itemCount": 2, "probability": 0.32},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.03}],
            "wing": [
               {"material": "Lunastra Wing", "itemCount": 1, "probability": 0.7},
               {"material": "Lunastra Carapace", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Lunastra Tail", "itemCount": 1, "probability": 0.75},
               {"material": "Lunastra Scale+", "itemCount": 1, "probability": 0.22},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Lunastra Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Horn", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Scale+", "itemCount": 2, "probability": 0.16},
               {"material": "Lunastra Wing", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Mane", "itemCount": 1, "probability": 0.14},
               {"material": "Lunastra Carapace", "itemCount": 2, "probability": 0.12},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Lunastra Horn", "itemCount": 1, "probability": 0.2},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Wing", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Scale+", "itemCount": 3, "probability": 0.14},
               {"material": "Lunastra Carapace", "itemCount": 3, "probability": 0.08},
               {"material": "Lunastra Mane", "itemCount": 2, "probability": 0.08}],
            "Bronze": [
               {"material": "Lunastra Carapace", "itemCount": 1, "probability": 0.22},
               {"material": "Lunastra Mane", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Scale+", "itemCount": 1, "probability": 0.18},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.12},
               {"material": "Lunastra Wing", "itemCount": 1, "probability": 0.12},
               {"material": "Lunastra Horn", "itemCount": 1, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.08}]
         },
         "material": [
            "Elder Dragon Blood", "Elder Dragon Bone", "Lunastra Carapace", "Lunastra Gem", "Lunastra Horn", "Lunastra Mane",
            "Lunastra Scale+", "Lunastra Tail", "Lunastra Wing", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone",
            "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Lunastra Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Lunastra Cortex", "itemCount": 1, "probability": 0.23},
               {"material": "Lunastra Mane+", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Fellwing", "itemCount": 1, "probability": 0.13},
               {"material": "Lunastra Hardhorn", "itemCount": 1, "probability": 0.08},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Lunastra Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Lunastra Shard", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Mane+", "itemCount": 1, "probability": 0.15},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Lunastra Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Lunastra Lash", "itemCount": 1, "probability": 0.1},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Lunastra Hardhorn", "itemCount": 1, "probability": 0.65},
               {"material": "Lunastra Mane+", "itemCount": 2, "probability": 0.32},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}],
            "wing": [
               {"material": "Lunastra Fellwing", "itemCount": 1, "probability": 0.7},
               {"material": "Lunastra Cortex", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Lunastra Lash", "itemCount": 1, "probability": 0.75},
               {"material": "Lunastra Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Lunastra Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Hardhorn", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Shard", "itemCount": 2, "probability": 0.16},
               {"material": "Lunastra Mane+", "itemCount": 1, "probability": 0.14},
               {"material": "Lunastra Cortex", "itemCount": 2, "probability": 0.12},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Lunastra Hardhorn", "itemCount": 1, "probability": 0.2},
               {"material": "Lunastra Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Fellwing", "itemCount": 1, "probability": 0.16},
               {"material": "Lunastra Shard", "itemCount": 3, "probability": 0.14},
               {"material": "Lunastra Cortex", "itemCount": 3, "probability": 0.08},
               {"material": "Lunastra Mane+", "itemCount": 2, "probability": 0.08}],
            "Bronze": [
               {"material": "Lunastra Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Lunastra Shard", "itemCount": 1, "probability": 0.18},
               {"material": "Lunastra Mane+", "itemCount": 1, "probability": 0.15},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Lunastra Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Lunastra Lash", "itemCount": 1, "probability": 0.1},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08},
               {"material": "Lunastra Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Carved Feystone", "Large Elder Dragon Bone", "Large Elder Dragon Gem", "Lunastra Cortex", "Lunastra Fellwing",
            "Lunastra Gem", "Lunastra Hardhorn", "Lunastra Lash", "Lunastra Mane+", "Lunastra Shard", "Pure Dragon Blood",
            "Sealed Feystone"]
      }
   },
   "Namielle": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Namielle Finehide", "itemCount": 1, "probability": 0.35},
               {"material": "Namielle Hardclaw", "itemCount": 1, "probability": 0.26},
               {"material": "Namielle Fellwing", "itemCount": 1, "probability": 0.21},
               {"material": "Namielle Whisker", "itemCount": 1, "probability": 0.16},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Namielle Hardclaw", "itemCount": 1, "probability": 0.24},
               {"material": "Namielle Finehide", "itemCount": 1, "probability": 0.19},
               {"material": "Namielle Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Namielle Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.12},
               {"material": "Namielle Whisker", "itemCount": 1, "probability": 0.09},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Namielle Whisker", "itemCount": 1, "probability": 0.66},
               {"material": "Namielle Finehide", "itemCount": 2, "probability": 0.32},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "forelimbs": [
               {"material": "Namielle Hardclaw", "itemCount": 1, "probability": 0.8},
               {"material": "Namielle Finehide", "itemCount": 1, "probability": 0.2}],
            "wing": [
               {"material": "Namielle Fellwing", "itemCount": 1, "probability": 0.65},
               {"material": "Namielle Finehide", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Namielle Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Namielle Finehide", "itemCount": 1, "probability": 0.27},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Namielle Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Namielle Fellwing", "itemCount": 1, "probability": 0.19},
               {"material": "Namielle Whisker", "itemCount": 1, "probability": 0.19},
               {"material": "Namielle Finehide", "itemCount": 2, "probability": 0.18},
               {"material": "Namielle Hardclaw", "itemCount": 2, "probability": 0.14},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Namielle Fellwing", "itemCount": 1, "probability": 0.21},
               {"material": "Namielle Whisker", "itemCount": 1, "probability": 0.21},
               {"material": "Namielle Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Namielle Finehide", "itemCount": 3, "probability": 0.13},
               {"material": "Namielle Hardclaw", "itemCount": 3, "probability": 0.11}],
            "Bronze": [
               {"material": "Namielle Hardclaw", "itemCount": 1, "probability": 0.24},
               {"material": "Namielle Finehide", "itemCount": 1, "probability": 0.19},
               {"material": "Namielle Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Namielle Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.12},
               {"material": "Namielle Whisker", "itemCount": 1, "probability": 0.09},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Carved Feystone", "Large Elder Dragon Bone", "Large Elder Dragon Gem", "Namielle Fellwing", "Namielle Finehide",
            "Namielle Hardclaw", "Namielle Lash", "Namielle Whisker", "Pure Dragon Blood", "Sealed Feystone"]
      }
   },
   "Nargacuga": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Nargacuga Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Nargacuga Blackfur+", "itemCount": 1, "probability": 0.24},
               {"material": "Nargacuga Hardfang", "itemCount": 1, "probability": 0.17},
               {"material": "Nargacuga Tailspear", "itemCount": 1, "probability": 0.14},
               {"material": "Nargacuga Lash", "itemCount": 1, "probability": 0.11},
               {"material": "Nargacuga Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Nargacuga Blackfur+", "itemCount": 1, "probability": 0.28},
               {"material": "Nargacuga Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Nargacuga Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Nargacuga Tailspear", "itemCount": 1, "probability": 0.14},
               {"material": "Nargacuga Cutwing+", "itemCount": 1, "probability": 0.11},
               {"material": "Nargacuga Lash", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Nargacuga Hardfang", "itemCount": 1, "probability": 0.66},
               {"material": "Nargacuga Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Nargacuga Mantle", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Nargacuga Cutwing+", "itemCount": 1, "probability": 0.85},
               {"material": "Nargacuga Blackfur+", "itemCount": 2, "probability": 0.15}]
         },
         "Sever": {
            "tail": [
               {"material": "Nargacuga Lash", "itemCount": 1, "probability": 0.62},
               {"material": "Nargacuga Tailspear", "itemCount": 1, "probability": 0.35},
               {"material": "Nargacuga Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Nargacuga Hardfang", "itemCount": 1, "probability": 0.22},
               {"material": "Nargacuga Tailspear", "itemCount": 1, "probability": 0.18},
               {"material": "Nargacuga Blackfur+", "itemCount": 2, "probability": 0.14},
               {"material": "Nargacuga Cutwing+", "itemCount": 1, "probability": 0.14},
               {"material": "Nargacuga Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Nargacuga Lash", "itemCount": 1, "probability": 0.12},
               {"material": "Nargacuga Mantle", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Nargacuga Hardfang", "itemCount": 1, "probability": 0.18},
               {"material": "Nargacuga Cutwing+", "itemCount": 1, "probability": 0.16},
               {"material": "Nargacuga Mantle", "itemCount": 1, "probability": 0.16},
               {"material": "Nargacuga Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Nargacuga Tailspear", "itemCount": 2, "probability": 0.14},
               {"material": "Nargacuga Blackfur+", "itemCount": 3, "probability": 0.12},
               {"material": "Nargacuga Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Nargacuga Blackfur+", "itemCount": 1, "probability": 0.28},
               {"material": "Nargacuga Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Nargacuga Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Nargacuga Tailspear", "itemCount": 1, "probability": 0.14},
               {"material": "Nargacuga Cutwing+", "itemCount": 1, "probability": 0.11},
               {"material": "Nargacuga Lash", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Nargacuga Blackfur+", "Nargacuga Cutwing+", "Nargacuga Hardfang",
            "Nargacuga Lash", "Nargacuga Mantle", "Nargacuga Shard", "Nargacuga Tailspear", "Sealed Feystone"]
      }
   },
   "Nergigante": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Immortal Dragonscale", "itemCount": 1, "probability": 0.32},
               {"material": "Nergigante Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Nergigante Talon", "itemCount": 1, "probability": 0.19},
               {"material": "Nergigante Regrowth Plate", "itemCount": 1, "probability": 0.15},
               {"material": "Nergigante Horn+", "itemCount": 1, "probability": 0.08},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Nergigante Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Immortal Dragonscale", "itemCount": 1, "probability": 0.22},
               {"material": "Nergigante Regrowth Plate", "itemCount": 1, "probability": 0.18},
               {"material": "Nergigante Talon", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.12},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "horn": [
               {"material": "Nergigante Horn+", "itemCount": 1, "probability": 0.66},
               {"material": "Nergigante Regrowth Plate", "itemCount": 2, "probability": 0.34}],
            "horns": [
               {"material": "Nergigante Horn+", "itemCount": 1, "probability": 0.97},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Sever": {
            "tail": [
               {"material": "Nergigante Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Immortal Dragonscale", "itemCount": 1, "probability": 0.27},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Nergigante Talon", "itemCount": 1, "probability": 0.2},
               {"material": "Nergigante Tail", "itemCount": 1, "probability": 0.18},
               {"material": "Nergigante Horn+", "itemCount": 1, "probability": 0.18},
               {"material": "Nergigante Regrowth Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Nergigante Carapace", "itemCount": 2, "probability": 0.12},
               {"material": "Immortal Dragonscale", "itemCount": 2, "probability": 0.1},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Nergigante Talon", "itemCount": 1, "probability": 0.2},
               {"material": "Nergigante Horn+", "itemCount": 1, "probability": 0.17},
               {"material": "Nergigante Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Nergigante Regrowth Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Nergigante Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Immortal Dragonscale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Nergigante Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Immortal Dragonscale", "itemCount": 1, "probability": 0.22},
               {"material": "Nergigante Regrowth Plate", "itemCount": 1, "probability": 0.18},
               {"material": "Nergigante Talon", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.12},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Elder Dragon Blood", "Elder Dragon Bone", "Immortal Dragonscale", "Nergigante Carapace", "Nergigante Gem",
            "Nergigante Horn+", "Nergigante Regrowth Plate", "Nergigante Tail", "Nergigante Talon", "Shining Streamstone",
            "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {"Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]},
         "Break": {
            "horn": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "horns": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Gold": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Bronze": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}]
         },
         "material": ["Carved Feystone", "Iron Ore", "Monster Bone L", "Sealed Feystone"]
      }
   },
   "Nightshade Paolumu": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Glowing Feystone", "Mysterious Feystone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Nightshade Paolumu Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Nightshade Paolumu Thickfur", "itemCount": 1, "probability": 0.26},
               {"material": "Nightshade Paolumu Fellwing", "itemCount": 1, "probability": 0.2},
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.15},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Nightshade Paolumu Thickfur", "itemCount": 1, "probability": 0.28},
               {"material": "Torpor Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Nightshade Paolumu Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.16},
               {"material": "Nightshade Paolumu Fellwing", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "neck pouch": [{"material": "Nightshade Paolumu Thickfur", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Nightshade Paolumu Thickfur", "itemCount": 1, "probability": 1}],
            "wings": [{"material": "Nightshade Paolumu Fellwing", "itemCount": 1, "probability": 1}],
            "tail": [{"material": "Paolumu Cortex", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.32},
               {"material": "Nightshade Paolumu Fellwing", "itemCount": 1, "probability": 0.23},
               {"material": "Nightshade Paolumu Thickfur", "itemCount": 2, "probability": 0.14},
               {"material": "Torpor Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Nightshade Paolumu Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.3},
               {"material": "Nightshade Paolumu Fellwing", "itemCount": 1, "probability": 0.24},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Nightshade Paolumu Thickfur", "itemCount": 3, "probability": 0.12},
               {"material": "Torpor Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Nightshade Paolumu Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Nightshade Paolumu Thickfur", "itemCount": 1, "probability": 0.28},
               {"material": "Torpor Sac", "itemCount": 1, "probability": 0.22},
               {"material": "Nightshade Paolumu Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.16},
               {"material": "Nightshade Paolumu Fellwing", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Large Wyvern Gem", "Nightshade Paolumu Fellwing", "Nightshade Paolumu Shard",
            "Nightshade Paolumu Thickfur", "Paolumu Cortex", "Torpor Sac", "Wyvern Gem"]
      }
   },
   "Odogaron": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Odogaron Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Odogaron Sinew", "itemCount": 1, "probability": 0.25},
               {"material": "Odogaron Claw", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Fang", "itemCount": 1, "probability": 0.15},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Odogaron Sinew", "itemCount": 1, "probability": 0.27},
               {"material": "Odogaron Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Nourishing Extract", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.13},
               {"material": "Odogaron Claw", "itemCount": 1, "probability": 0.12},
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Odogaron Fang", "itemCount": 1, "probability": 0.62},
               {"material": "Odogaron Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.03}],
            "forelimbs": [
               {"material": "Odogaron Claw", "itemCount": 1, "probability": 0.75},
               {"material": "Odogaron Scale", "itemCount": 2, "probability": 0.25}],
            "hindlegs": [
               {"material": "Odogaron Sinew", "itemCount": 1, "probability": 0.75},
               {"material": "Odogaron Scale", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Odogaron Scale", "itemCount": 1, "probability": 0.25},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.21},
               {"material": "Odogaron Claw", "itemCount": 1, "probability": 0.18},
               {"material": "Odogaron Fang", "itemCount": 1, "probability": 0.17},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Odogaron Sinew", "itemCount": 2, "probability": 0.12},
               {"material": "Odogaron Scale", "itemCount": 2, "probability": 0.1},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.21},
               {"material": "Odogaron Claw", "itemCount": 1, "probability": 0.18},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Odogaron Fang", "itemCount": 1, "probability": 0.15},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Odogaron Sinew", "itemCount": 3, "probability": 0.1},
               {"material": "Odogaron Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Odogaron Sinew", "itemCount": 1, "probability": 0.27},
               {"material": "Odogaron Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Nourishing Extract", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.13},
               {"material": "Odogaron Claw", "itemCount": 1, "probability": 0.12},
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Monster Bone+", "Nourishing Extract", "Odogaron Claw", "Odogaron Fang", "Odogaron Plate", "Odogaron Scale",
            "Odogaron Sinew", "Odogaron Tail"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Odogaron Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Odogaron Sinew+", "itemCount": 1, "probability": 0.24},
               {"material": "Odogaron Claw+", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Odogaron Sinew+", "itemCount": 1, "probability": 0.26},
               {"material": "Odogaron Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.13},
               {"material": "Odogaron Claw+", "itemCount": 1, "probability": 0.12},
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Odogaron Fang+", "itemCount": 1, "probability": 0.62},
               {"material": "Odogaron Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.03},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.01}],
            "forelimbs": [
               {"material": "Odogaron Claw+", "itemCount": 1, "probability": 0.75},
               {"material": "Odogaron Scale+", "itemCount": 2, "probability": 0.25}],
            "hindlegs": [
               {"material": "Odogaron Sinew+", "itemCount": 1, "probability": 0.75},
               {"material": "Odogaron Scale+", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Odogaron Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.07},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Odogaron Claw+", "itemCount": 1, "probability": 0.24},
               {"material": "Odogaron Fang+", "itemCount": 1, "probability": 0.2},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Odogaron Sinew+", "itemCount": 2, "probability": 0.14},
               {"material": "Odogaron Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.1},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Odogaron Claw+", "itemCount": 1, "probability": 0.22},
               {"material": "Odogaron Fang+", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Odogaron Sinew+", "itemCount": 3, "probability": 0.12},
               {"material": "Odogaron Scale+", "itemCount": 3, "probability": 0.11},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Odogaron Sinew+", "itemCount": 1, "probability": 0.26},
               {"material": "Odogaron Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.16},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.13},
               {"material": "Odogaron Claw+", "itemCount": 1, "probability": 0.12},
               {"material": "Odogaron Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Odogaron Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Glowing Feystone", "Monster Hardbone", "Nourishing Extract", "Odogaron Claw+", "Odogaron Fang+", "Odogaron Gem",
            "Odogaron Plate", "Odogaron Scale+", "Odogaron Sinew+", "Odogaron Tail", "Shining Streamstone", "Sullied Streamstone",
            "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Odogaron Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Hard Odogaron Sinew", "itemCount": 1, "probability": 0.24},
               {"material": "Odogaron Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Hardfang", "itemCount": 1, "probability": 0.15},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Odogaron Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Hard Odogaron Sinew", "itemCount": 1, "probability": 0.3},
               {"material": "Odogaron Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.18},
               {"material": "Odogaron Hardclaw", "itemCount": 1, "probability": 0.15},
               {"material": "Odogaron Lash", "itemCount": 1, "probability": 0.11},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Odogaron Hardfang", "itemCount": 1, "probability": 0.62},
               {"material": "Odogaron Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.03},
               {"material": "Odogaron Mantle", "itemCount": 1, "probability": 0.01}],
            "forelimbs": [
               {"material": "Odogaron Hardclaw", "itemCount": 1, "probability": 0.75},
               {"material": "Odogaron Shard", "itemCount": 2, "probability": 0.25}],
            "hindlegs": [
               {"material": "Hard Odogaron Sinew", "itemCount": 1, "probability": 0.75},
               {"material": "Odogaron Shard", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Odogaron Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Odogaron Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.07},
               {"material": "Odogaron Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Odogaron Lash", "itemCount": 1, "probability": 0.2},
               {"material": "Odogaron Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Odogaron Hardfang", "itemCount": 1, "probability": 0.17},
               {"material": "Hard Odogaron Sinew", "itemCount": 2, "probability": 0.14},
               {"material": "Odogaron Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.1},
               {"material": "Odogaron Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Odogaron Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Odogaron Hardfang", "itemCount": 1, "probability": 0.18},
               {"material": "Odogaron Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Odogaron Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Hard Odogaron Sinew", "itemCount": 3, "probability": 0.12},
               {"material": "Odogaron Shard", "itemCount": 3, "probability": 0.11},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Hard Odogaron Sinew", "itemCount": 1, "probability": 0.3},
               {"material": "Odogaron Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.18},
               {"material": "Odogaron Hardclaw", "itemCount": 1, "probability": 0.15},
               {"material": "Odogaron Lash", "itemCount": 1, "probability": 0.11},
               {"material": "Odogaron Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Hard Odogaron Sinew", "Nourishing Extract", "Odogaron Gem", "Odogaron Hardclaw",
            "Odogaron Hardfang", "Odogaron Lash", "Odogaron Mantle", "Odogaron Shard", "Sealed Feystone"]
      }
   },
   "Paolumu": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Paolumu Scale", "itemCount": 1, "probability": 0.36},
               {"material": "Paolumu Pelt", "itemCount": 1, "probability": 0.28},
               {"material": "Paolumu Webbing", "itemCount": 1, "probability": 0.21},
               {"material": "Paolumu Shell", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Paolumu Pelt", "itemCount": 1, "probability": 0.27},
               {"material": "Paolumu Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Bone L", "itemCount": 1, "probability": 0.16},
               {"material": "Paolumu Shell", "itemCount": 1, "probability": 0.15},
               {"material": "Nourishing Extract", "itemCount": 1, "probability": 0.12},
               {"material": "Paolumu Webbing", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "neck pouch": [{"material": "Paolumu Pelt", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Paolumu Pelt", "itemCount": 1, "probability": 1}],
            "wings": [{"material": "Paolumu Webbing", "itemCount": 1, "probability": 1}],
            "tail": [{"material": "Paolumu Shell", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Paolumu Shell", "itemCount": 1, "probability": 0.32},
               {"material": "Paolumu Webbing", "itemCount": 1, "probability": 0.25},
               {"material": "Paolumu Pelt", "itemCount": 2, "probability": 0.18},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Paolumu Scale", "itemCount": 2, "probability": 0.11}],
            "Gold": [
               {"material": "Paolumu Shell", "itemCount": 1, "probability": 0.36},
               {"material": "Paolumu Webbing", "itemCount": 1, "probability": 0.3},
               {"material": "Paolumu Pelt", "itemCount": 3, "probability": 0.14},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Paolumu Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Paolumu Pelt", "itemCount": 1, "probability": 0.27},
               {"material": "Paolumu Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Bone L", "itemCount": 1, "probability": 0.16},
               {"material": "Paolumu Shell", "itemCount": 1, "probability": 0.15},
               {"material": "Nourishing Extract", "itemCount": 1, "probability": 0.12},
               {"material": "Paolumu Webbing", "itemCount": 1, "probability": 0.09}]
         },
         "material": ["Monster Bone L", "Nourishing Extract", "Paolumu Pelt", "Paolumu Scale", "Paolumu Shell", "Paolumu Webbing"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Paolumu Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Paolumu Pelt+", "itemCount": 1, "probability": 0.28},
               {"material": "Paolumu Wing", "itemCount": 1, "probability": 0.21},
               {"material": "Paolumu Carapace+", "itemCount": 1, "probability": 0.15},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Paolumu Pelt+", "itemCount": 1, "probability": 0.26},
               {"material": "Paolumu Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.16},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Paolumu Carapace+", "itemCount": 1, "probability": 0.14},
               {"material": "Paolumu Wing", "itemCount": 2, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "neck pouch": [{"material": "Paolumu Pelt+", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Paolumu Pelt+", "itemCount": 1, "probability": 1}],
            "wings": [{"material": "Paolumu Wing", "itemCount": 1, "probability": 1}],
            "tail": [{"material": "Paolumu Carapace+", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Paolumu Carapace+", "itemCount": 1, "probability": 0.32},
               {"material": "Paolumu Wing", "itemCount": 1, "probability": 0.23},
               {"material": "Paolumu Pelt+", "itemCount": 2, "probability": 0.14},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.12},
               {"material": "Paolumu Scale+", "itemCount": 2, "probability": 0.11},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Paolumu Carapace+", "itemCount": 1, "probability": 0.3},
               {"material": "Paolumu Wing", "itemCount": 1, "probability": 0.24},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Paolumu Pelt+", "itemCount": 3, "probability": 0.12},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.1},
               {"material": "Paolumu Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Paolumu Pelt+", "itemCount": 1, "probability": 0.26},
               {"material": "Paolumu Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.16},
               {"material": "Nourishing Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Paolumu Carapace+", "itemCount": 1, "probability": 0.14},
               {"material": "Paolumu Wing", "itemCount": 2, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Glowing Feystone", "Monster Keenbone", "Mysterious Feystone", "Nourishing Extract", "Paolumu Carapace+", "Paolumu Pelt+",
            "Paolumu Scale+", "Paolumu Wing", "Warped Feystone", "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Paolumu Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Paolumu Thickfur", "itemCount": 1, "probability": 0.26},
               {"material": "Paolumu Fellwing", "itemCount": 1, "probability": 0.2},
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.15},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Paolumu Thickfur", "itemCount": 1, "probability": 0.32},
               {"material": "Paolumu Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.18},
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.16},
               {"material": "Paolumu Fellwing", "itemCount": 2, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "neck pouch": [{"material": "Paolumu Thickfur", "itemCount": 1, "probability": 1}],
            "back": [{"material": "Paolumu Thickfur", "itemCount": 1, "probability": 1}],
            "wings": [{"material": "Paolumu Fellwing", "itemCount": 1, "probability": 1}],
            "tail": [{"material": "Paolumu Cortex", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.32},
               {"material": "Paolumu Fellwing", "itemCount": 1, "probability": 0.23},
               {"material": "Paolumu Thickfur", "itemCount": 2, "probability": 0.14},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Paolumu Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.3},
               {"material": "Paolumu Fellwing", "itemCount": 1, "probability": 0.24},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Paolumu Thickfur", "itemCount": 3, "probability": 0.12},
               {"material": "Nourishing Extract", "itemCount": 5, "probability": 0.1},
               {"material": "Paolumu Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Paolumu Thickfur", "itemCount": 1, "probability": 0.32},
               {"material": "Paolumu Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Nourishing Extract", "itemCount": 3, "probability": 0.18},
               {"material": "Paolumu Cortex", "itemCount": 1, "probability": 0.16},
               {"material": "Paolumu Fellwing", "itemCount": 2, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Large Wyvern Gem", "Nourishing Extract", "Paolumu Cortex", "Paolumu Fellwing",
            "Paolumu Shard", "Paolumu Thickfur", "Wyvern Gem"]
      }
   },
   "Pink Rathian": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Pink Rathian Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Pink Rathian Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.2},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.15},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Pink Rathian Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Pink Rathian Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.09},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Pink Rathian Carapace", "itemCount": 1, "probability": 0.72},
               {"material": "Pink Rathian Scale+", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03}],
            "back": [
               {"material": "Pink Rathian Carapace", "itemCount": 1, "probability": 0.69},
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.3},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.65},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.65},
               {"material": "Pink Rathian Scale+", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.07},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.21},
               {"material": "Pink Rathian Carapace", "itemCount": 2, "probability": 0.18},
               {"material": "Pink Rathian Scale+", "itemCount": 2, "probability": 0.16},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.14},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.07}],
            "Gold": [
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.21},
               {"material": "Pink Rathian Carapace", "itemCount": 2, "probability": 0.17},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.14},
               {"material": "Pink Rathian Scale+", "itemCount": 2, "probability": 0.14},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Rathian Webbing", "itemCount": 3, "probability": 0.12},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Pink Rathian Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Pink Rathian Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.09},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Glowing Feystone", "Inferno Sac", "Monster Hardbone", "Pink Rathian Carapace", "Pink Rathian Scale+", "Rath Wingtalon",
            "Rathian Plate", "Rathian Ruby", "Rathian Spike+", "Rathian Webbing", "Shining Streamstone", "Sullied Streamstone",
            "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Pink Rathian Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Pink Rathian Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.2},
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.15},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Pink Rathian Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Pink Rathian Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.12},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [
               {"material": "Pink Rathian Cortex", "itemCount": 1, "probability": 0.67},
               {"material": "Pink Rathian Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.03}],
            "back": [
               {"material": "Pink Rathian Cortex", "itemCount": 1, "probability": 0.69},
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.3},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.65},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.65},
               {"material": "Pink Rathian Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.07},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Pink Rathian Cortex", "itemCount": 2, "probability": 0.22},
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.21},
               {"material": "Pink Rathian Shard", "itemCount": 2, "probability": 0.2},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.17},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.24},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.19},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Pink Rathian Cortex", "itemCount": 3, "probability": 0.16},
               {"material": "Pink Rathian Shard", "itemCount": 3, "probability": 0.13},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Pink Rathian Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Pink Rathian Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.12},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Conflagrant Sac", "Pink Rathian Cortex", "Pink Rathian Shard", "Rath Wingtalon+",
            "Rathian Mantle", "Rathian Ruby", "Rathian Surspike", "Rathian Weave", "Sealed Feystone"]
      }
   },
   "Pukei-Pukei": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Pukei-Pukei Scale", "itemCount": 1, "probability": 0.31},
               {"material": "Pukei-Pukei Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Pukei-Pukei Quill", "itemCount": 1, "probability": 0.18},
               {"material": "Pukei-Pukei Sac", "itemCount": 1, "probability": 0.15},
               {"material": "Pukei-Pukei Tail", "itemCount": 1, "probability": 0.12}],
            "Hunt": [
               {"material": "Pukei-Pukei Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Pukei-Pukei Scale", "itemCount": 1, "probability": 0.22},
               {"material": "Poison Sac", "itemCount": 1, "probability": 0.19},
               {"material": "Pukei-Pukei Quill", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone M", "itemCount": 2, "probability": 0.1},
               {"material": "Pukei-Pukei Sac", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Pukei-Pukei Sac", "itemCount": 1, "probability": 0.75},
               {"material": "Pukei-Pukei Scale", "itemCount": 2, "probability": 0.25}],
            "back": [
               {"material": "Pukei-Pukei Shell", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Scale", "itemCount": 1, "probability": 0.2}],
            "wings": [
               {"material": "Pukei-Pukei Quill", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Scale", "itemCount": 1, "probability": 0.2}]
         },
         "Sever": {
            "tail": [
               {"material": "Pukei-Pukei Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Shell", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Pukei-Pukei Quill", "itemCount": 1, "probability": 0.3},
               {"material": "Pukei-Pukei Sac", "itemCount": 1, "probability": 0.25},
               {"material": "Poison Sac", "itemCount": 2, "probability": 0.16},
               {"material": "Pukei-Pukei Scale", "itemCount": 2, "probability": 0.15},
               {"material": "Pukei-Pukei Shell", "itemCount": 2, "probability": 0.14}],
            "Gold": [
               {"material": "Pukei-Pukei Quill", "itemCount": 1, "probability": 0.38},
               {"material": "Pukei-Pukei Sac", "itemCount": 1, "probability": 0.3},
               {"material": "Poison Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Pukei-Pukei Scale", "itemCount": 3, "probability": 0.1},
               {"material": "Pukei-Pukei Shell", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Pukei-Pukei Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Pukei-Pukei Scale", "itemCount": 1, "probability": 0.22},
               {"material": "Poison Sac", "itemCount": 1, "probability": 0.19},
               {"material": "Pukei-Pukei Quill", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone M", "itemCount": 2, "probability": 0.1},
               {"material": "Pukei-Pukei Sac", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Monster Bone M", "Poison Sac", "Pukei-Pukei Quill", "Pukei-Pukei Sac", "Pukei-Pukei Scale", "Pukei-Pukei Shell",
            "Pukei-Pukei Tail"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Pukei-Pukei Scale+", "itemCount": 1, "probability": 0.29},
               {"material": "Pukei-Pukei Carapace", "itemCount": 1, "probability": 0.22},
               {"material": "Pukei-Pukei Wing", "itemCount": 1, "probability": 0.18},
               {"material": "Pukei-Pukei Sac+", "itemCount": 1, "probability": 0.14},
               {"material": "Pukei-Pukei Tail", "itemCount": 1, "probability": 0.12},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Pukei-Pukei Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Toxin Sac", "itemCount": 1, "probability": 0.19},
               {"material": "Pukei-Pukei Scale+", "itemCount": 1, "probability": 0.19},
               {"material": "Pukei-Pukei Wing", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Pukei-Pukei Sac+", "itemCount": 1, "probability": 0.09},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Pukei-Pukei Sac+", "itemCount": 1, "probability": 0.75},
               {"material": "Pukei-Pukei Scale+", "itemCount": 2, "probability": 0.25}],
            "back": [
               {"material": "Pukei-Pukei Carapace", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Scale+", "itemCount": 1, "probability": 0.2}],
            "wings": [
               {"material": "Pukei-Pukei Wing", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Scale+", "itemCount": 1, "probability": 0.2}]
         },
         "Sever": {
            "tail": [
               {"material": "Pukei-Pukei Tail", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Scale+", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Pukei-Pukei Sac+", "itemCount": 1, "probability": 0.25},
               {"material": "Pukei-Pukei Wing", "itemCount": 1, "probability": 0.22},
               {"material": "Toxin Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Pukei-Pukei Scale+", "itemCount": 2, "probability": 0.14},
               {"material": "Pukei-Pukei Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.11}],
            "Gold": [
               {"material": "Pukei-Pukei Sac+", "itemCount": 1, "probability": 0.25},
               {"material": "Pukei-Pukei Wing", "itemCount": 1, "probability": 0.22},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.17},
               {"material": "Pukei-Pukei Carapace", "itemCount": 3, "probability": 0.14},
               {"material": "Toxin Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Pukei-Pukei Scale+", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Pukei-Pukei Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Toxin Sac", "itemCount": 1, "probability": 0.19},
               {"material": "Pukei-Pukei Scale+", "itemCount": 1, "probability": 0.19},
               {"material": "Pukei-Pukei Wing", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Pukei-Pukei Sac+", "itemCount": 1, "probability": 0.09},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Bird Wyvern Gem", "Glowing Feystone", "Monster Keenbone", "Mysterious Feystone", "Pukei-Pukei Carapace",
            "Pukei-Pukei Sac+", "Pukei-Pukei Scale+", "Pukei-Pukei Tail", "Pukei-Pukei Wing", "Toxin Sac", "Warped Feystone",
            "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Pukei-Pukei Shard", "itemCount": 1, "probability": 0.29},
               {"material": "Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Large Pukei-Pukei Sac", "itemCount": 1, "probability": 0.14},
               {"material": "Pukei-Pukei Lash", "itemCount": 1, "probability": 0.12},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Deadly Poison Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Pukei-Pukei Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Large Pukei-Pukei Sac", "itemCount": 1, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Large Pukei-Pukei Sac", "itemCount": 1, "probability": 0.75},
               {"material": "Pukei-Pukei Shard", "itemCount": 2, "probability": 0.25}],
            "back": [
               {"material": "Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Shard", "itemCount": 1, "probability": 0.2}],
            "wings": [
               {"material": "Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Shard", "itemCount": 1, "probability": 0.2}]
         },
         "Sever": {
            "tail": [
               {"material": "Pukei-Pukei Lash", "itemCount": 1, "probability": 0.8},
               {"material": "Pukei-Pukei Shard", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Large Pukei-Pukei Sac", "itemCount": 1, "probability": 0.25},
               {"material": "Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.22},
               {"material": "Deadly Poison Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Pukei-Pukei Shard", "itemCount": 2, "probability": 0.14},
               {"material": "Pukei-Pukei Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.11}],
            "Gold": [
               {"material": "Large Pukei-Pukei Sac", "itemCount": 1, "probability": 0.25},
               {"material": "Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.22},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.17},
               {"material": "Pukei-Pukei Cortex", "itemCount": 3, "probability": 0.14},
               {"material": "Deadly Poison Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Pukei-Pukei Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Pukei-Pukei Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Deadly Poison Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Pukei-Pukei Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Pukei-Pukei Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Large Pukei-Pukei Sac", "itemCount": 1, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Deadly Poison Sac", "Fey Wyvern Gem", "Large Pukei-Pukei Sac",
            "Pukei-Pukei Cortex", "Pukei-Pukei Fellwing", "Pukei-Pukei Lash", "Pukei-Pukei Shard"]
      }
   },
   "Radobaan": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Radobaan Scale+", "itemCount": 1, "probability": 0.36},
               {"material": "Radobaan Carapace", "itemCount": 1, "probability": 0.28},
               {"material": "Radobaan Oilshell", "itemCount": 1, "probability": 0.2},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Radobaan Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Radobaan Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Coma Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Radobaan Oilshell", "itemCount": 2, "probability": 0.12},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "head": [
               {"material": "Radobaan Oilshell", "itemCount": 1, "probability": 0.68},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.3},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "back": [
               {"material": "Wyvern Bonemass", "itemCount": 3, "probability": 0.5},
               {"material": "Radobaan Oilshell", "itemCount": 1, "probability": 0.35},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.15}],
            "hindleg": [
               {"material": "Wyvern Bonemass", "itemCount": 2, "probability": 0.64},
               {"material": "Radobaan Scale+", "itemCount": 1, "probability": 0.36}]
         },
         "Sever": {
            "tail": [
               {"material": "Radobaan Oilshell", "itemCount": 1, "probability": 0.72},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.25},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.26},
               {"material": "Radobaan Carapace", "itemCount": 2, "probability": 0.16},
               {"material": "Coma Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Radobaan Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Radobaan Oilshell", "itemCount": 2, "probability": 0.12},
               {"material": "Wyvern Bonemass", "itemCount": 2, "probability": 0.12},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.26},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Radobaan Carapace", "itemCount": 3, "probability": 0.13},
               {"material": "Coma Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Wyvern Bonemass", "itemCount": 2, "probability": 0.12},
               {"material": "Radobaan Oilshell", "itemCount": 3, "probability": 0.11},
               {"material": "Radobaan Scale+", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Radobaan Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Radobaan Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Coma Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Radobaan Oilshell", "itemCount": 2, "probability": 0.12},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Coma Sac", "Glowing Feystone", "Monster Keenbone", "Mysterious Feystone", "Radobaan Carapace", "Radobaan Medulla",
            "Radobaan Oilshell", "Radobaan Scale+", "Warped Feystone", "Worn Feystone", "Wyvern Bonemass", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Radobaan Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Radobaan Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.19},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Radobaan Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Radobaan Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Torpor Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.15},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.12},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "head": [
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.68},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.3},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "back": [
               {"material": "Large Wyvern Bonemass", "itemCount": 2, "probability": 0.5},
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.35},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.15}],
            "hindleg": [
               {"material": "Large Wyvern Bonemass", "itemCount": 1, "probability": 0.7},
               {"material": "Radobaan Shard", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.72},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.25},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.26},
               {"material": "Radobaan Cortex", "itemCount": 2, "probability": 0.16},
               {"material": "Torpor Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Radobaan Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.12},
               {"material": "Large Wyvern Bonemass", "itemCount": 1, "probability": 0.12},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.26},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Radobaan Cortex", "itemCount": 3, "probability": 0.13},
               {"material": "Torpor Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Large Wyvern Bonemass", "itemCount": 2, "probability": 0.12},
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.11},
               {"material": "Radobaan Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Radobaan Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Radobaan Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Torpor Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Radobaan Oilshell+", "itemCount": 1, "probability": 0.15},
               {"material": "Radobaan Medulla", "itemCount": 1, "probability": 0.12},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Large Wyvern Bonemass", "Large Wyvern Gem", "Radobaan Cortex", "Radobaan Medulla",
            "Radobaan Oilshell+", "Radobaan Shard", "Torpor Sac", "Wyvern Gem"]
      }
   },
   "Raging Brachydios": {
      "Master Rank": {
         "General": {
            "Kill": [
               {
                  "material": "Indestructible Ebonshell",
                  "itemCount": 1,
                  "probability": 0.36
               }, {"material": "Flashpoint Slime", "itemCount": 1, "probability": 0.24},
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.21},
               {"material": "Brach Warhead", "itemCount": 1, "probability": 0.14},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Indestructible Ebonshell", "itemCount": 1, "probability": 0.36},
               {"material": "Flashpoint Slime", "itemCount": 1, "probability": 0.25},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.09},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.08},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Brach Warhead", "itemCount": 1, "probability": 0.92},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.08}],
            "left foreleg": [
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.73},
               {"material": "Flashpoint Slime", "itemCount": 2, "probability": 0.27}],
            "right foreleg": [
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.73},
               {"material": "Flashpoint Slime", "itemCount": 2, "probability": 0.27}]
         },
         "Sever": {
            "tail": [
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.53},
               {"material": "Indestructible Ebonshell", "itemCount": 1, "probability": 0.38},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.09}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.24},
               {"material": "Brach Warhead", "itemCount": 1, "probability": 0.22},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.16},
               {"material": "Indestructible Ebonshell", "itemCount": 2, "probability": 0.14},
               {"material": "Flashpoint Slime", "itemCount": 2, "probability": 0.12},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.12}],
            "Gold": [
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.24},
               {"material": "Brach Warhead", "itemCount": 1, "probability": 0.22},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.16},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.16},
               {"material": "Indestructible Ebonshell", "itemCount": 3, "probability": 0.12},
               {"material": "Flashpoint Slime", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Indestructible Ebonshell", "itemCount": 1, "probability": 0.36},
               {"material": "Flashpoint Slime", "itemCount": 1, "probability": 0.25},
               {"material": "Brachydios Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Brach Obliterator", "itemCount": 1, "probability": 0.09},
               {"material": "Brachydios Pallium", "itemCount": 1, "probability": 0.08},
               {"material": "Immortal Reactor", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Brach Obliterator", "Brach Warhead", "Brachydios Lash", "Brachydios Pallium", "Flashpoint Slime", "Immortal Reactor",
            "Indestructible Ebonshell"]
      }
   },
   "Rajang": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Rajang Hardfang", "itemCount": 1, "probability": 0.36},
               {"material": "Rajang Wildpelt", "itemCount": 1, "probability": 0.28},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Rajang Wildpelt", "itemCount": 1, "probability": 0.32},
               {"material": "Rajang Hardfang", "itemCount": 1, "probability": 0.23},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Rajang Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "horn": [
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.7},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.3}],
            "horns": [{"material": "Rajang Hardhorn", "itemCount": 1, "probability": 1}],
            "left foreleg": [
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Rajang Wildpelt", "itemCount": 1, "probability": 0.3}],
            "right foreleg": [
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Rajang Wildpelt", "itemCount": 1, "probability": 0.3}],
            "tail": [
               {"material": "Rajang Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.3}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.24},
               {"material": "Rajang Tail", "itemCount": 1, "probability": 0.18},
               {"material": "Rajang Wildpelt", "itemCount": 2, "probability": 0.16},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.15},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.15},
               {"material": "Rajang Hardfang", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Rajang Tail", "itemCount": 1, "probability": 0.24},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.18},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Gold Rajang Pelt+", "itemCount": 1, "probability": 0.18},
               {"material": "Rajang Wildpelt", "itemCount": 3, "probability": 0.12},
               {"material": "Rajang Hardfang", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Rajang Hardfang", "itemCount": 1, "probability": 0.32},
               {"material": "Rajang Wildpelt", "itemCount": 1, "probability": 0.23},
               {"material": "Rajang Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Rajang Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Rajang Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Carved Feystone", "Gold Rajang Pelt+", "Rajang Hardclaw", "Rajang Hardfang", "Rajang Hardhorn", "Rajang Tail",
            "Rajang Wildpelt", "Sealed Feystone"]
      }
   },
   "Rathalos": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Rathalos Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Rathalos Shell", "itemCount": 1, "probability": 0.26},
               {"material": "Rathalos Webbing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Marrow", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Rathalos Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Rathalos Scale", "itemCount": 1, "probability": 0.19},
               {"material": "Flame Sac", "itemCount": 1, "probability": 0.17},
               {"material": "Monster Bone+", "itemCount": 2, "probability": 0.1},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Webbing", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Rathalos Scale", "itemCount": 1, "probability": 0.66},
               {"material": "Rathalos Shell", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.04}],
            "back": [
               {"material": "Rathalos Shell", "itemCount": 1, "probability": 0.69},
               {"material": "Rathalos Marrow", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rathalos Webbing", "itemCount": 1, "probability": 0.65},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.7},
               {"material": "Rathalos Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Marrow", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Rathalos Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.15},
               {"material": "Rathalos Marrow", "itemCount": 1, "probability": 0.13},
               {"material": "Rathalos Shell", "itemCount": 2, "probability": 0.12},
               {"material": "Flame Sac", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Scale", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Rathalos Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.16},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.13},
               {"material": "Rathalos Marrow", "itemCount": 1, "probability": 0.13},
               {"material": "Rathalos Shell", "itemCount": 3, "probability": 0.1},
               {"material": "Flame Sac", "itemCount": 3, "probability": 0.08},
               {"material": "Rathalos Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Rathalos Shell", "itemCount": 1, "probability": 0.24},
               {"material": "Rathalos Scale", "itemCount": 1, "probability": 0.19},
               {"material": "Flame Sac", "itemCount": 1, "probability": 0.17},
               {"material": "Monster Bone+", "itemCount": 2, "probability": 0.1},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Webbing", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Flame Sac", "Monster Bone+", "Rath Wingtalon", "Rathalos Marrow", "Rathalos Plate", "Rathalos Scale", "Rathalos Shell",
            "Rathalos Tail", "Rathalos Webbing"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Rathalos Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Rathalos Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Rathalos Wing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.01}],
            "Hunt": [
               {"material": "Rathalos Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Rathalos Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rathalos Wing", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Rathalos Scale+", "itemCount": 1, "probability": 0.65},
               {"material": "Rathalos Carapace", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.04},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Rathalos Carapace", "itemCount": 1, "probability": 0.69},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rathalos Wing", "itemCount": 1, "probability": 0.65},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.66},
               {"material": "Rathalos Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.02}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Rathalos Wing", "itemCount": 1, "probability": 0.24},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.2},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Rathalos Carapace", "itemCount": 2, "probability": 0.14},
               {"material": "Rathalos Scale+", "itemCount": 2, "probability": 0.12},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.1},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Rathalos Wing", "itemCount": 1, "probability": 0.23},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.13},
               {"material": "Inferno Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Rathalos Carapace", "itemCount": 3, "probability": 0.12},
               {"material": "Rathalos Scale+", "itemCount": 3, "probability": 0.1},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Rathalos Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Rathalos Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rathalos Wing", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Tail", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Glowing Feystone", "Inferno Sac", "Monster Hardbone", "Rath Wingtalon", "Rathalos Carapace", "Rathalos Medulla",
            "Rathalos Plate", "Rathalos Ruby", "Rathalos Scale+", "Rathalos Tail", "Rathalos Wing", "Shining Streamstone",
            "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Rathalos Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Rathalos Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Rathalos Fellwing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.01}],
            "Hunt": [
               {"material": "Rathalos Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Rathalos Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rathalos Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Rathalos Cortex", "itemCount": 1, "probability": 0.67},
               {"material": "Rathalos Shard", "itemCount": 1, "probability": 0.27},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Rathalos Cortex", "itemCount": 1, "probability": 0.69},
               {"material": "Rathalos Medulla", "itemCount": 2, "probability": 0.3},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rathalos Fellwing", "itemCount": 1, "probability": 0.65},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathalos Lash", "itemCount": 1, "probability": 0.66},
               {"material": "Rathalos Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Rathalos Medulla", "itemCount": 1, "probability": 0.07},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Rathalos Cortex", "itemCount": 2, "probability": 0.17},
               {"material": "Rathalos Shard", "itemCount": 2, "probability": 0.15},
               {"material": "Rathalos Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Rathalos Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.1},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Rathalos Fellwing", "itemCount": 1, "probability": 0.17},
               {"material": "Rathalos Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.13},
               {"material": "Conflagrant Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Rathalos Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Rathalos Shard", "itemCount": 3, "probability": 0.1},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Rathalos Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Rathalos Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rathalos Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.1},
               {"material": "Rathalos Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Conflagrant Sac", "Rath Wingtalon+", "Rathalos Cortex", "Rathalos Fellwing",
            "Rathalos Lash", "Rathalos Mantle", "Rathalos Medulla", "Rathalos Ruby", "Rathalos Shard", "Sealed Feystone"]
      }
   },
   "Rathian": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Rathian Scale", "itemCount": 1, "probability": 0.35},
               {"material": "Rathian Shell", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.15},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.12},
               {"material": "Rathian Spike", "itemCount": 1, "probability": 0.08},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Rathian Shell", "itemCount": 1, "probability": 0.27},
               {"material": "Rathian Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Flame Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Bone L", "itemCount": 2, "probability": 0.1},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.09},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Rathian Shell", "itemCount": 1, "probability": 0.71},
               {"material": "Rathian Scale", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.04}],
            "back": [
               {"material": "Rathian Shell", "itemCount": 1, "probability": 0.69},
               {"material": "Rathian Spike", "itemCount": 1, "probability": 0.3},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.65},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathian Spike", "itemCount": 1, "probability": 0.7},
               {"material": "Rathian Scale", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Rathian Spike", "itemCount": 1, "probability": 0.22},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.17},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Rathian Shell", "itemCount": 2, "probability": 0.14},
               {"material": "Flame Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Rathian Scale", "itemCount": 2, "probability": 0.11},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Rathian Spike", "itemCount": 1, "probability": 0.2},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.16},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.16},
               {"material": "Rathian Shell", "itemCount": 3, "probability": 0.12},
               {"material": "Flame Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Rathian Scale", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Rathian Shell", "itemCount": 1, "probability": 0.27},
               {"material": "Rathian Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Flame Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Wingtalon", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Bone L", "itemCount": 2, "probability": 0.1},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.09},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Flame Sac", "Monster Bone L", "Rath Wingtalon", "Rathian Plate", "Rathian Scale", "Rathian Shell", "Rathian Spike",
            "Rathian Webbing"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Rathian Scale+", "itemCount": 1, "probability": 0.34},
               {"material": "Rathian Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Rathian Webbing", "itemCount": 1, "probability": 0.2},
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.16},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.05},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.01}],
            "Hunt": [
               {"material": "Rathian Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Rathian Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.12},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.09},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Rathian Carapace", "itemCount": 1, "probability": 0.72},
               {"material": "Rathian Scale+", "itemCount": 1, "probability": 0.25},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03}],
            "back": [
               {"material": "Rathian Carapace", "itemCount": 1, "probability": 0.69},
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.3},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.65},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.7},
               {"material": "Rathian Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.07},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.02}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.22},
               {"material": "Rathian Carapace", "itemCount": 2, "probability": 0.18},
               {"material": "Rathian Scale+", "itemCount": 2, "probability": 0.16},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.14},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Rathian Spike+", "itemCount": 1, "probability": 0.22},
               {"material": "Rathian Carapace", "itemCount": 2, "probability": 0.17},
               {"material": "Rathian Scale+", "itemCount": 2, "probability": 0.14},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.13},
               {"material": "Inferno Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Rathian Webbing", "itemCount": 3, "probability": 0.12},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Rathian Carapace", "itemCount": 1, "probability": 0.27},
               {"material": "Rathian Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Wingtalon", "itemCount": 2, "probability": 0.12},
               {"material": "Monster Keenbone", "itemCount": 2, "probability": 0.1},
               {"material": "Rathian Webbing", "itemCount": 2, "probability": 0.09},
               {"material": "Rathian Plate", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Glowing Feystone", "Inferno Sac", "Monster Keenbone", "Mysterious Feystone", "Rath Wingtalon", "Rathian Carapace",
            "Rathian Plate", "Rathian Ruby", "Rathian Scale+", "Rathian Spike+", "Rathian Webbing", "Warped Feystone",
            "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Rathian Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Rathian Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.2},
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.16},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.01}],
            "Hunt": [
               {"material": "Rathian Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Rathian Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.14},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Rathian Cortex", "itemCount": 1, "probability": 0.67},
               {"material": "Rathian Shard", "itemCount": 1, "probability": 0.27},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Rathian Cortex", "itemCount": 1, "probability": 0.69},
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.3},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.65},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.7},
               {"material": "Rathian Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.07},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.22},
               {"material": "Rathian Cortex", "itemCount": 2, "probability": 0.18},
               {"material": "Rathian Shard", "itemCount": 2, "probability": 0.16},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.14},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Rathian Surspike", "itemCount": 1, "probability": 0.22},
               {"material": "Rathian Cortex", "itemCount": 3, "probability": 0.17},
               {"material": "Rathian Shard", "itemCount": 3, "probability": 0.14},
               {"material": "Rathian Mantle", "itemCount": 1, "probability": 0.13},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Rathian Weave", "itemCount": 2, "probability": 0.12},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Rathian Cortex", "itemCount": 1, "probability": 0.29},
               {"material": "Rathian Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Rath Wingtalon+", "itemCount": 1, "probability": 0.14},
               {"material": "Rathian Weave", "itemCount": 1, "probability": 0.1},
               {"material": "Rathian Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Conflagrant Sac", "Rath Wingtalon+", "Rathian Cortex", "Rathian Mantle",
            "Rathian Ruby", "Rathian Shard", "Rathian Surspike", "Rathian Weave"]
      }
   },
   "Ruiner Nergigante": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Immortal Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Nergigante Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Nergigante Hardclaw", "itemCount": 1, "probability": 0.19},
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.14},
               {"material": "Annihilating Greathorn", "itemCount": 1, "probability": 0.08},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Nergigante Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Immortal Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.17},
               {"material": "Nergigante Flail", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.12},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.08},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "horn": [
               {"material": "Annihilating Greathorn", "itemCount": 1, "probability": 0.66},
               {"material": "Eternal Regrowth Plate", "itemCount": 2, "probability": 0.34}],
            "horns": [
               {"material": "Annihilating Greathorn", "itemCount": 1, "probability": 0.97},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}],
            "head ironspikes": [
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.7},
               {"material": "Immortal Shard", "itemCount": 2, "probability": 0.3}],
            "left foreleg ironspikes": [
               {"material": "Nergigante Hardclaw", "itemCount": 1, "probability": 0.65},
               {"material": "Eternal Regrowth Plate", "itemCount": 2, "probability": 0.35}],
            "right foreleg ironspikes": [
               {"material": "Nergigante Cortex", "itemCount": 1, "probability": 0.65},
               {"material": "Nergigante Hardclaw", "itemCount": 1, "probability": 0.35}],
            "left wing ironspikes": [
               {"material": "Nergigante Cortex", "itemCount": 1, "probability": 0.62},
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.38}],
            "right wing ironspikes": [
               {"material": "Nergigante Cortex", "itemCount": 1, "probability": 0.62},
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.38}]
         },
         "Sever": {
            "tail": [
               {"material": "Nergigante Flail", "itemCount": 1, "probability": 0.7},
               {"material": "Immortal Shard", "itemCount": 1, "probability": 0.27},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Nergigante Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Nergigante Flail", "itemCount": 1, "probability": 0.18},
               {"material": "Annihilating Greathorn", "itemCount": 1, "probability": 0.16},
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.16},
               {"material": "Nergigante Cortex", "itemCount": 2, "probability": 0.12},
               {"material": "Immortal Shard", "itemCount": 2, "probability": 0.1},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Annihilating Greathorn", "itemCount": 1, "probability": 0.2},
               {"material": "Nergigante Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Nergigante Flail", "itemCount": 1, "probability": 0.16},
               {"material": "Eternal Regrowth Plate", "itemCount": 2, "probability": 0.12},
               {"material": "Nergigante Cortex", "itemCount": 3, "probability": 0.1},
               {"material": "Immortal Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Nergigante Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Immortal Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Eternal Regrowth Plate", "itemCount": 1, "probability": 0.17},
               {"material": "Nergigante Flail", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.12},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.08},
               {"material": "Nergigante Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Annihilating Greathorn", "Carved Feystone", "Eternal Regrowth Plate", "Immortal Shard", "Large Elder Dragon Bone",
            "Large Elder Dragon Gem", "Nergigante Cortex", "Nergigante Flail", "Nergigante Gem", "Nergigante Hardclaw",
            "Pure Dragon Blood", "Sealed Feystone"]
      }
   },
   "Safi'jiiva": {
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.16},
               {"material": "Safi'jiiva Lash", "itemCount": 1, "probability": 0.11},
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.08},
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.08},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.13},
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.1},
               {"material": "Safi'jiiva Hardhorn", "itemCount": 1, "probability": 0.09},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "horn": [
               {"material": "Safi'jiiva Hardhorn", "itemCount": 1, "probability": 0.68},
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.32}],
            "horns": [
               {"material": "Safi'jiiva Hardhorn", "itemCount": 1, "probability": 0.93},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.07}],
            "left foreleg": [
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.32}],
            "right foreleg": [
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.32}],
            "left hindleg": [
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.32}],
            "right hindleg": [
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.32}],
            "left wing": [
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.32}],
            "right wing": [
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.32}],
            "back": [
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Cortex", "itemCount": 2, "probability": 0.32}],
            "chest": [
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.68},
               {"material": "Safi'jiiva Shard", "itemCount": 2, "probability": 0.32}]
         },
         "Sever": {
            "tail": [
               {"material": "Safi'jiiva Lash", "itemCount": 1, "probability": 0.73},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.13},
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.1},
               {"material": "Safi'jiiva Hardhorn", "itemCount": 1, "probability": 0.09},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.03}],
            "Gold": [
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.13},
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.1},
               {"material": "Safi'jiiva Hardhorn", "itemCount": 1, "probability": 0.09},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.03}],
            "Bronze": [
               {"material": "Safi'jiiva Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Safi'jiiva Shard", "itemCount": 1, "probability": 0.18},
               {"material": "Pulsing Dragonshell", "itemCount": 1, "probability": 0.14},
               {"material": "Safi'jiiva Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 2, "probability": 0.1},
               {"material": "Pure Dragon Blood", "itemCount": 2, "probability": 0.1},
               {"material": "Safi'jiiva Fellwing", "itemCount": 1, "probability": 0.1},
               {"material": "Zionium Crystal", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Large Elder Dragon Bone", "Pulsing Dragonshell", "Pure Dragon Blood", "Safi'jiiva Cortex", "Safi'jiiva Fellwing",
            "Safi'jiiva Hardclaw", "Safi'jiiva Hardhorn", "Safi'jiiva Lash", "Safi'jiiva Shard", "Zionium Crystal"]
      }
   },
   "Savage Deviljho": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Deviljho Blackpiel", "itemCount": 1, "probability": 0.3},
               {"material": "Deviljho Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Deviljho Ripper", "itemCount": 1, "probability": 0.17},
               {"material": "Vile Fang", "itemCount": 1, "probability": 0.13},
               {"material": "Black Blood", "itemCount": 1, "probability": 0.11},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Deviljho Crook", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Deviljho Blackpiel", "itemCount": 1, "probability": 0.27},
               {"material": "Deviljho Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Deviljho Ripper", "itemCount": 1, "probability": 0.16},
               {"material": "Black Blood", "itemCount": 1, "probability": 0.14},
               {"material": "Deviljho Flail", "itemCount": 1, "probability": 0.11},
               {"material": "Vile Fang", "itemCount": 1, "probability": 0.09},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Vile Fang", "itemCount": 1, "probability": 0.61},
               {"material": "Deviljho Blackpiel", "itemCount": 2, "probability": 0.32},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Deviljho Crook", "itemCount": 1, "probability": 0.02}],
            "chest": [
               {"material": "Deviljho Shard", "itemCount": 1, "probability": 0.66},
               {"material": "Deviljho Blackpiel", "itemCount": 1, "probability": 0.32},
               {"material": "Deviljho Crook", "itemCount": 1, "probability": 0.02}]
         },
         "Sever": {
            "tail": [
               {"material": "Deviljho Flail", "itemCount": 1, "probability": 0.75},
               {"material": "Deviljho Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Deviljho Crook", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Deviljho Ripper", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Blackpiel", "itemCount": 2, "probability": 0.15},
               {"material": "Deviljho Flail", "itemCount": 1, "probability": 0.15},
               {"material": "Deviljho Shard", "itemCount": 2, "probability": 0.13},
               {"material": "Vile Fang", "itemCount": 1, "probability": 0.13},
               {"material": "Black Blood", "itemCount": 2, "probability": 0.1},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.1},
               {"material": "Deviljho Crook", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Vile Fang", "itemCount": 1, "probability": 0.23},
               {"material": "Deviljho Flail", "itemCount": 1, "probability": 0.2},
               {"material": "Black Blood", "itemCount": 2, "probability": 0.16},
               {"material": "Deviljho Crook", "itemCount": 1, "probability": 0.16},
               {"material": "Deviljho Ripper", "itemCount": 2, "probability": 0.15},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Deviljho Blackpiel", "itemCount": 1, "probability": 0.27},
               {"material": "Deviljho Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Deviljho Ripper", "itemCount": 1, "probability": 0.16},
               {"material": "Black Blood", "itemCount": 1, "probability": 0.14},
               {"material": "Deviljho Flail", "itemCount": 1, "probability": 0.11},
               {"material": "Vile Fang", "itemCount": 1, "probability": 0.09},
               {"material": "Deviljho Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Black Blood", "Carved Feystone", "Deviljho Blackpiel", "Deviljho Crook", "Deviljho Flail", "Deviljho Gem",
            "Deviljho Ripper", "Deviljho Shard", "Sealed Feystone", "Vile Fang"]
      }
   },
   "Scarred Yian Garuga": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.19},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.11},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.09},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Scratched Shell", "itemCount": 1, "probability": 0.26},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.18},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.14},
               {"material": "Garuga Shard", "itemCount": 2, "probability": 0.13},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.12},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "ears": [
               {"material": "Garuga Auricle", "itemCount": 1, "probability": 0.7},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.3}],
            "beak": [
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.65},
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.35}],
            "back": [
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.7},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.3}],
            "wings": [
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.65},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.24},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.2},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Garuga Auricle", "itemCount": 1, "probability": 0.14},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.24},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Garuga Auricle", "itemCount": 1, "probability": 0.18},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.13},
               {"material": "Garuga Silverpelt", "itemCount": 2, "probability": 0.09}],
            "Bronze": [
               {"material": "Scratched Shell", "itemCount": 1, "probability": 0.26},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.18},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.14},
               {"material": "Garuga Shard", "itemCount": 2, "probability": 0.13},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.12},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Fancy Beak", "Fey Wyvern Gem", "Garuga Auricle", "Garuga Cortex",
            "Garuga Fellwing", "Garuga Lash", "Garuga Shard", "Garuga Silverpelt", "Scratched Shell", "Sealed Feystone"]
      }
   },
   "Seething Bazelgeuse": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Bazelgeuse Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Flickering Silvershell", "itemCount": 1, "probability": 0.22},
               {"material": "Bazelgeuse Hardclaw", "itemCount": 1, "probability": 0.17},
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.13},
               {"material": "Scorching Silverwing", "itemCount": 1, "probability": 0.11},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Bazelgeuse Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Flickering Silvershell", "itemCount": 1, "probability": 0.25},
               {"material": "Bazelgeuse Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Bazelgeuse Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.14},
               {"material": "Scorching Silverwing", "itemCount": 1, "probability": 0.11},
               {"material": "Bazelgeuse Flail", "itemCount": 1, "probability": 0.09},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.61},
               {"material": "Bazelgeuse Shard", "itemCount": 2, "probability": 0.32},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Bazelgeuse Mantle", "itemCount": 1, "probability": 0.02}],
            "back": [
               {"material": "Flickering Silvershell", "itemCount": 1, "probability": 0.69},
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.3},
               {"material": "Bazelgeuse Mantle", "itemCount": 1, "probability": 0.01}],
            "wings": [
               {"material": "Scorching Silverwing", "itemCount": 1, "probability": 0.65},
               {"material": "Bazelgeuse Hardclaw", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Bazelgeuse Flail", "itemCount": 1, "probability": 0.7},
               {"material": "Flickering Silvershell", "itemCount": 1, "probability": 0.27},
               {"material": "Bazelgeuse Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Bazelgeuse Hardclaw", "itemCount": 1, "probability": 0.24},
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.18},
               {"material": "Flickering Silvershell", "itemCount": 2, "probability": 0.14},
               {"material": "Scorching Silverwing", "itemCount": 1, "probability": 0.14},
               {"material": "Bazelgeuse Flail", "itemCount": 1, "probability": 0.12},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.1},
               {"material": "Bazelgeuse Mantle", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Bazelgeuse Hardclaw", "itemCount": 1, "probability": 0.22},
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.16},
               {"material": "Bazelgeuse Mantle", "itemCount": 1, "probability": 0.16},
               {"material": "Scorching Silverwing", "itemCount": 1, "probability": 0.13},
               {"material": "Flickering Silvershell", "itemCount": 3, "probability": 0.12},
               {"material": "Bazelgeuse Flail", "itemCount": 1, "probability": 0.11},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.1}],
            "Bronze": [
               {"material": "Flickering Silvershell", "itemCount": 1, "probability": 0.25},
               {"material": "Bazelgeuse Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Bazelgeuse Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Distilled Blast Fluid", "itemCount": 1, "probability": 0.14},
               {"material": "Scorching Silverwing", "itemCount": 1, "probability": 0.11},
               {"material": "Bazelgeuse Flail", "itemCount": 1, "probability": 0.09},
               {"material": "Bazelgeuse Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Bazelgeuse Flail", "Bazelgeuse Gem", "Bazelgeuse Hardclaw", "Bazelgeuse Mantle", "Bazelgeuse Shard", "Carved Feystone",
            "Distilled Blast Fluid", "Flickering Silvershell", "Scorching Silverwing", "Sealed Feystone"]
      }
   },
   "Shara Ishvalda": {
      "Master Rank": {
         "General": {
            "Kill": [
               {
                  "material": "Shara Ishvalda Tenderscale",
                  "itemCount": 1,
                  "probability": 0.33
               }, {"material": "Shara Ishvalda Boulderplate", "itemCount": 1, "probability": 0.27},
               {"material": "Shara Ishvalda Petalstone", "itemCount": 1, "probability": 0.21},
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.15},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.04}],
            "Hunt": [
               {"material": "Shara Ishvalda Boulderplate", "itemCount": 1, "probability": 0.27},
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 1, "probability": 0.22},
               {"material": "Shara Ishvalda Petalstone", "itemCount": 1, "probability": 0.18},
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 2, "probability": 0.09},
               {"material": "Pure Dragon Blood", "itemCount": 2, "probability": 0.09},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 1, "probability": 0.64},
               {"material": "Shara Ishvalda Tenderplate", "itemCount": 1, "probability": 0.33},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.03}],
            "left foreleg": [
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 2, "probability": 0.3}],
            "right foreleg": [
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 2, "probability": 0.3}],
            "left leg mantle": [
               {"material": "Shara Ishvalda Petalstone", "itemCount": 1, "probability": 0.7},
               {"material": "Shara Ishvalda Boulderplate", "itemCount": 1, "probability": 0.3}],
            "right leg mantle": [
               {"material": "Shara Ishvalda Petalstone", "itemCount": 1, "probability": 0.7},
               {"material": "Shara Ishvalda Boulderplate", "itemCount": 1, "probability": 0.3}],
            "left wing mantle": [{"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 1}],
            "right wing mantle": [{"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 1}]
         },
         "Sever": {
            "tail": [
               {"material": "Shara Ishvalda Tenderplate", "itemCount": 1, "probability": 0.95},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Shara Ishvalda Petalstone", "itemCount": 1, "probability": 0.21},
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Shara Ishvalda Boulderplate", "itemCount": 2, "probability": 0.17},
               {"material": "Shara Ishvalda Tenderplate", "itemCount": 1, "probability": 0.16},
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 2, "probability": 0.15},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.24},
               {"material": "Shara Ishvalda Tenderplate", "itemCount": 1, "probability": 0.21},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Shara Ishvalda Petalstone", "itemCount": 2, "probability": 0.14},
               {"material": "Shara Ishvalda Boulderplate", "itemCount": 3, "probability": 0.13},
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 3, "probability": 0.12}],
            "Bronze": [
               {"material": "Shara Ishvalda Boulderplate", "itemCount": 1, "probability": 0.27},
               {"material": "Shara Ishvalda Tenderscale", "itemCount": 1, "probability": 0.22},
               {"material": "Shara Ishvalda Petalstone", "itemCount": 1, "probability": 0.18},
               {"material": "Shara Ishvalda Tenderclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Large Elder Dragon Bone", "itemCount": 2, "probability": 0.09},
               {"material": "Pure Dragon Blood", "itemCount": 2, "probability": 0.09},
               {"material": "Shara Ishvalda Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Large Elder Dragon Bone", "Pure Dragon Blood", "Shara Ishvalda Boulderplate", "Shara Ishvalda Gem",
            "Shara Ishvalda Petalstone", "Shara Ishvalda Tenderclaw", "Shara Ishvalda Tenderplate", "Shara Ishvalda Tenderscale"]
      }
   },
   "Shrieking Legiana": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.26},
               {"material": "Obsidian Icetalon", "itemCount": 1, "probability": 0.21},
               {"material": "Stark Wing", "itemCount": 1, "probability": 0.16},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.27},
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Obsidian Icetalon", "itemCount": 1, "probability": 0.13},
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.11},
               {"material": "Stark Wing", "itemCount": 1, "probability": 0.1}]
         },
         "Break": {
            "head": [
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.6},
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.35},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.05}],
            "back": [
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.98},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Stark Wing", "itemCount": 1, "probability": 0.7},
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.3}],
            "tail": [
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.63},
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.33},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.04}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.19},
               {"material": "Stark Wing", "itemCount": 1, "probability": 0.18},
               {"material": "Obsidian Icetalon", "itemCount": 1, "probability": 0.16},
               {"material": "Rimed Hide", "itemCount": 2, "probability": 0.14},
               {"material": "Cryo Sac", "itemCount": 2, "probability": 0.12},
               {"material": "Legiana Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Legiana Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Obsidian Icetalon", "itemCount": 1, "probability": 0.18},
               {"material": "Stark Wing", "itemCount": 1, "probability": 0.18},
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.14},
               {"material": "Rimed Hide", "itemCount": 3, "probability": 0.12},
               {"material": "Cryo Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Legiana Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Rimed Hide", "itemCount": 1, "probability": 0.27},
               {"material": "Legiana Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Cryo Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Obsidian Icetalon", "itemCount": 1, "probability": 0.13},
               {"material": "Legiana Tail Webbing+", "itemCount": 1, "probability": 0.11},
               {"material": "Stark Wing", "itemCount": 1, "probability": 0.1}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Cryo Sac", "Legiana Mantle", "Legiana Shard", "Legiana Tail Webbing+",
            "Obsidian Icetalon", "Rimed Hide", "Sealed Feystone", "Stark Wing"]
      }
   },
   "Silver Rathalos": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Silver Rathalos Shard", "itemCount": 1, "probability": 0.36},
               {"material": "Silver Rathalos Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Silver Rathalos Fellwing", "itemCount": 1, "probability": 0.19},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Silver Rathalos Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Silver Rathalos Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.18},
               {"material": "Silver Rathalos Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Silver Rathalos Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [
               {"material": "Silver Rathalos Cortex", "itemCount": 1, "probability": 0.62},
               {"material": "Silver Rathalos Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.05}],
            "back": [
               {"material": "Silver Rathalos Cortex", "itemCount": 1, "probability": 0.67},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.3},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.03}],
            "wings": [
               {"material": "Silver Rathalos Fellwing", "itemCount": 1, "probability": 0.65},
               {"material": "Rath Wingtalon+", "itemCount": 2, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Silver Rathalos Lash", "itemCount": 1, "probability": 0.65},
               {"material": "Silver Rathalos Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Silver Rathalos Cortex", "itemCount": 2, "probability": 0.22},
               {"material": "Silver Rathalos Shard", "itemCount": 2, "probability": 0.18},
               {"material": "Silver Rathalos Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Silver Rathalos Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.14},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.22},
               {"material": "Silver Rathalos Fellwing", "itemCount": 1, "probability": 0.19},
               {"material": "Silver Rathalos Lash", "itemCount": 1, "probability": 0.19},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.18},
               {"material": "Silver Rathalos Cortex", "itemCount": 3, "probability": 0.12},
               {"material": "Silver Rathalos Shard", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Silver Rathalos Cortex", "itemCount": 1, "probability": 0.28},
               {"material": "Silver Rathalos Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.18},
               {"material": "Silver Rathalos Fellwing", "itemCount": 1, "probability": 0.12},
               {"material": "Rath Gleam", "itemCount": 1, "probability": 0.1},
               {"material": "Silver Rathalos Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Rathalos Mantle", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Carved Feystone", "Conflagrant Sac", "Rath Gleam", "Rath Wingtalon+", "Rathalos Mantle", "Sealed Feystone",
            "Silver Rathalos Cortex", "Silver Rathalos Fellwing", "Silver Rathalos Lash", "Silver Rathalos Shard"]
      }
   },
   "Stygian Zinogre": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Stygian Zinogre Cortex", "itemCount": 1, "probability": 0.37},
               {"material": "Stygian Zinogre Dragonlocks", "itemCount": 1, "probability": 0.25},
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 1, "probability": 0.15},
               {"material": "Stygian Zinogre Hardclaw", "itemCount": 1, "probability": 0.12},
               {"material": "Stygian Zinogre Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Stygian Zinogre Skymerald", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Stygian Zinogre Dragonlocks", "itemCount": 1, "probability": 0.28},
               {"material": "Stygian Zinogre Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 1, "probability": 0.18},
               {"material": "Stygian Zinogre Hardclaw", "itemCount": 1, "probability": 0.12},
               {"material": "Purecrystal", "itemCount": 1, "probability": 0.11},
               {"material": "Stygian Zinogre Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Stygian Zinogre Hardhorn", "itemCount": 1, "probability": 0.72},
               {"material": "Stygian Zinogre Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Stygian Zinogre Skymerald", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 1, "probability": 0.7},
               {"material": "Stygian Zinogre Dragonlocks", "itemCount": 1, "probability": 0.3}],
            "foreleg": [
               {"material": "Stygian Zinogre Hardclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Stygian Zinogre Lash", "itemCount": 1, "probability": 0.72},
               {"material": "Stygian Zinogre Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Stygian Zinogre Skymerald", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 1, "probability": 0.26},
               {"material": "Stygian Zinogre Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Stygian Zinogre Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Stygian Zinogre Hardhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Dracophage Bug", "itemCount": 2, "probability": 0.14},
               {"material": "Stygian Zinogre Skymerald", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Stygian Zinogre Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Stygian Zinogre Hardhorn", "itemCount": 1, "probability": 0.2},
               {"material": "Stygian Zinogre Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Stygian Zinogre Skymerald", "itemCount": 1, "probability": 0.16},
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 2, "probability": 0.14},
               {"material": "Dracophage Bug", "itemCount": 3, "probability": 0.12}],
            "Bronze": [
               {"material": "Stygian Zinogre Dragonlocks", "itemCount": 1, "probability": 0.28},
               {"material": "Stygian Zinogre Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Stygian Zinogre Dragonhold", "itemCount": 1, "probability": 0.18},
               {"material": "Stygian Zinogre Hardclaw", "itemCount": 1, "probability": 0.12},
               {"material": "Purecrystal", "itemCount": 1, "probability": 0.11},
               {"material": "Stygian Zinogre Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Carved Feystone", "Dracophage Bug", "Purecrystal", "Sealed Feystone", "Stygian Zinogre Cortex",
            "Stygian Zinogre Dragonhold", "Stygian Zinogre Dragonlocks", "Stygian Zinogre Hardclaw", "Stygian Zinogre Hardhorn",
            "Stygian Zinogre Lash", "Stygian Zinogre Skymerald"]
      }
   },
   "Teostra": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Fire Dragon Scale+", "itemCount": 1, "probability": 0.32},
               {"material": "Teostra Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Teostra Claw+", "itemCount": 1, "probability": 0.19},
               {"material": "Teostra Mane", "itemCount": 1, "probability": 0.15},
               {"material": "Teostra Horn+", "itemCount": 1, "probability": 0.08},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Teostra Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Fire Dragon Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Teostra Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Teostra Mane", "itemCount": 1, "probability": 0.14},
               {"material": "Teostra Powder", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.07},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.07}]
         },
         "Break": {
            "head": [
               {"material": "Teostra Horn+", "itemCount": 1, "probability": 0.66},
               {"material": "Teostra Mane", "itemCount": 1, "probability": 0.32},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Teostra Webbing", "itemCount": 1, "probability": 0.7},
               {"material": "Teostra Claw+", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Teostra Tail", "itemCount": 1, "probability": 0.75},
               {"material": "Fire Dragon Scale+", "itemCount": 1, "probability": 0.22},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Teostra Carapace", "itemCount": 2, "probability": 0.12},
               {"material": "Teostra Mane", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Tail", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Horn+", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Claw+", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Webbing", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Powder", "itemCount": 2, "probability": 0.12},
               {"material": "Fire Dragon Scale+", "itemCount": 2, "probability": 0.1},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Teostra Mane", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Tail", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Horn+", "itemCount": 1, "probability": 0.12},
               {"material": "Teostra Claw+", "itemCount": 1, "probability": 0.11},
               {"material": "Teostra Webbing", "itemCount": 1, "probability": 0.11},
               {"material": "Teostra Powder", "itemCount": 2, "probability": 0.11},
               {"material": "Teostra Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Fire Dragon Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Teostra Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Fire Dragon Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Teostra Claw+", "itemCount": 1, "probability": 0.18},
               {"material": "Teostra Mane", "itemCount": 1, "probability": 0.14},
               {"material": "Teostra Powder", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.07},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.07}]
         },
         "material": [
            "Elder Dragon Blood", "Elder Dragon Bone", "Fire Dragon Scale+", "Shining Streamstone", "Sullied Streamstone",
            "Teostra Carapace", "Teostra Claw+", "Teostra Gem", "Teostra Horn+", "Teostra Mane", "Teostra Powder", "Teostra Tail",
            "Teostra Webbing", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Hellfire Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Teostra Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Fire Dragon Hardclaw", "itemCount": 1, "probability": 0.19},
               {"material": "Teostra Mane+", "itemCount": 1, "probability": 0.14},
               {"material": "Teostra Hardhorn", "itemCount": 1, "probability": 0.08},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Teostra Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Hellfire Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Teostra Mane+", "itemCount": 1, "probability": 0.18},
               {"material": "Teostra Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.09},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.09},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Teostra Hardhorn", "itemCount": 1, "probability": 0.66},
               {"material": "Teostra Mane+", "itemCount": 1, "probability": 0.32},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Teostra Fellwing", "itemCount": 1, "probability": 0.7},
               {"material": "Fire Dragon Hardclaw", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Teostra Lash", "itemCount": 1, "probability": 0.75},
               {"material": "Hellfire Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Teostra Mane+", "itemCount": 1, "probability": 0.22},
               {"material": "Fire Dragon Hardclaw", "itemCount": 1, "probability": 0.22},
               {"material": "Teostra Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Teostra Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Teostra Hardhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Teostra Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Teostra Hardhorn", "itemCount": 1, "probability": 0.18},
               {"material": "Teostra Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Large Elder Dragon Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Teostra Mane+", "itemCount": 2, "probability": 0.14},
               {"material": "Fire Dragon Hardclaw", "itemCount": 2, "probability": 0.12}],
            "Bronze": [
               {"material": "Teostra Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Hellfire Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Teostra Mane+", "itemCount": 1, "probability": 0.18},
               {"material": "Teostra Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.09},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.09},
               {"material": "Teostra Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Carved Feystone", "Fire Dragon Hardclaw", "Hellfire Shard", "Large Elder Dragon Bone", "Large Elder Dragon Gem",
            "Pure Dragon Blood", "Sealed Feystone", "Teostra Cortex", "Teostra Fellwing", "Teostra Gem", "Teostra Hardhorn",
            "Teostra Lash", "Teostra Mane+"]
      }
   },
   "Tigrex": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Tigrex Shard", "itemCount": 1, "probability": 0.35},
               {"material": "Tigrex Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Tigrex Hardclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Tigrex Hardfang", "itemCount": 1, "probability": 0.16},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Tigrex Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Tigrex Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Slogbone", "itemCount": 1, "probability": 0.18},
               {"material": "Tigrex Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Tigrex Hardfang", "itemCount": 1, "probability": 0.13},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Tigrex Hardfang", "itemCount": 1, "probability": 0.63},
               {"material": "Tigrex Shard", "itemCount": 1, "probability": 0.34},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.03}],
            "claws": [
               {"material": "Tigrex Hardclaw", "itemCount": 1, "probability": 0.75},
               {"material": "Tigrex Shard", "itemCount": 2, "probability": 0.25}]
         },
         "Sever": {
            "tail": [
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.72},
               {"material": "Tigrex Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Tigrex Hardclaw", "itemCount": 1, "probability": 0.19},
               {"material": "Tigrex Hardfang", "itemCount": 1, "probability": 0.19},
               {"material": "Tigrex Cortex", "itemCount": 2, "probability": 0.18},
               {"material": "Tigrex Shard", "itemCount": 2, "probability": 0.14},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Tigrex Hardclaw", "itemCount": 1, "probability": 0.21},
               {"material": "Tigrex Hardfang", "itemCount": 1, "probability": 0.21},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Tigrex Mantle", "itemCount": 1, "probability": 0.16},
               {"material": "Tigrex Cortex", "itemCount": 3, "probability": 0.13},
               {"material": "Tigrex Shard", "itemCount": 3, "probability": 0.11}],
            "Bronze": [
               {"material": "Tigrex Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Tigrex Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Slogbone", "itemCount": 1, "probability": 0.18},
               {"material": "Tigrex Hardclaw", "itemCount": 1, "probability": 0.13},
               {"material": "Tigrex Hardfang", "itemCount": 1, "probability": 0.13},
               {"material": "Tigrex Lash", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Monster Slogbone", "Sealed Feystone", "Tigrex Cortex", "Tigrex Hardclaw",
            "Tigrex Hardfang", "Tigrex Lash", "Tigrex Mantle", "Tigrex Shard"]
      }
   },
   "Tobi-Kadachi": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Tobi-Kadachi Scale", "itemCount": 1, "probability": 0.31},
               {"material": "Tobi-Kadachi Pelt", "itemCount": 1, "probability": 0.24},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 1, "probability": 0.23},
               {"material": "Tobi-Kadachi Electrode", "itemCount": 1, "probability": 0.12},
               {"material": "Tobi-Kadachi Claw", "itemCount": 1, "probability": 0.1}],
            "Hunt": [
               {"material": "Tobi-Kadachi Pelt", "itemCount": 1, "probability": 0.26},
               {"material": "Tobi-Kadachi Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Electro Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone M", "itemCount": 1, "probability": 0.11},
               {"material": "Tobi-Kadachi Claw", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [{"material": "Tobi-Kadachi Electrode", "itemCount": 1, "probability": 1}],
            "back": [
               {"material": "Tobi-Kadachi Pelt", "itemCount": 1, "probability": 0.8},
               {"material": "Tobi-Kadachi Scale", "itemCount": 1, "probability": 0.2}],
            "forelimbs": [{"material": "Tobi-Kadachi Claw", "itemCount": 1, "probability": 1}],
            "tail": [
               {"material": "Tobi-Kadachi Electrode", "itemCount": 1, "probability": 0.8},
               {"material": "Tobi-Kadachi Pelt", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Tobi-Kadachi Membrane", "itemCount": 1, "probability": 0.22},
               {"material": "Tobi-Kadachi Pelt", "itemCount": 2, "probability": 0.18},
               {"material": "Tobi-Kadachi Claw", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Electrode", "itemCount": 1, "probability": 0.16},
               {"material": "Tobi-Kadachi Scale", "itemCount": 2, "probability": 0.14},
               {"material": "Electro Sac", "itemCount": 2, "probability": 0.12}],
            "Gold": [
               {"material": "Tobi-Kadachi Membrane", "itemCount": 1, "probability": 0.24},
               {"material": "Tobi-Kadachi Claw", "itemCount": 1, "probability": 0.22},
               {"material": "Tobi-Kadachi Electrode", "itemCount": 1, "probability": 0.2},
               {"material": "Tobi-Kadachi Pelt", "itemCount": 3, "probability": 0.14},
               {"material": "Electro Sac", "itemCount": 3, "probability": 0.1},
               {"material": "Tobi-Kadachi Scale", "itemCount": 3, "probability": 0.1}],
            "Bronze": [
               {"material": "Tobi-Kadachi Pelt", "itemCount": 1, "probability": 0.26},
               {"material": "Tobi-Kadachi Scale", "itemCount": 1, "probability": 0.2},
               {"material": "Electro Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 1, "probability": 0.16},
               {"material": "Monster Bone M", "itemCount": 1, "probability": 0.11},
               {"material": "Tobi-Kadachi Claw", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Electro Sac", "Monster Bone M", "Tobi-Kadachi Claw", "Tobi-Kadachi Electrode", "Tobi-Kadachi Membrane",
            "Tobi-Kadachi Pelt", "Tobi-Kadachi Scale"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Tobi-Kadachi Scale+", "itemCount": 1, "probability": 0.3},
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 1, "probability": 0.25},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 1, "probability": 0.16},
               {"material": "Tobi-Kadachi Claw+", "itemCount": 1, "probability": 0.15},
               {"material": "Tobi-Kadachi Electrode+", "itemCount": 1, "probability": 0.12},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 1, "probability": 0.24},
               {"material": "Tobi-Kadachi Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Thunder Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 2, "probability": 0.15},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.13},
               {"material": "Tobi-Kadachi Claw+", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "Break": {
            "head": [{"material": "Tobi-Kadachi Electrode+", "itemCount": 1, "probability": 1}],
            "back": [
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 1, "probability": 0.8},
               {"material": "Tobi-Kadachi Scale+", "itemCount": 1, "probability": 0.2}],
            "forelimbs": [{"material": "Tobi-Kadachi Claw+", "itemCount": 1, "probability": 1}],
            "tail": [
               {"material": "Tobi-Kadachi Electrode+", "itemCount": 1, "probability": 0.8},
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Tobi-Kadachi Claw+", "itemCount": 1, "probability": 0.26},
               {"material": "Tobi-Kadachi Electrode+", "itemCount": 1, "probability": 0.19},
               {"material": "Thunder Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 2, "probability": 0.12},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 2, "probability": 0.11},
               {"material": "Tobi-Kadachi Scale+", "itemCount": 2, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Tobi-Kadachi Claw+", "itemCount": 1, "probability": 0.24},
               {"material": "Tobi-Kadachi Electrode+", "itemCount": 1, "probability": 0.19},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Thunder Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 3, "probability": 0.11},
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 3, "probability": 0.1},
               {"material": "Tobi-Kadachi Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Tobi-Kadachi Pelt+", "itemCount": 1, "probability": 0.24},
               {"material": "Tobi-Kadachi Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Thunder Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Membrane", "itemCount": 2, "probability": 0.15},
               {"material": "Monster Keenbone", "itemCount": 1, "probability": 0.13},
               {"material": "Tobi-Kadachi Claw+", "itemCount": 1, "probability": 0.09},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.01}]
         },
         "material": [
            "Glowing Feystone", "Monster Keenbone", "Mysterious Feystone", "Thunder Sac", "Tobi-Kadachi Claw+",
            "Tobi-Kadachi Electrode+", "Tobi-Kadachi Membrane", "Tobi-Kadachi Pelt+", "Tobi-Kadachi Scale+", "Warped Feystone",
            "Worn Feystone", "Wyvern Gem"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.29},
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.23},
               {"material": "Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.19},
               {"material": "Tobi-Kadachi Cathode", "itemCount": 1, "probability": 0.12},
               {"material": "Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.1},
               {"material": "Wyvern Gem", "itemCount": 1, "probability": 0.05},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.28},
               {"material": "Lightning Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.17},
               {"material": "Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "Break": {
            "head": [{"material": "Tobi-Kadachi Cathode", "itemCount": 1, "probability": 1}],
            "back": [
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.8},
               {"material": "Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.2}],
            "forelimbs": [{"material": "Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 1}],
            "tail": [
               {"material": "Tobi-Kadachi Cathode", "itemCount": 1, "probability": 0.8},
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.22},
               {"material": "Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Cathode", "itemCount": 1, "probability": 0.16},
               {"material": "Lightning Sac", "itemCount": 2, "probability": 0.14},
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 2, "probability": 0.12},
               {"material": "Tobi-Kadachi Shard", "itemCount": 2, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Tobi-Kadachi Cathode", "itemCount": 1, "probability": 0.18},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Lightning Sac", "itemCount": 3, "probability": 0.12},
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 3, "probability": 0.1},
               {"material": "Tobi-Kadachi Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.28},
               {"material": "Lightning Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.17},
               {"material": "Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.11},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.02}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Large Wyvern Gem", "Lightning Sac", "Tobi-Kadachi Cathode",
            "Tobi-Kadachi Hardclaw", "Tobi-Kadachi Membrane+", "Tobi-Kadachi Shard", "Tobi-Kadachi Thickfur", "Wyvern Gem"]
      }
   },
   "Tzitzi-Ya-Ku": {
      "Low Rank": {
         "General": {
            "Kill": [
               {"material": "Tzitzi-Ya-Ku Scale", "itemCount": 1, "probability": 0.36},
               {"material": "Tzitzi-Ya-Ku Hide", "itemCount": 1, "probability": 0.28},
               {"material": "Tzitzi-Ya-Ku Photophore", "itemCount": 1, "probability": 0.21},
               {"material": "Tzitzi-Ya-Ku Claw", "itemCount": 1, "probability": 0.15}],
            "Hunt": [
               {"material": "Tzitzi-Ya-Ku Hide", "itemCount": 1, "probability": 0.27},
               {"material": "Tzitzi-Ya-Ku Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Bone L", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Claw", "itemCount": 1, "probability": 0.15},
               {"material": "Dash Extract", "itemCount": 1, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Photophore", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {"pulse organs": [{"material": "Tzitzi-Ya-Ku Photophore", "itemCount": 1, "probability": 1}]},
         "Investigation": {
            "Silver": [
               {"material": "Tzitzi-Ya-Ku Claw", "itemCount": 1, "probability": 0.32},
               {"material": "Tzitzi-Ya-Ku Photophore", "itemCount": 1, "probability": 0.25},
               {"material": "Tzitzi-Ya-Ku Hide", "itemCount": 2, "probability": 0.18},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.14},
               {"material": "Tzitzi-Ya-Ku Scale", "itemCount": 2, "probability": 0.11}],
            "Gold": [
               {"material": "Tzitzi-Ya-Ku Claw", "itemCount": 1, "probability": 0.36},
               {"material": "Tzitzi-Ya-Ku Photophore", "itemCount": 1, "probability": 0.3},
               {"material": "Tzitzi-Ya-Ku Hide", "itemCount": 3, "probability": 0.14},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Tzitzi-Ya-Ku Hide", "itemCount": 1, "probability": 0.27},
               {"material": "Tzitzi-Ya-Ku Scale", "itemCount": 1, "probability": 0.21},
               {"material": "Monster Bone L", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Claw", "itemCount": 1, "probability": 0.15},
               {"material": "Dash Extract", "itemCount": 1, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Photophore", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Dash Extract", "Monster Bone L", "Tzitzi-Ya-Ku Claw", "Tzitzi-Ya-Ku Hide", "Tzitzi-Ya-Ku Photophore",
            "Tzitzi-Ya-Ku Scale"]
      },
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Tzitzi-Ya-Ku Scale+", "itemCount": 1, "probability": 0.35},
               {"material": "Tzitzi-Ya-Ku Hide+", "itemCount": 1, "probability": 0.27},
               {"material": "Tzitzi-Ya-Ku Photophore+", "itemCount": 1, "probability": 0.2},
               {"material": "Tzitzi-Ya-Ku Claw+", "itemCount": 1, "probability": 0.14},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.04}],
            "Hunt": [
               {"material": "Tzitzi-Ya-Ku Hide+", "itemCount": 1, "probability": 0.26},
               {"material": "Tzitzi-Ya-Ku Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Claw+", "itemCount": 1, "probability": 0.14},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Photophore+", "itemCount": 1, "probability": 0.09},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {"pulse organs": [{"material": "Tzitzi-Ya-Ku Photophore+", "itemCount": 1, "probability": 1}]},
         "Investigation": {
            "Silver": [
               {"material": "Tzitzi-Ya-Ku Claw+", "itemCount": 1, "probability": 0.32},
               {"material": "Tzitzi-Ya-Ku Photophore+", "itemCount": 1, "probability": 0.23},
               {"material": "Tzitzi-Ya-Ku Hide+", "itemCount": 2, "probability": 0.14},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Scale+", "itemCount": 2, "probability": 0.11},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Tzitzi-Ya-Ku Claw+", "itemCount": 1, "probability": 0.3},
               {"material": "Tzitzi-Ya-Ku Photophore+", "itemCount": 1, "probability": 0.24},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Hide+", "itemCount": 3, "probability": 0.12},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.1},
               {"material": "Tzitzi-Ya-Ku Scale+", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Tzitzi-Ya-Ku Hide+", "itemCount": 1, "probability": 0.26},
               {"material": "Tzitzi-Ya-Ku Scale+", "itemCount": 1, "probability": 0.2},
               {"material": "Monster Bone+", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Claw+", "itemCount": 1, "probability": 0.14},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Photophore+", "itemCount": 1, "probability": 0.09},
               {"material": "Bird Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Bird Wyvern Gem", "Dash Extract", "Monster Bone+", "Tzitzi-Ya-Ku Claw+", "Tzitzi-Ya-Ku Hide+",
            "Tzitzi-Ya-Ku Photophore+", "Tzitzi-Ya-Ku Scale+"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Tzitzi-Ya-Ku Shard", "itemCount": 1, "probability": 0.35},
               {"material": "Tzitzi-Ya-Ku Thickhide", "itemCount": 1, "probability": 0.27},
               {"material": "Tzitzi-Ya-Ku Photomembrane", "itemCount": 1, "probability": 0.2},
               {"material": "Tzitzi-Ya-Ku Hardclaw", "itemCount": 1, "probability": 0.14},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.04}],
            "Hunt": [
               {"material": "Tzitzi-Ya-Ku Thickhide", "itemCount": 1, "probability": 0.3},
               {"material": "Tzitzi-Ya-Ku Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.18},
               {"material": "Tzitzi-Ya-Ku Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Photomembrane", "itemCount": 1, "probability": 0.1},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {"pulse organs": [{"material": "Tzitzi-Ya-Ku Photomembrane", "itemCount": 1, "probability": 1}]},
         "Investigation": {
            "Silver": [
               {"material": "Tzitzi-Ya-Ku Hardclaw", "itemCount": 1, "probability": 0.32},
               {"material": "Tzitzi-Ya-Ku Photomembrane", "itemCount": 1, "probability": 0.23},
               {"material": "Tzitzi-Ya-Ku Thickhide", "itemCount": 2, "probability": 0.14},
               {"material": "Dash Extract", "itemCount": 3, "probability": 0.12},
               {"material": "Tzitzi-Ya-Ku Shard", "itemCount": 2, "probability": 0.11},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Tzitzi-Ya-Ku Hardclaw", "itemCount": 1, "probability": 0.3},
               {"material": "Tzitzi-Ya-Ku Photomembrane", "itemCount": 1, "probability": 0.24},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Thickhide", "itemCount": 3, "probability": 0.12},
               {"material": "Dash Extract", "itemCount": 5, "probability": 0.1},
               {"material": "Tzitzi-Ya-Ku Shard", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Tzitzi-Ya-Ku Thickhide", "itemCount": 1, "probability": 0.3},
               {"material": "Tzitzi-Ya-Ku Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Dash Extract", "itemCount": 2, "probability": 0.18},
               {"material": "Tzitzi-Ya-Ku Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Tzitzi-Ya-Ku Photomembrane", "itemCount": 1, "probability": 0.1},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Dash Extract", "Fey Wyvern Gem", "Tzitzi-Ya-Ku Hardclaw", "Tzitzi-Ya-Ku Photomembrane", "Tzitzi-Ya-Ku Shard",
            "Tzitzi-Ya-Ku Thickhide"]
      }
   },
   "Uragaan": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Uragaan Scale+", "itemCount": 1, "probability": 0.37},
               {"material": "Uragaan Carapace", "itemCount": 1, "probability": 0.25},
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.21},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.15},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Uragaan Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Uragaan Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.1},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.08},
               {"material": "Firecell Stone", "itemCount": 1, "probability": 0.05}]
         },
         "Break": {
            "jaw": [
               {"material": "Uragaan Jaw", "itemCount": 1, "probability": 0.72},
               {"material": "Firecell Stone", "itemCount": 1, "probability": 0.27},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.7},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.72},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.25},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}],
            "Silver": [
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.26},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.19},
               {"material": "Lava Nugget", "itemCount": 2, "probability": 0.14},
               {"material": "Firecell Stone", "itemCount": 1, "probability": 0.13},
               {"material": "Uragaan Carapace", "itemCount": 2, "probability": 0.12},
               {"material": "Uragaan Scale+", "itemCount": 2, "probability": 0.1},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.24},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.21},
               {"material": "Firecell Stone", "itemCount": 1, "probability": 0.16},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.13},
               {"material": "Uragaan Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Uragaan Scale+", "itemCount": 3, "probability": 0.08},
               {"material": "Lava Nugget", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Uragaan Carapace", "itemCount": 1, "probability": 0.26},
               {"material": "Uragaan Scale+", "itemCount": 1, "probability": 0.21},
               {"material": "Inferno Sac", "itemCount": 1, "probability": 0.18},
               {"material": "Uragaan Scute", "itemCount": 1, "probability": 0.12},
               {"material": "Monster Hardbone", "itemCount": 1, "probability": 0.1},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.08},
               {"material": "Firecell Stone", "itemCount": 1, "probability": 0.05}]
         },
         "material": [
            "Firecell Stone", "Glowing Feystone", "Inferno Sac", "Lava Nugget", "Monster Hardbone", "Shining Streamstone",
            "Sullied Streamstone", "Uragaan Carapace", "Uragaan Jaw", "Uragaan Marrow", "Uragaan Ruby", "Uragaan Scale+",
            "Uragaan Scute", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Uragaan Shard", "itemCount": 1, "probability": 0.36},
               {"material": "Uragaan Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.2},
               {"material": "Uragaan Marrow", "itemCount": 1, "probability": 0.13},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.05},
               {"material": "Uragaan Pallium", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Uragaan Cortex", "itemCount": 1, "probability": 0.3},
               {"material": "Uragaan Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.15},
               {"material": "Uragaan Marrow", "itemCount": 2, "probability": 0.08},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "jaw": [
               {"material": "Uragaan Jaw+", "itemCount": 1, "probability": 0.72},
               {"material": "Uragaan Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Uragaan Pallium", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.7},
               {"material": "Uragaan Marrow", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.6},
               {"material": "Uragaan Cortex", "itemCount": 1, "probability": 0.3},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.07},
               {"material": "Uragaan Pallium", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.26},
               {"material": "Uragaan Cortex", "itemCount": 2, "probability": 0.15},
               {"material": "Lava Nugget", "itemCount": 3, "probability": 0.14},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.13},
               {"material": "Uragaan Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.1},
               {"material": "Uragaan Pallium", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.24},
               {"material": "Uragaan Pallium", "itemCount": 1, "probability": 0.18},
               {"material": "Conflagrant Sac", "itemCount": 3, "probability": 0.16},
               {"material": "Uragaan Cortex", "itemCount": 3, "probability": 0.13},
               {"material": "Uragaan Shard", "itemCount": 3, "probability": 0.11},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.1},
               {"material": "Lava Nugget", "itemCount": 4, "probability": 0.08}],
            "Bronze": [
               {"material": "Uragaan Cortex", "itemCount": 1, "probability": 0.3},
               {"material": "Uragaan Shard", "itemCount": 1, "probability": 0.23},
               {"material": "Conflagrant Sac", "itemCount": 1, "probability": 0.21},
               {"material": "Uragaan Scute+", "itemCount": 1, "probability": 0.15},
               {"material": "Uragaan Marrow", "itemCount": 2, "probability": 0.08},
               {"material": "Uragaan Ruby", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Conflagrant Sac", "Lava Nugget", "Sealed Feystone", "Uragaan Cortex",
            "Uragaan Jaw+", "Uragaan Marrow", "Uragaan Pallium", "Uragaan Ruby", "Uragaan Scute+", "Uragaan Shard"]
      }
   },
   "Vaal Hazak": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Deceased Scale", "itemCount": 1, "probability": 0.32},
               {"material": "Vaal Hazak Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Vaal Hazak Talon", "itemCount": 1, "probability": 0.15},
               {"material": "Vaal Hazak Wing", "itemCount": 1, "probability": 0.11},
               {"material": "Vaal Hazak Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Vaal Hazak Fang+", "itemCount": 1, "probability": 0.08},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Vaal Hazak Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Deceased Scale", "itemCount": 1, "probability": 0.19},
               {"material": "Vaal Hazak Wing", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Talon", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Vaal Hazak Membrane", "itemCount": 1, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Vaal Hazak Fang+", "itemCount": 1, "probability": 0.66},
               {"material": "Vaal Hazak Membrane", "itemCount": 1, "probability": 0.32},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.02}],
            "forelimbs": [
               {"material": "Vaal Hazak Talon", "itemCount": 1, "probability": 0.8},
               {"material": "Vaal Hazak Carapace", "itemCount": 1, "probability": 0.2}],
            "stomach": [
               {"material": "Vaal Hazak Wing", "itemCount": 1, "probability": 0.7},
               {"material": "Vaal Hazak Membrane", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Vaal Hazak Tail", "itemCount": 1, "probability": 0.75},
               {"material": "Deceased Scale", "itemCount": 1, "probability": 0.22},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}],
            "Silver": [
               {"material": "Vaal Hazak Wing", "itemCount": 1, "probability": 0.17},
               {"material": "Vaal Hazak Talon", "itemCount": 1, "probability": 0.16},
               {"material": "Vaal Hazak Fang+", "itemCount": 1, "probability": 0.15},
               {"material": "Vaal Hazak Tail", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Carapace", "itemCount": 2, "probability": 0.12},
               {"material": "Deceased Scale", "itemCount": 2, "probability": 0.1},
               {"material": "Vaal Hazak Membrane", "itemCount": 2, "probability": 0.1},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.06}],
            "Gold": [
               {"material": "Vaal Hazak Wing", "itemCount": 1, "probability": 0.16},
               {"material": "Vaal Hazak Talon", "itemCount": 1, "probability": 0.15},
               {"material": "Vaal Hazak Tail", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Fang+", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Gem", "itemCount": 1, "probability": 0.13},
               {"material": "Vaal Hazak Carapace", "itemCount": 3, "probability": 0.1},
               {"material": "Vaal Hazak Membrane", "itemCount": 3, "probability": 0.1},
               {"material": "Deceased Scale", "itemCount": 3, "probability": 0.08}],
            "Bronze": [
               {"material": "Vaal Hazak Carapace", "itemCount": 1, "probability": 0.24},
               {"material": "Deceased Scale", "itemCount": 1, "probability": 0.19},
               {"material": "Vaal Hazak Wing", "itemCount": 1, "probability": 0.14},
               {"material": "Vaal Hazak Talon", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Vaal Hazak Membrane", "itemCount": 1, "probability": 0.1},
               {"material": "Elder Dragon Bone", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Deceased Scale", "Elder Dragon Blood", "Elder Dragon Bone", "Shining Streamstone", "Sullied Streamstone",
            "Vaal Hazak Carapace", "Vaal Hazak Fang+", "Vaal Hazak Gem", "Vaal Hazak Membrane", "Vaal Hazak Tail", "Vaal Hazak Talon",
            "Vaal Hazak Wing", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {"Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]},
         "Break": {
            "head": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "stomach": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Gold": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Bronze": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}]
         },
         "material": ["Carved Feystone", "Iron Ore", "Monster Bone L", "Sealed Feystone"]
      }
   },
   "Velkhana": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.13},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.12},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Crystal Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Velkhana Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Velkhana Hardclaw", "itemCount": 1, "probability": 0.19},
               {"material": "Velkhana Fellwing", "itemCount": 1, "probability": 0.15},
               {"material": "Velkhana Crownhorn", "itemCount": 1, "probability": 0.08},
               {"material": "Velkhana Crystal", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Velkhana Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Crystal Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Velkhana Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Velkhana Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "head": [
               {"material": "Velkhana Crownhorn", "itemCount": 1, "probability": 0.66},
               {"material": "Crystal Shard", "itemCount": 2, "probability": 0.32},
               {"material": "Velkhana Crystal", "itemCount": 1, "probability": 0.02}],
            "wings": [
               {"material": "Velkhana Fellwing", "itemCount": 1, "probability": 0.7},
               {"material": "Velkhana Hardclaw", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Velkhana Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Velkhana Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Velkhana Crystal", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.8},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.2}],
            "Silver": [
               {"material": "Velkhana Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Velkhana Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Velkhana Fellwing", "itemCount": 1, "probability": 0.16},
               {"material": "Velkhana Cortex", "itemCount": 2, "probability": 0.14},
               {"material": "Velkhana Crownhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Crystal Shard", "itemCount": 2, "probability": 0.12},
               {"material": "Velkhana Crystal", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Velkhana Fellwing", "itemCount": 1, "probability": 0.2},
               {"material": "Velkhana Crownhorn", "itemCount": 1, "probability": 0.18},
               {"material": "Velkhana Lash", "itemCount": 1, "probability": 0.16},
               {"material": "Velkhana Crystal", "itemCount": 1, "probability": 0.16},
               {"material": "Velkhana Hardclaw", "itemCount": 2, "probability": 0.11},
               {"material": "Velkhana Cortex", "itemCount": 3, "probability": 0.1},
               {"material": "Crystal Shard", "itemCount": 3, "probability": 0.09}],
            "Bronze": [
               {"material": "Velkhana Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Crystal Shard", "itemCount": 1, "probability": 0.22},
               {"material": "Velkhana Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Velkhana Lash", "itemCount": 1, "probability": 0.13},
               {"material": "Pure Dragon Blood", "itemCount": 1, "probability": 0.12},
               {"material": "Large Elder Dragon Bone", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Carved Feystone", "Crystal Shard", "Large Elder Dragon Bone", "Pure Dragon Blood", "Sealed Feystone", "Velkhana Cortex",
            "Velkhana Crownhorn", "Velkhana Crystal", "Velkhana Fellwing", "Velkhana Hardclaw", "Velkhana Lash"]
      }
   },
   "Viper Tobi-Kadachi": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Mysterious Feystone", "itemCount": 1, "probability": 0.55},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.25},
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.15},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.05}]
         },
         "material": ["Glowing Feystone", "Mysterious Feystone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Viper Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.3},
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.24},
               {"material": "Viper Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.21},
               {"material": "Viper Tobi-Kadachi Thorn", "itemCount": 1, "probability": 0.12},
               {"material": "Viper Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}],
            "Hunt": [
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.28},
               {"material": "Viper Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Viper Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.17},
               {"material": "Viper Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.11},
               {"material": "Deadly Poison Sac", "itemCount": 2, "probability": 0.1},
               {"material": "Ultraplegia Sac", "itemCount": 2, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [{"material": "Viper Tobi-Kadachi Thorn", "itemCount": 1, "probability": 1}],
            "back": [
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.8},
               {"material": "Viper Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.2}],
            "forelimbs": [{"material": "Viper Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 1}],
            "tail": [
               {"material": "Viper Tobi-Kadachi Thorn", "itemCount": 1, "probability": 0.8},
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.2}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.7},
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.3}],
            "Silver": [
               {"material": "Viper Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.22},
               {"material": "Viper Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Viper Tobi-Kadachi Thorn", "itemCount": 1, "probability": 0.16},
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 2, "probability": 0.12},
               {"material": "Viper Tobi-Kadachi Shard", "itemCount": 2, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.08},
               {"material": "Deadly Poison Sac", "itemCount": 3, "probability": 0.07},
               {"material": "Ultraplegia Sac", "itemCount": 3, "probability": 0.07}],
            "Gold": [
               {"material": "Viper Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.18},
               {"material": "Viper Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.18},
               {"material": "Viper Tobi-Kadachi Thorn", "itemCount": 1, "probability": 0.18},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.16},
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 3, "probability": 0.1},
               {"material": "Viper Tobi-Kadachi Shard", "itemCount": 3, "probability": 0.08},
               {"material": "Deadly Poison Sac", "itemCount": 4, "probability": 0.06},
               {"material": "Ultraplegia Sac", "itemCount": 4, "probability": 0.06}],
            "Bronze": [
               {"material": "Viper Tobi-Kadachi Thickfur", "itemCount": 1, "probability": 0.28},
               {"material": "Viper Tobi-Kadachi Shard", "itemCount": 1, "probability": 0.21},
               {"material": "Viper Tobi-Kadachi Membrane+", "itemCount": 1, "probability": 0.17},
               {"material": "Viper Tobi-Kadachi Hardclaw", "itemCount": 1, "probability": 0.11},
               {"material": "Deadly Poison Sac", "itemCount": 2, "probability": 0.1},
               {"material": "Ultraplegia Sac", "itemCount": 2, "probability": 0.1},
               {"material": "Large Wyvern Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Deadly Poison Sac", "Large Wyvern Gem", "Ultraplegia Sac",
            "Viper Tobi-Kadachi Hardclaw", "Viper Tobi-Kadachi Membrane+", "Viper Tobi-Kadachi Shard", "Viper Tobi-Kadachi Thickfur",
            "Viper Tobi-Kadachi Thorn"]
      }
   },
   "Xeno'jiiva": {
      "High Rank": {
         "General": {
            "Kill": [
               {"material": "Xeno'jiiva Shell", "itemCount": 1, "probability": 0.32},
               {"material": "Xeno'jiiva Soulscale", "itemCount": 1, "probability": 0.22},
               {"material": "Xeno'jiiva Claw", "itemCount": 1, "probability": 0.14},
               {"material": "Xeno'jiiva Wing", "itemCount": 1, "probability": 0.11},
               {"material": "Xeno'jiiva Tail", "itemCount": 1, "probability": 0.08},
               {"material": "Xeno'jiiva Horn", "itemCount": 1, "probability": 0.08},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Xeno'jiiva Shell", "itemCount": 1, "probability": 0.22},
               {"material": "Xeno'jiiva Soulscale", "itemCount": 1, "probability": 0.18},
               {"material": "Xeno'jiiva Veil", "itemCount": 1, "probability": 0.14},
               {"material": "Xeno'jiiva Claw", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.1},
               {"material": "Xeno'jiiva Wing", "itemCount": 1, "probability": 0.1},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.03}]
         },
         "Break": {
            "head": [
               {"material": "Xeno'jiiva Horn", "itemCount": 1, "probability": 0.64},
               {"material": "Xeno'jiiva Veil", "itemCount": 1, "probability": 0.32},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.04}],
            "forelimbs": [
               {"material": "Xeno'jiiva Claw", "itemCount": 1, "probability": 0.8},
               {"material": "Xeno'jiiva Shell", "itemCount": 1, "probability": 0.2}],
            "wings": [
               {"material": "Xeno'jiiva Wing", "itemCount": 1, "probability": 0.7},
               {"material": "Xeno'jiiva Veil", "itemCount": 2, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Xeno'jiiva Tail", "itemCount": 1, "probability": 0.71},
               {"material": "Xeno'jiiva Soulscale", "itemCount": 1, "probability": 0.22},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.07}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Xeno'jiiva Shell", "itemCount": 1, "probability": 0.22},
               {"material": "Xeno'jiiva Soulscale", "itemCount": 1, "probability": 0.18},
               {"material": "Xeno'jiiva Veil", "itemCount": 1, "probability": 0.14},
               {"material": "Xeno'jiiva Claw", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.1},
               {"material": "Xeno'jiiva Wing", "itemCount": 1, "probability": 0.1},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.03}],
            "Gold": [
               {"material": "Xeno'jiiva Shell", "itemCount": 1, "probability": 0.22},
               {"material": "Xeno'jiiva Soulscale", "itemCount": 1, "probability": 0.18},
               {"material": "Xeno'jiiva Veil", "itemCount": 1, "probability": 0.14},
               {"material": "Xeno'jiiva Claw", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.1},
               {"material": "Xeno'jiiva Wing", "itemCount": 1, "probability": 0.1},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.03}],
            "Bronze": [
               {"material": "Xeno'jiiva Shell", "itemCount": 1, "probability": 0.22},
               {"material": "Xeno'jiiva Soulscale", "itemCount": 1, "probability": 0.18},
               {"material": "Xeno'jiiva Veil", "itemCount": 1, "probability": 0.14},
               {"material": "Xeno'jiiva Claw", "itemCount": 1, "probability": 0.13},
               {"material": "Elder Dragon Bone", "itemCount": 2, "probability": 0.1},
               {"material": "Elder Dragon Blood", "itemCount": 2, "probability": 0.1},
               {"material": "Xeno'jiiva Wing", "itemCount": 1, "probability": 0.1},
               {"material": "Xeno'jiiva Gem", "itemCount": 1, "probability": 0.03}]
         },
         "material": [
            "Elder Dragon Blood", "Elder Dragon Bone", "Xeno'jiiva Claw", "Xeno'jiiva Gem", "Xeno'jiiva Horn", "Xeno'jiiva Shell",
            "Xeno'jiiva Soulscale", "Xeno'jiiva Tail", "Xeno'jiiva Veil", "Xeno'jiiva Wing"]
      },
      "Master Rank": {
         "General": {"Hunt": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]},
         "Break": {
            "head": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "forelimbs": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}],
            "wings": [{"material": "Monster Bone L", "itemCount": 1, "probability": 1}]
         },
         "Investigation": {
            "Silver": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Gold": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}],
            "Bronze": [{"material": "Iron Ore", "itemCount": 1, "probability": 1}]
         },
         "material": ["Iron Ore", "Monster Bone L"]
      }
   },
   "Yian Garuga": {
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.32},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.24},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.19},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.11},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.09},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}],
            "Hunt": [
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.14},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.12},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.11},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.08}]
         },
         "Break": {
            "ears": [
               {"material": "Garuga Auricle", "itemCount": 1, "probability": 0.7},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.3}],
            "beak": [
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.65},
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.35}],
            "back": [
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.7},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.3}],
            "wings": [
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.65},
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.35}]
         },
         "Sever": {
            "tail": [
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.7},
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.25},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.05}]
         },
         "Investigation": {
            "Silver": [
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.24},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.2},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.18},
               {"material": "Garuga Auricle", "itemCount": 1, "probability": 0.14},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.14},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.1}],
            "Gold": [
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.24},
               {"material": "Fey Wyvern Gem", "itemCount": 1, "probability": 0.18},
               {"material": "Garuga Auricle", "itemCount": 1, "probability": 0.18},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.13},
               {"material": "Garuga Silverpelt", "itemCount": 2, "probability": 0.09}],
            "Bronze": [
               {"material": "Garuga Cortex", "itemCount": 1, "probability": 0.26},
               {"material": "Garuga Shard", "itemCount": 1, "probability": 0.2},
               {"material": "Fancy Beak", "itemCount": 1, "probability": 0.14},
               {"material": "Garuga Silverpelt", "itemCount": 1, "probability": 0.12},
               {"material": "Conflagrant Sac", "itemCount": 2, "probability": 0.11},
               {"material": "Garuga Fellwing", "itemCount": 1, "probability": 0.09},
               {"material": "Garuga Lash", "itemCount": 1, "probability": 0.08}]
         },
         "material": [
            "Conflagrant Sac", "Fancy Beak", "Fey Wyvern Gem", "Garuga Auricle", "Garuga Cortex", "Garuga Fellwing", "Garuga Lash",
            "Garuga Shard", "Garuga Silverpelt"]
      }
   },
   "Zinogre": {
      "High Rank": {
         "General": {},
         "Break": {},
         "Investigation": {
            "Purple": [
               {"material": "Worn Feystone", "itemCount": 1, "probability": 0.35},
               {"material": "Glowing Feystone", "itemCount": 1, "probability": 0.34},
               {"material": "Warped Feystone", "itemCount": 1, "probability": 0.26},
               {"material": "Sullied Streamstone", "itemCount": 1, "probability": 0.03},
               {"material": "Shining Streamstone", "itemCount": 1, "probability": 0.02}]
         },
         "material": ["Glowing Feystone", "Shining Streamstone", "Sullied Streamstone", "Warped Feystone", "Worn Feystone"]
      },
      "Master Rank": {
         "General": {
            "Kill": [
               {"material": "Zinogre Cortex", "itemCount": 1, "probability": 0.37},
               {"material": "Zinogre Electrofur+", "itemCount": 1, "probability": 0.25},
               {"material": "Zinogre Deathly Shocker", "itemCount": 1, "probability": 0.15},
               {"material": "Zinogre Hardclaw", "itemCount": 1, "probability": 0.12},
               {"material": "Zinogre Lash", "itemCount": 1, "probability": 0.09},
               {"material": "Zinogre Skymerald", "itemCount": 1, "probability": 0.02}],
            "Hunt": [
               {"material": "Zinogre Electrofur+", "itemCount": 1, "probability": 0.28},
               {"material": "Zinogre Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Zinogre Deathly Shocker", "itemCount": 1, "probability": 0.18},
               {"material": "Zinogre Hardclaw", "itemCount": 1, "probability": 0.12},
               {"material": "Lightning Sac", "itemCount": 2, "probability": 0.11},
               {"material": "Zinogre Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "Break": {
            "head": [
               {"material": "Zinogre Hardhorn", "itemCount": 1, "probability": 0.72},
               {"material": "Zinogre Cortex", "itemCount": 1, "probability": 0.27},
               {"material": "Zinogre Skymerald", "itemCount": 1, "probability": 0.01}],
            "back": [
               {"material": "Zinogre Deathly Shocker", "itemCount": 1, "probability": 0.7},
               {"material": "Zinogre Electrofur+", "itemCount": 1, "probability": 0.3}],
            "foreleg": [
               {"material": "Zinogre Hardclaw", "itemCount": 1, "probability": 0.7},
               {"material": "Zinogre Deathly Shocker", "itemCount": 1, "probability": 0.3}]
         },
         "Sever": {
            "tail": [
               {"material": "Zinogre Lash", "itemCount": 1, "probability": 0.72},
               {"material": "Zinogre Cortex", "itemCount": 1, "probability": 0.25},
               {"material": "Zinogre Skymerald", "itemCount": 1, "probability": 0.03}]
         },
         "Investigation": {
            "Purple": [
               {"material": "Carved Feystone", "itemCount": 1, "probability": 0.6},
               {"material": "Ancient Feystone", "itemCount": 1, "probability": 0.3},
               {"material": "Sealed Feystone", "itemCount": 1, "probability": 0.1}],
            "Silver": [
               {"material": "Zinogre Deathly Shocker", "itemCount": 1, "probability": 0.26},
               {"material": "Zinogre Hardclaw", "itemCount": 1, "probability": 0.2},
               {"material": "Zinogre Lash", "itemCount": 1, "probability": 0.18},
               {"material": "Zinogre Hardhorn", "itemCount": 1, "probability": 0.14},
               {"material": "Fulgurbug", "itemCount": 2, "probability": 0.14},
               {"material": "Zinogre Skymerald", "itemCount": 1, "probability": 0.08}],
            "Gold": [
               {"material": "Zinogre Lash", "itemCount": 1, "probability": 0.22},
               {"material": "Zinogre Hardhorn", "itemCount": 1, "probability": 0.2},
               {"material": "Zinogre Hardclaw", "itemCount": 1, "probability": 0.16},
               {"material": "Zinogre Skymerald", "itemCount": 1, "probability": 0.16},
               {"material": "Zinogre Deathly Shocker", "itemCount": 2, "probability": 0.14},
               {"material": "Fulgurbug", "itemCount": 3, "probability": 0.12}],
            "Bronze": [
               {"material": "Zinogre Electrofur+", "itemCount": 1, "probability": 0.28},
               {"material": "Zinogre Cortex", "itemCount": 1, "probability": 0.22},
               {"material": "Zinogre Deathly Shocker", "itemCount": 1, "probability": 0.18},
               {"material": "Zinogre Hardclaw", "itemCount": 1, "probability": 0.12},
               {"material": "Lightning Sac", "itemCount": 2, "probability": 0.11},
               {"material": "Zinogre Hardhorn", "itemCount": 1, "probability": 0.09}]
         },
         "material": [
            "Ancient Feystone", "Carved Feystone", "Fulgurbug", "Lightning Sac", "Sealed Feystone", "Zinogre Cortex",
            "Zinogre Deathly Shocker", "Zinogre Electrofur+", "Zinogre Hardclaw", "Zinogre Hardhorn", "Zinogre Lash",
            "Zinogre Skymerald"]
      }
   }
};

/** markBadData for auto corrected issues and console.error for ones that are unexpected
 * Bad data could be in scrape but I think it's good to secretly include this (passive aggressive) warning in the prod code. */
const badData = {
   "Break and sever tail at High Rank": ["Uragaan"],
   "Break and sever tail at Master Rank": ["Uragaan"],
   "Duplicate new table High Rank General > Kill": ["Kulve Taroth"],
   "Duplicate new table Master Rank Break > back": ["Zinogre"],
   "Duplicate new table Master Rank Break > claws": ["Brute Tigrex"],
   "Duplicate new table Master Rank Break > foreleg": ["Zinogre"],
   "Duplicate new table Master Rank Break > head": ["Brute Tigrex", "Zinogre"],
   "Duplicate new table Master Rank Break > left leg mantle": ["Shara Ishvalda"],
   "Duplicate new table Master Rank Break > right leg mantle": ["Shara Ishvalda"],
   "Duplicate new table Master Rank General > Capture": [
      "Alatreon", "Acidic Glavenus", "Banbaro", "Behemoth", "Azure Rathalos", "Barroth", "Anjanath", "Blackveil Vaal Hazak",
      "Black Diablos", "Beotodus", "Barioth", "Ebony Odogaron", "Furious Rajang", "Brute Tigrex", "Gold Rathian", "Frostfang Barioth",
      "Fulgur Anjanath", "Dodogama", "Bazelgeuse", "Kulve Taroth", "Brachydios", "Great Jagras", "Glavenus", "Deviljho", "Lavasioth",
      "Coral Pukei-Pukei", "Kushala Daora", "Nergigante", "Rathalos", "Pink Rathian", "Pukei-Pukei", "Kulu-Ya-Ku",
      "Ruiner Nergigante", "Radobaan", "Diablos", "Tigrex", "Raging Brachydios", "Seething Bazelgeuse", "Scarred Yian Garuga",
      "Lunastra", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Shrieking Legiana", "Vaal Hazak", "Paolumu",
      "Odogaron", "Nargacuga", "Nightshade Paolumu", "Fatalis", "Tzitzi-Ya-Ku", "Jyuratodus", "Great Girros", "Rajang", "Uragaan",
      "Kirin", "Namielle", "Yian Garuga", "Shara Ishvalda", "Zinogre", "Legiana", "Teostra", "Xeno'jiiva", "Tobi-Kadachi", "Rathian",
      "Silver Rathalos", "Safi'jiiva", "Velkhana"],
   "Duplicate new table Master Rank General > Kill": ["Kulve Taroth"],
   "Kill/Capture tables don't match for High Rank": ["Ancient Leshen", "Leshen"],
   "Kill/Capture tables don't match for Master Rank": ["Bazelgeuse"],
   "Manual Correction: no rewards at Low Rank": ["Nergigante"],
   "Manual Correction: wrong Investigation": ["Ancient Leshen", "Leshen"],
   "Manual Correction: wrong breakable part": ["Kushala Daora", "Teostra"],
   "Manual Correction: wrong material": ["Safi'jiiva"],
   "Missing required new table High Rank General > Hunt": [
      "Acidic Glavenus", "Banbaro", "Blackveil Vaal Hazak", "Beotodus", "Barioth", "Ebony Odogaron", "Brute Tigrex", "Gold Rathian",
      "Fulgur Anjanath", "Brachydios", "Glavenus", "Coral Pukei-Pukei", "Ruiner Nergigante", "Tigrex", "Seething Bazelgeuse",
      "Scarred Yian Garuga", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Shrieking Legiana", "Nargacuga",
      "Nightshade Paolumu", "Rajang", "Namielle", "Zinogre", "Silver Rathalos", "Velkhana"],
   "Missing required new table High Rank General > Kill": [
      "Acidic Glavenus", "Banbaro", "Blackveil Vaal Hazak", "Beotodus", "Barioth", "Ebony Odogaron", "Brute Tigrex", "Gold Rathian",
      "Fulgur Anjanath", "Brachydios", "Glavenus", "Coral Pukei-Pukei", "Ruiner Nergigante", "Tigrex", "Seething Bazelgeuse",
      "Scarred Yian Garuga", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Shrieking Legiana", "Nargacuga",
      "Nightshade Paolumu", "Rajang", "Namielle", "Zinogre", "Silver Rathalos", "Velkhana"],
   "Missing required new table High Rank Investigation > Bronze": [
      "Acidic Glavenus", "Banbaro", "Blackveil Vaal Hazak", "Beotodus", "Barioth", "Ebony Odogaron", "Brute Tigrex", "Gold Rathian",
      "Fulgur Anjanath", "Brachydios", "Glavenus", "Coral Pukei-Pukei", "Ruiner Nergigante", "Tigrex", "Seething Bazelgeuse",
      "Scarred Yian Garuga", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Shrieking Legiana", "Nargacuga",
      "Nightshade Paolumu", "Rajang", "Namielle", "Zinogre", "Silver Rathalos", "Velkhana"],
   "Missing required new table High Rank Investigation > Gold": [
      "Acidic Glavenus", "Banbaro", "Blackveil Vaal Hazak", "Beotodus", "Barioth", "Ebony Odogaron", "Brute Tigrex", "Gold Rathian",
      "Fulgur Anjanath", "Brachydios", "Glavenus", "Coral Pukei-Pukei", "Ruiner Nergigante", "Tigrex", "Seething Bazelgeuse",
      "Scarred Yian Garuga", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Shrieking Legiana", "Nargacuga",
      "Nightshade Paolumu", "Rajang", "Namielle", "Zinogre", "Silver Rathalos", "Velkhana"],
   "Missing required new table High Rank Investigation > Purple": [
      "Behemoth", "Dodogama", "Kulve Taroth", "Great Jagras", "Kulu-Ya-Ku", "Tzitzi-Ya-Ku", "Great Girros", "Xeno'jiiva"],
   "Missing required new table High Rank Investigation > Silver": [
      "Acidic Glavenus", "Banbaro", "Blackveil Vaal Hazak", "Beotodus", "Barioth", "Ebony Odogaron", "Brute Tigrex", "Gold Rathian",
      "Fulgur Anjanath", "Brachydios", "Glavenus", "Coral Pukei-Pukei", "Ruiner Nergigante", "Tigrex", "Seething Bazelgeuse",
      "Scarred Yian Garuga", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Shrieking Legiana", "Nargacuga",
      "Nightshade Paolumu", "Rajang", "Namielle", "Zinogre", "Silver Rathalos", "Velkhana"],
   "Missing required new table Master Rank General > Kill": ["Behemoth", "Bazelgeuse", "Nergigante", "Vaal Hazak", "Xeno'jiiva"],
   "Missing required new table Master Rank Investigation > Bronze": ["Alatreon", "Frostfang Barioth", "Fatalis"],
   "Missing required new table Master Rank Investigation > Gold": ["Alatreon", "Frostfang Barioth", "Fatalis"],
   "Missing required new table Master Rank Investigation > Purple": [
      "Alatreon", "Behemoth", "Furious Rajang", "Frostfang Barioth", "Dodogama", "Kulve Taroth", "Great Jagras", "Kulu-Ya-Ku",
      "Raging Brachydios", "Fatalis", "Tzitzi-Ya-Ku", "Great Girros", "Yian Garuga", "Shara Ishvalda", "Xeno'jiiva", "Safi'jiiva"],
   "Missing required new table Master Rank Investigation > Silver": ["Alatreon", "Frostfang Barioth", "Fatalis"],
   "Wrong rank data: monster can't be fought at Low Rank": [
      "Ancient Leshen", "Kushala Daora", "Radobaan", "Vaal Hazak", "Jyuratodus", "Teostra"],
   "monsters": [
      "Alatreon", "Acidic Glavenus", "Ancient Leshen", "Banbaro", "Behemoth", "Azure Rathalos", "Barroth", "Anjanath",
      "Blackveil Vaal Hazak", "Black Diablos", "Beotodus", "Barioth", "Ebony Odogaron", "Furious Rajang", "Brute Tigrex",
      "Gold Rathian", "Frostfang Barioth", "Fulgur Anjanath", "Dodogama", "Bazelgeuse", "Kulve Taroth", "Brachydios", "Great Jagras",
      "Glavenus", "Deviljho", "Lavasioth", "Coral Pukei-Pukei", "Kushala Daora", "Nergigante", "Rathalos", "Pink Rathian",
      "Pukei-Pukei", "Kulu-Ya-Ku", "Ruiner Nergigante", "Radobaan", "Diablos", "Tigrex", "Raging Brachydios", "Seething Bazelgeuse",
      "Scarred Yian Garuga", "Lunastra", "Savage Deviljho", "Stygian Zinogre", "Viper Tobi-Kadachi", "Leshen", "Shrieking Legiana",
      "Vaal Hazak", "Paolumu", "Odogaron", "Nargacuga", "Nightshade Paolumu", "Fatalis", "Tzitzi-Ya-Ku", "Jyuratodus", "Great Girros",
      "Rajang", "Uragaan", "Kirin", "Namielle", "Yian Garuga", "Shara Ishvalda", "Zinogre", "Legiana", "Teostra", "Xeno'jiiva",
      "Tobi-Kadachi", "Rathian", "Silver Rathalos", "Safi'jiiva", "Velkhana"]
};
