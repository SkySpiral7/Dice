'use strict';

//these globals are valid data but only used when scraping

const noInvestigations = ['Ancient Leshen', 'Leshen', 'Zorah Magdaros'];
/** These are the only monsters that are possible for low rank. Kirin can get LR investigations in addition to the LR optional quest.
 * Nergigante and Zorah Magdaros are story only (no LR investigations). Nergigante is excluded since you can't
 * get LR rewards from him (see data corrections) */
const lowRankMonsters = [
   'Anjanath', 'Barroth', 'Diablos', 'Great Girros', 'Great Jagras', 'Jyuratodus', 'Kirin', 'Kulu-Ya-Ku', 'Legiana',
   'Odogaron', 'Paolumu', 'Pukei-Pukei', 'Radobaan', 'Rathalos', 'Rathian', 'Tobi-Kadachi', 'Tzitzi-Ya-Ku', 'Zorah Magdaros'
];
/** Add Nergigante since he has a normal HR fight. Kirin can be fought in a HR event and the rest of LR (including Zorah) has a HR optional quest.
 * I haven't finished HR yet so I don't know if you can re-fight Leshen */
const highRankMonsters = lowRankMonsters.concat([
   'Ancient Leshen', 'Azure Rathalos', 'Bazelgeuse', 'Behemoth', 'Black Diablos', 'Deviljho', 'Dodogama', 'Kulve Taroth', 'Kushala Daora',
   'Lavasioth', 'Leshen', 'Lunastra', 'Nergigante', 'Pink Rathian', 'Teostra', 'Uragaan', 'Vaal Hazak', 'Xeno\'jiiva']);
highRankMonsters.sort();

//MR is Iceborne only. there doesn't need to be a var for MR name list since it's (presumably) all of them (except Ancient Leshen, Leshen)

/** Builds monsterData via web scraping. It's faster than I expected but rarely if ever needs to be re-ran.
 *
 * After running (network tab will say if any pending) manually check:
 * 1 that there are no console.error else add more corrections
 * 2 run groomMonsterData (verify still no console.error). copy the console.log output into DB
 *
 * Last run on 2022-01-07 20:44 the website says ver. 15.11
 * Latest game version is 15.11.01 (2021-06-03) */
function scrapeMonsterList()
{
   /** This disables jquery from requesting images when parsing html.
    * Not in cache since it shouldn't be needed normally and scraping only creates it once. */
   const virtualDocument = document.implementation.createHTMLDocument('virtual');

   $.get('https://mhworld.kiranico.com/monsters').fail(() =>
   {
      alert('Failed to load https://mhworld.kiranico.com/monsters (the monster index).\nConnect to internet and try again.');
   })
   .done(function(html)
   {
      $(html, virtualDocument).find('h6:contains("Large Monsters")+div>div>table a').each((index, element) =>
      {
         scrapeMonsterData(virtualDocument, element.textContent, element.href);
      });
   });
}

/* Debug examples:
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Nergigante', 'https://mhworld.kiranico.com/monsters/aYaUV/nergigante')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Alatreon', 'https://mhworld.kiranico.com/monsters/ErdcV/alatreon')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Rathalos', 'https://mhworld.kiranico.com/monsters/BnetX/rathalos')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Silver Rathalos', 'https://mhworld.kiranico.com/monsters/B0ktO/silver-rathalos')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Ancient Leshen', 'https://mhworld.kiranico.com/monsters/N3vuk/ancient-leshen')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Kulu-Ya-Ku', 'https://mhworld.kiranico.com/monsters/YQ1FE/kulu-ya-ku')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Kulve Taroth', 'https://mhworld.kiranico.com/monsters/5xbCn/kulve-taroth')
 * scrapeMonsterData(document.implementation.createHTMLDocument('virtual'), 'Zorah Magdaros', 'https://mhworld.kiranico.com/monsters/EmVcV/zorah-magdaros')
 */
