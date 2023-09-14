const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {//no. of variables in each reel/column which will be randomly selected..
    A:2,
    B:4,
    C:6,
    D:8,
}

const SYMBOL_VALUES = {//lines of variables accordingly their bet multipliers..
    A:5,
    B:4,
    C:3,
    D:2
}

const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);
    if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("Invalid amount")
    }
    else{
        return numberDepositAmount;
    }}
}

const getNumberOfLines = () => {
    while(true){
    const lines = prompt("Enter no. of lines to bet(1-3): ");
    const numberOfLines = parseFloat(lines);
    if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>=4){
        console.log("Invalid number")
    }
    else{
        return numberOfLines;
    }}
}

const getBet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the bet per line:");
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet) || numberBet<=0 || numberBet>(balance/lines)){
            console.log("Invalid amount");
        }
        else {
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels=[[],[],[]];
    for(let i=0;i<COLS;i++){
        // reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}

const transpose = (reels) =>{
    const rows = [];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString="";
        for(const [i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString += '|';
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows,bet,lines) => {
    let winnings = 0;

    for(let i=0;i<lines;i++){
        const symbols = rows[i];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol!=symbols[0])
            { 
            allSame=false;
            break;
            }
        }
        if(allSame)
            winnings+=bet*SYMBOL_VALUES[symbols[0]];
    }
    return winnings;
}

const game = () => {
    let balance = deposit();

    while(true){
    console.log("You have a balance of..$"+balance)
    const numberoflines = getNumberOfLines();
    const bet = getBet(balance,numberoflines);
    balance-=bet*numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows,bet,numberoflines);
    balance+=winnings;
    console.log(`Congrats..!You won ${winnings}`);
    
    if(balance<=0){
        console.log("You have ran out of money..!");
        break;
    }
    const playAgain = prompt("Do you want to play again..(y/n)?")
    if(playAgain!='y')break;
    }
}
game();


