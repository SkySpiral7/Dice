function IronClawDamage(damageDicePool, defenderDicePool, areRollsSilent){
    if(!(damageDicePool instanceof DicePool)) throw new Error("IronClawDamage("+damageDicePool+", ~) the first parameter must be a DicePool type.");
    if(!(defenderDicePool instanceof DicePool)) throw new Error("IronClawDamage(~, "+defenderDicePool+", ~) the second parameter must be a DicePool type.");
    if(areRollsSilent!=false) areRollsSilent=true;  //silent default

    var damageEveryRoll=damageDicePool.roll();
    var defenderEveryRoll=defenderDicePool.roll();

    var output="";
    if(!areRollsSilent) output+="All Damage Rolls (before trimming): "+damageEveryRoll+"\nAll Defender Rolls (before trimming): "+defenderEveryRoll+"\n";
    IronClawEvenRolls(damageEveryRoll, defenderEveryRoll);

    //if highest roll is a 1 then it botched
   if (damageEveryRoll[0]==1)
   {
       if(!areRollsSilent) output+="All Defender Rolls (no padding): "+defenderEveryRoll+"\n";  //no damage to show
       return output+"Attacker Botched";
   }
    if(!areRollsSilent) output+="All Damage Rolls (after padding): "+damageEveryRoll+"\nAll Defender Rolls (after padding): "+defenderEveryRoll+"\n";

    var totalDamage=0;
   for (var i=0; i < damageEveryRoll.length; i++)
   {
       if(damageEveryRoll[i] >= defenderEveryRoll[i]+5) totalDamage+=2;
       else if(damageEveryRoll[i] > defenderEveryRoll[i]) totalDamage++;
   }
    if(defenderEveryRoll[0]==1){output+="Defender Botched, "; totalDamage++;}  //defender botched takes an extra point of damage
    output+="Damage Dealt: "+totalDamage;
    return output;
};
function IronClawEvenRolls(numberArray1, numberArray2){
    if(!(numberArray1 instanceof Array)) throw new Error("IronClawEvenRolls("+numberArray1+", ~) the first parameter must be an array type.");
    if(!(numberArray2 instanceof Array)) throw new Error("IronClawEvenRolls(~, "+numberArray2+") the second parameter must be an array type.");

    numberArray1.sort(alphaNumDescending);  //sort array. descending
    numberArray2.sort(alphaNumDescending);

    //remove every 1 from each
    while(numberArray1[numberArray1.length-1]==1) numberArray1.pop();  //checks if last element is a 1
    while(numberArray2[numberArray2.length-1]==1) numberArray2.pop();
    //to remove redundant 1s

    //pad with 1s so that each pool has the same number of dice
    while(numberArray1.length < numberArray2.length) numberArray1.push(1);
    while(numberArray1.length > numberArray2.length) numberArray2.push(1);
}
function IronClawOpposedRoll(attackerDicePool, defenderDicePool, areRollsSilent){
    if(!(attackerDicePool instanceof DicePool)) throw new Error("IronClawOpposedRoll("+attackerDicePool+", ~) the first parameter must be a DicePool type.");
    if(!(defenderDicePool instanceof DicePool)) throw new Error("IronClawOpposedRoll(~, "+defenderDicePool+", ~) the second parameter must be a DicePool type.");
    if(areRollsSilent!=false) areRollsSilent=true;  //default

    var myEveryRoll=attackerDicePool.roll();
    var yourEveryRoll=defenderDicePool.roll();

    var output="";
    if(!areRollsSilent) output+="All Attacker Rolls (before trimming): "+myEveryRoll+"\nAll Defender Rolls (before trimming): "+yourEveryRoll+"\n";
    IronClawEvenRolls(myEveryRoll, yourEveryRoll);

    //if best value is a 1 then botched
   if (myEveryRoll[0]==1)
   {
       if(!areRollsSilent) output+="All Defender Rolls (no padding): "+yourEveryRoll+"\n";  //there isn't anything for attacker to show
       output+="Attacker Botched";
       if(areRollsSilent) output+=". Highest Defender value: "+yourEveryRoll[0];
       return output;
   }
   if (yourEveryRoll[0]==1)
   {
       if(!areRollsSilent) output+="All Attacker Rolls (no padding): "+myEveryRoll+"\n";  //there isn't anything for defender to show
       output+="Defender Botched";
       if(areRollsSilent) output+=". Highest Attacker value: "+myEveryRoll[0];
       return output;
   }
    if(!areRollsSilent) output+="All Attacker Rolls (after padding): "+myEveryRoll+"\nAll Defender Rolls (after padding): "+yourEveryRoll+"\n";

   for (var i=0; i < myEveryRoll.length; i++)
   {
       if(!areRollsSilent) output+=myEveryRoll[i]+" vs "+yourEveryRoll[i]+": ";
       if(myEveryRoll[i] > yourEveryRoll[i]) return (output+"Attacker wins by "+(myEveryRoll[i]-yourEveryRoll[i])+" value");
       if(myEveryRoll[i] < yourEveryRoll[i]) return (output+"Attacker loses by "+(yourEveryRoll[i]-myEveryRoll[i])+" value");
       if(!areRollsSilent) output+="Tie\n";
   }
    return (output+"You tied");
};
function BattleTechAttackMech(targetNumber, attackType, sideOfRobot, areRollsSilent){
    if(typeof(targetNumber)!="number") throw new Error("BattleTechAttackMech, targetNumber ("+targetNumber+") must be a number type.");
    if(typeof(attackType)!="string") throw new Error("BattleTechAttackMech, attackType ("+attackType+") must be a string type.");
    attackType=attackType.trim();
    if(typeof(sideOfRobot)!="string") throw new Error("BattleTechAttackMech, sideOfRobot ("+sideOfRobot+") must be a string type.");
    sideOfRobot=sideOfRobot.trim();
    if(areRollsSilent!=false) areRollsSilent=true;  //silent default

    if(targetNumber > 12) return "Impossible";
    var tempRoll=silentRollDice("2d6");
    var output="";
    if(!areRollsSilent) output+="Attack roll: "+tempRoll+". ";
    if(tempRoll < targetNumber){output+="Miss"; return output;}

    var autoCrit=false;
    var hitSection="";
    if(sideOfRobot!="Left" && sideOfRobot!="Right" && sideOfRobot!="Center") throw new Error("BattleTechAttackMech. sideOfRobot syntax error. The choices are: \"Left\", \"Right\", or \"Center\".");
   if (attackType.startsWith("Missiles: "))
   {
       if(!(/^Missiles: \d+$/).test(attackType)) throw new Error("BattleTechAttackMech. attackType syntax error. Missiles must be in the form of \"Missiles: x\" where x is the number of missiles fired.");
       var misslesFired=Number((/\d+$/).exec(attackType)[0]);
       tempRoll=silentRollDice("2d6");
       if(!areRollsSilent) output+="Missiles Hit Roll: "+tempRoll+". ";
       var numberOfMisslesHit=BattleTechTables.missileArray[misslesFired][tempRoll];
       if(numberOfMisslesHit==undefined) throw new Error("BattleTechAttackMech. attackType has been given an invalid number of missiles that have been fired.");
       attackType="Weapon";  //use the standard weapon hit locations
       output+=numberOfMisslesHit+" Missiles hit, ";
   }
    output+="Hit Location: ";
   if (attackType=="Weapon")
   {
       tempRoll=silentRollDice("2d6");
       if(!areRollsSilent) output+="(Roll: "+tempRoll+") ";
       output+=BattleTechTables.robotHitLocations[sideOfRobot][tempRoll];
       autoCrit=output.endsWith("(critical)");  //true or false
   }
   else if (attackType=="Punch")
   {
       tempRoll=silentRollDice("1d6");
       if(!areRollsSilent) output+="(Roll: "+tempRoll+") ";
       output+=BattleTechTables.robotPunchLocations[sideOfRobot][tempRoll];
   }
   else if(attackType=="Kick")
   {
       if(sideOfRobot=="Center") output+=new Die("Left", "Right").roll();
       else output+=sideOfRobot;
       output+=" Leg";
   }
    else throw new Error("BattleTechAttackMech. attackType syntax error. The choices are: \"Missiles: x\" where x is the number of missiles fired, \"Punch\", \"Kick\", or \"Weapon\".");
    if(!output.contains("Head")) hitSection=(/^.*?(?:Left|Right|Center) (\w+)$/).exec(output)[1];  //if not head get word after side
    else hitSection="Head";

    var critCount=0;
    tempRoll=silentRollDice("2d6");
    if(!areRollsSilent) output+=". Critical Roll: "+tempRoll;
    if(tempRoll==12) critCount=3;  //lucky
    else if(tempRoll >= 10) critCount=2;
    else if(tempRoll >= 8 || autoCrit) critCount=1;
    if(critCount==3 && hitSection!="Torso") output+=".\n"+hitSection+" blown off";  //instead of number of criticals except torso which can't be blown off
    else if (!areRollsSilent || critCount > 0) output+=".\nNumber of Criticals "+critCount;
    if(!autoCrit && critCount > 0) output+=" (assuming you hit internal)";  //don't print if loud or autocrit. must hit internal for criticals to be rolled
    if(critCount > 0) output+=": "+BattleTechMechCriticals(critCount);
    return output;
};
function BattleTechMechCriticals(numberOfCriticalHits){
    if(typeof(numberOfCriticalHits)!="number") throw new Error("BattleTechMechCriticals, numberOfCriticalHits ("+numberOfCriticalHits+") must be a number type.");
    if(numberOfCriticalHits <= 0) return "No critical hit locations were rolled";
    if(numberOfCriticalHits >= 24) return "All of them";  //to prevent getting stuck in the loop
    var hitArray=[];
   while (numberOfCriticalHits > 0)
   {
       var thisRow=new Die("Upper ", "Lower ").roll();
       thisRow+=silentRollDice("2d6");
       if(!hitArray.contains(thisRow)){hitArray.push(thisRow); numberOfCriticalHits--;}
       //else loop back and roll again
   }
    hitArray.sort(alphaNumAscending);  //sorted alphabetically making "Upper 12" come before "Upper 6"
    var output=hitArray+'';
    output=output.replace(/,/g, "; ");
    return output;
};
var BattleTechTables={};  //must exist to hold the tables
BattleTechTables.robotHitLocations={  //the first 2 are undefined because you can't roll 0 or 1 on 2d6. like this so that you can give it exactly what you rolled
    Left: [undefined, undefined, "Left Torso (critical)", "Left Leg", "Left Arm", "Left Arm", "Left Leg", "Left Torso", "Center Torso", "Right Torso", "Right Arm", "Right Leg", "Head"],
    Center: [undefined, undefined, "Center Torso (critical)", "Right Arm", "Right Arm", "Right Leg", "Right Torso", "Center Torso", "Left Torso", "Left Leg", "Left Arm", "Left Arm", "Head"],
    Right: [undefined, undefined, "Right Torso (critical)", "Right Leg", "Right Arm", "Right Arm", "Right Leg", "Right Torso", "Center Torso", "Left Torso", "Left Arm", "Left Leg", "Head"]
};
BattleTechTables.robotPunchLocations={  //the first is undefined because you can't roll 0 on 1d6. like this so that you can give it exactly what you rolled
    Left: [undefined, "Left Torso", "Left Torso", "Center Torso", "Left Arm", "Left Arm", "Head"],
    Center: [undefined, "Left Arm", "Left Torso", "Center Torso", "Right Torso", "Right Arm", "Head"],
    Right: [undefined, "Right Torso", "Right Torso", "Center Torso", "Right Arm", "Right Arm", "Head"]
};
BattleTechTables.missileArray=[
    undefined,  //0. you can't fire these number of missiles. but need to be accounted for due to being an array
    undefined,  //1. are undefined so that you can put in exactly how many you fired
    //some are undefined so that you can put in exactly what you rolled since you can't roll 0 or 1 on 2d6
    /*2*/ [undefined, undefined, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    /*3*/ [undefined, undefined, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3],
    /*4*/ [undefined, undefined, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4],
    /*5*/ [undefined, undefined, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5],
    /*6*/ [undefined, undefined, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6],
    /*7*/ undefined,
    /*8*/ undefined,
    /*9*/ [undefined, undefined, 3, 3, 4, 5, 5, 5, 5, 7, 7, 9, 9],
    /*10*/ [undefined, undefined, 3, 3, 4, 6, 6, 6, 6, 8, 8, 10, 10],
    /*11*/ undefined,
    /*12*/ [undefined, undefined, 4, 4, 5, 8, 8, 8, 8, 10, 10, 12, 12],
    /*13*/ undefined,
    /*14*/ undefined,
    /*15*/ [undefined, undefined, 5, 5, 6, 9, 9, 9, 9, 12, 12, 15, 15],
    /*16*/ undefined,
    /*17*/ undefined,
    /*18*/ undefined,
    /*19*/ undefined,
    /*20*/ [undefined, undefined, 6, 6, 9, 12, 12, 12, 12, 16, 16, 20, 20]
];