function scrapeMonsterData(virtualDocument, monsterName, monsterUrl)
{
   $.get(monsterUrl).fail(() =>
   {
      console.error('Failed to load ' + monsterUrl);
   })
   .done(function(html)
   {
      /*Example:
         {
            General: {Kill: [], Capture: [], Hunt: []},
            Break: {tail: [], horn: [], horns: []},
            Sever: {tail: []},
            Investigation: {Bronze: [], Silver: [], Gold: [], Purple: []}
         }
         each one has {material: 'M Scale', itemCount: 1, probability: 0.05}
         Investigation.Purple won't be created for LR
         Break is populated only by parts found (including some tail)
         Sever is only for some tail and is deleted if empty
         Capture is only for validation and is deleted before done
      */
      monsterData[monsterName] =
         {
            'Low Rank': {General: {}, Break: {}, Sever: {}, Investigation: {}},
            'High Rank': {General: {}, Break: {}, Sever: {}, Investigation: {}},
            'Master Rank': {General: {}, Break: {}, Sever: {}, Investigation: {}}
         };
      const materialForRank = {
         'Low Rank': {},
         'High Rank': {},
         'Master Rank': {}
      };
      //partsPerRank is for validation
      const partsPerRank = {
         'Low Rank': {},
         'High Rank': {},
         'Master Rank': {}
      };
      const oldToNewStructure =
         {
            'Carves': {'Carves': {section: 'General', table: 'Kill'}, 'Tail Carved': {section: 'Sever', table: 'tail'}},
            //Carves: Carves is same as Rewards: Capture include both for validation
            'Rewards': {
               [`Capture ${monsterName}`]: {section: 'General', table: 'Capture'},
               [`Hunt ${monsterName}`]: {section: 'General', table: 'Hunt'}
            },
            //quest table not from this page
            'Investigations':
               {
                  'Investigation Reward (Bronze)': {section: 'Investigation', table: 'Bronze'},
                  'Investigation Reward (Silver)': {section: 'Investigation', table: 'Silver'},
                  'Investigation Reward (Gold)': {section: 'Investigation', table: 'Gold'},
                  'Investigation Reward (Purple)': {section: 'Investigation', table: 'Purple'}
               }
         };

      //delete unused structure
      if(!lowRankMonsters.includes(monsterName)) delete monsterData[monsterName]['Low Rank'];
      if(!highRankMonsters.includes(monsterName)) delete monsterData[monsterName]['High Rank'];
      /* MR presumably has all of them except Leshens and Zorah
       * the Leshens have empty MR so they will be deleted later */
      if('Zorah Magdaros' === monsterName) delete monsterData[monsterName]['Master Rank'];

      $(html, virtualDocument).find('h6').each((index, sectionSearch) =>
      {
         const sectionText = sectionSearch.textContent;
         //if not a section to keep then continue
         if(!oldToNewStructure[sectionText]) return;  //html looping sectionSearch

         const section = sectionSearch.nextElementSibling;
         $(section, virtualDocument).find('h6').each((index, rankSearch) =>
         {
            const rankText = rankSearch.textContent;
            //ignore empty cols
            if(!rankSearch.nextElementSibling) return;  //section looping rankSearch
            //if data exists where it shouldn't
            if('Nergigante' === monsterName && 'Low Rank' === rankText)
            {
               markBadData(`Manual Correction: no rewards at Low Rank`, monsterName);
               //ignore rank
               return;  //section looping rankSearch
            }
            if('Zorah Magdaros' === monsterName && 'Master Rank' === rankText)
            {
               //separate from below since this needs to be marked as manual
               markBadData(`Manual Correction: monster can't be fought at Master Rank`, monsterName);
               //ignore rank
               return;  //rankCol looping tableSearch
            }
            if(!monsterData[monsterName][rankText])
            {
               markBadData(`Wrong rank data: monster can't be fought at ${rankText}`, monsterName);
               //ignore rank
               return;  //section looping rankSearch
            }

            const rankCol = rankSearch.parentElement;
            //the table name is actually a td and not th
            $(rankCol, virtualDocument).find('td').each((index, tableSearch) =>
            {
               const tableText = tableSearch.textContent.trim();
               let thisPartName = undefined;
               //I suppose I could hard code all possible part names but startsWith works fine
               if(tableText.startsWith('Break ' + monsterName + '\'s '))
               {
                  //should already be lowercase but enforce it
                  thisPartName = tableText.substring(('Break ' + monsterName + '\'s ').length).toLowerCase();
               }
               //tail is covered as a normal table
               else if('Tail Carved' !== tableText && tableText.contains(' Carved'))
               {
                  console.error(`Assumption violation: can sever non tail of ${monsterName}`);
                  return;  //rankCol looping tableSearch
               }
               //if not a table to keep then continue
               else if(!oldToNewStructure[sectionText][tableText]) return;  //rankCol looping tableSearch
               else if('Zorah Magdaros' === monsterName && ['Carves', 'Capture Zorah Magdaros'].includes(tableText))
               {
                  markBadData(`Manual Correction: kill/capture doesn't apply`, monsterName);
                  //ignore table
                  return;  //rankCol looping tableSearch
               }
               //else parse it

               // td > tr > tbody > table
               const table = tableSearch.parentElement.parentElement.parentElement;

               let percentSum = 0;
               let dataLocation = undefined;
               const newStructure = oldToNewStructure[sectionText][tableText];
               //non-breaks including sever tail is handled here
               if(newStructure)
               {
                  if(noInvestigations.includes(monsterName) && 'Investigation' === newStructure.section)
                  {
                     markBadData(`Manual Correction: wrong Investigation`, monsterName);
                     //ignore this table
                     return;  //rankCol looping tableSearch
                  }
                  if(monsterData[monsterName][rankText][newStructure.section][newStructure.table])
                  {
                     //uses new table names so that it doesn't include monster name "Capture X"
                     markBadData(`Duplicate new table ${rankText} ${newStructure.section} > ${newStructure.table}`, monsterName);
                     //ignore this table (keeping the previous data)
                     return;  //rankCol looping tableSearch
                  }
                  if('Low Rank' === rankText && 'Investigation' === newStructure.section && 'Purple' === newStructure.table)
                  {
                     console.error(`Assumption violation: ${monsterName} has Low Rank Investigation > Purple`);
                     //ignore this table
                     return;  //rankCol looping tableSearch
                  }

                  dataLocation = monsterData[monsterName][rankText][newStructure.section][newStructure.table] = [];
               }
               //all breaks including break tail is handled here
               else if(thisPartName)
               {
                  if(['Kushala Daora', 'Teostra'].includes(monsterName) && 'forelimbs' === thisPartName)
                  {
                     markBadData('Manual Correction: wrong breakable part', monsterName);
                     //ignore this table (not a real breakable part)
                     return;  //rankCol looping tableSearch
                  }
                  if(monsterData[monsterName][rankText]['Break'][thisPartName])
                  {
                     //uses new table names so that it doesn't include monster name "Break X's head"
                     markBadData(`Duplicate new table ${rankText} Break > ${thisPartName}`, monsterName);
                     //ignore this table (keeping the previous data)
                     return;  //rankCol looping tableSearch
                  }

                  partsPerRank[rankText][thisPartName] = true;
                  dataLocation = monsterData[monsterName][rankText]['Break'][thisPartName] = [];
               }
               else
               {
                  //must stop because it would cause NPE
                  alert(`Programming bug: unmapped table: ${monsterName} ${rankText} ${sectionText} > ${tableText}`);
                  //throw in order to stop scrapeMonsterData instead of just the table
                  throw new Error(`Programming bug: unmapped table: ${monsterName} ${rankText} ${sectionText} > ${tableText}`);
               }

               const materialInTable = {};
               $(table, virtualDocument).find('span').each((index, materialSearch) =>
               {
                  let material = materialSearch.textContent;
                  const materialLink = materialSearch.parentElement;
                  let materialCount = 1;
                  if(null !== materialLink.nextSibling && 0 !== materialLink.nextSibling.textContent.trim().length)
                  {
                     materialCount = Number.parseInt(materialLink.nextSibling.textContent.replace(' x', ''));
                  }
                  const materialPercentElement = materialLink.parentElement.nextElementSibling.textContent;
                  const materialPercentNumber = Number.parseInt(materialPercentElement.replace('%', ''));
                  percentSum += materialPercentNumber;
                  const materialProbability = materialPercentNumber / 100;

                  if('Safi\'jiiva' === monsterName && 'Capture Safi\'jiiva' === tableText &&
                     'Safi\'jiiva Shard' === material && 22 === materialPercentNumber)
                  {
                     /* correcting this also would cause Kill/capture to match so that bad data doesn't trigger
                      * although it wouldn't trigger anyway since this is an Elder Dragon */
                     material = 'Safi\'jiiva Cortex';
                     markBadData('Manual Correction: wrong material', monsterName);
                  }
                  if(0 === materialCount)
                     console.error(`Assumption violation: ${monsterName} ${rankText} ` +
                        `${sectionText} > ${tableText} x0 material: ${material}`);
                  if(materialCount === materialInTable[material])
                     console.error(`Assumption violation: ${monsterName} ${rankText} ` +
                        `${sectionText} > ${tableText} duplicate material of same count: ${material} x${materialCount}`);

                  materialForRank[rankText][material] = true;
                  //store count for debugging since diff counts could be possible
                  materialInTable[material] = materialCount;

                  dataLocation.push({
                     material: material,
                     itemCount: materialCount,
                     probability: materialProbability
                  });
               });

               if(100 !== percentSum)
                  console.error(`Assumption violation: ${monsterName} ${rankText} ` +
                     `${sectionText} > ${tableText} doesn't add up to 100%`);
            });
         });
      });

      //true when a rank has 1 table but not all of them
      let partialRank = false;
      //have to wait for entire data because these are in different sections
      ['Low Rank', 'High Rank', 'Master Rank'].forEach(rank =>
      {
         /* If this rank might exist (non-LR) but has no data then delete rank.
          * LR is already deleted for non-LR monsters so they won't enter here.
          * Actual LR monsters shouldn't be missing everything.
          * HR/MR needs to validate Purple and the rest.
          * Therefore Purple doesn't need special handling. */
         if(monsterData[monsterName][rank] &&
            !hasTable(monsterName, rank, 'General', 'Kill') &&
            !hasTable(monsterName, rank, 'General', 'Capture') &&
            !hasTable(monsterName, rank, 'General', 'Hunt') &&
            0 === Object.keys(monsterData[monsterName][rank].Break).length &&
            !hasTable(monsterName, rank, 'Sever', 'tail') &&
            !hasTable(monsterName, rank, 'Investigation', 'Bronze') &&
            !hasTable(monsterName, rank, 'Investigation', 'Silver') &&
            !hasTable(monsterName, rank, 'Investigation', 'Gold') &&
            !hasTable(monsterName, rank, 'Investigation', 'Purple'))
         {
            delete monsterData[monsterName][rank];
         }

         //if monster still has this rank. don't connect with else since some ranks are already deleted
         if(monsterData[monsterName][rank])
         {
            /* If these 2 tables are different. Elders (including Zorah) can't be captured so ignore Capture table.
             * It's debatable if elders should have the same capture table or none so don't mark as invalid. */
            if(!elderDragons.includes(monsterName) &&
               JSON.stringify(monsterData[monsterName][rank].General.Kill) !==
               JSON.stringify(monsterData[monsterName][rank].General.Capture))
            {
               markBadData(`Kill/Capture tables don't match for ${rank}`, monsterName);
               //no action: keep kill and Capture is always deleted anyway to save space
            }
            delete monsterData[monsterName][rank].General.Capture;

            //tail is only possible sever if not there then delete sever
            if(!monsterData[monsterName][rank].Sever.tail)
               delete monsterData[monsterName][rank].Sever;
            //has Sever.tail
            else if(monsterData[monsterName][rank].Break.tail)
            {
               markBadData(`Break and sever tail at ${rank}`, monsterName);
               //assume that sever is correct
               delete monsterData[monsterName][rank].Break.tail;
            }

            /* make sure the rank has all the data. always check each table which is why the funct is first
             * and it can't be a single line. Capture is already deleted above.
             * already validated Break and Sever above. Zorah doesn't have kill. */
            if('Zorah Magdaros' !== monsterName)
               partialRank = requireTable(monsterName, rank, 'General', 'Kill') || partialRank;
            partialRank = requireTable(monsterName, rank, 'General', 'Hunt') || partialRank;

            if(!noInvestigations.includes(monsterName))
            {
               partialRank = requireTable(monsterName, rank, 'Investigation', 'Bronze') || partialRank;
               partialRank = requireTable(monsterName, rank, 'Investigation', 'Silver') || partialRank;
               partialRank = requireTable(monsterName, rank, 'Investigation', 'Gold') || partialRank;

               //Purple doesn't exist for LR but required for HR/MR
               if('Low Rank' !== rank)
                  partialRank = requireTable(monsterName, rank, 'Investigation', 'Purple') || partialRank;
            }

            //materialForRank is a set so the keys is everything
            const materialNames = Object.keys(materialForRank[rank]);
            materialNames.sort();
            monsterData[monsterName][rank].material = materialNames;
         }
      });

      //partial data shouldn't trigger this validation
      if(!partialRank)
      {
         if(monsterData[monsterName]['Low Rank'])
         {
            if(monsterData[monsterName]['High Rank'])
            {
               //partsPerRank is a set: every value is true. so doing Object.keys excludes no data but is less for JSON
               if(JSON.stringify(Object.keys(partsPerRank['Low Rank'])) !==
                  JSON.stringify(Object.keys(partsPerRank['High Rank'])))
                  console.error(`Assumption violation: ${monsterName} has different part breaks at low/high rank`);
               validateSever(monsterName, 'Low Rank', 'High Rank');
            }
            else console.error(`Assumption violation: ${monsterName} can be fought at low rank but not high rank`);

            if(monsterData[monsterName]['Master Rank'])
            {
               if(JSON.stringify(Object.keys(partsPerRank['Low Rank'])) !==
                  JSON.stringify(Object.keys(partsPerRank['Master Rank'])))
                  console.error(`Assumption violation: ${monsterName} has different part breaks at low/master rank`);
               validateSever(monsterName, 'Low Rank', 'Master Rank');
            }
            //Leshens aren't LR so they don't apply here. Zorah isn't MR
            else if('Zorah Magdaros' !== monsterName)
               console.error(`Assumption violation: ${monsterName} can be fought at low rank but not master rank`);
         }
         if(monsterData[monsterName]['High Rank'])
         {
            if(monsterData[monsterName]['Master Rank'])
            {
               if(JSON.stringify(Object.keys(partsPerRank['High Rank'])) !==
                  JSON.stringify(Object.keys(partsPerRank['Master Rank'])))
                  console.error(`Assumption violation: ${monsterName} has different part breaks at high/master rank`);
               validateSever(monsterName, 'High Rank', 'Master Rank');
            }
            //Leshens are event only and that event is only HR. Zorah is even more special
            else if(!['Ancient Leshen', 'Leshen', 'Zorah Magdaros'].includes(monsterName))
               console.error(`Assumption violation: ${monsterName} can be fought at high rank but not master rank`);
         }
      }

      console.log(monsterName + ' is done');
   });
}

function markBadData(message, monsterName)
{
   if(!badData[message]) badData[message] = [];
   //multiple offenses of the same type are ignored
   if(!badData[message].includes(monsterName)) badData[message].push(monsterName);
   if(!badData.monsters.includes(monsterName)) badData.monsters.push(monsterName);
}

function validateSever(monsterName, rank1, rank2)
{
   //!! converts them to boolean, !== is xor
   const oneMissing = !!monsterData[monsterName][rank1].Sever !== !!monsterData[monsterName][rank2].Sever;
   /* Truth table:
    * Both missing: !oneMissing => pass
    * One missing: oneMissing => violation
    * Both present: !oneMissing => pass */
   if(oneMissing)
      console.error(`Assumption violation: ${monsterName} has different tail sever at ${rank1}/${rank2}`);
}

function hasTable(monsterName, rank, sectionName, tableName)
{
   const exists = monsterData[monsterName][rank][sectionName][tableName];
   if(!exists) return false;

   const empty = (0 === monsterData[monsterName][rank][sectionName][tableName].length);
   if(!empty) return true;

   //there are no scenarios with empty tables but it's easy to check
   console.error(`Assumption violation: empty table: ${monsterName} ${rank} ${sectionName} > ${tableName}`);

   return false;
}

function requireTable(monsterName, rank, sectionName, tableName)
{
   if(!hasTable(monsterName, rank, sectionName, tableName))
   {
      //these are mark because all 6 tables currently happen
      markBadData(`Missing required new table ${rank} ${sectionName} > ${tableName}`, monsterName);
      delete monsterData[monsterName][rank][sectionName][tableName];
      return true;
   }
   return false;
}

function groomMonsterData()
{
   if(71 !== Object.keys(monsterData).length)
      console.error(`Missing large monsters. Current length: `, Object.keys(monsterData).length);
   verifyManualCorrection('wrong breakable part', ['Kushala Daora', 'Teostra']);
   verifyManualCorrection('wrong material', ['Safi\'jiiva']);
   verifyManualCorrection('wrong Investigation', noInvestigations);
   verifyManualCorrection('no rewards at Low Rank', ['Nergigante']);
   verifyManualCorrection('monster can\'t be fought at Master Rank', ['Zorah Magdaros']);
   verifyManualCorrection('kill/capture doesn\'t apply', ['Zorah Magdaros']);

   sortKeysAndLog(monsterData);
   sortKeysAndLog(badData);
}

function sortKeysAndLog(object)
{
   //sort by making a new object that has keys in alpha order
   const newData = {};
   const allMonsterNames = Object.keys(object);
   allMonsterNames.sort();
   allMonsterNames.forEach(monsterName =>
   {
      newData[monsterName] = object[monsterName];
   });
   console.log(JSON.stringify(newData));
}

function verifyManualCorrection(manualCorrectionName, expectedValue)
{
   const badDataName = 'Manual Correction: ' + manualCorrectionName;
   if(JSON.stringify(expectedValue.sort()) !== JSON.stringify(badData[badDataName].slice().sort()))
   {
      console.error(`Need to update: ${badDataName}. Current value: `, badData[badDataName]);
   }
}
