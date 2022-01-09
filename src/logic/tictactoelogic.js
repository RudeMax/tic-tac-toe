export function getMove(currentP1moves, currentP2moves){
    // console.log('currentP1moves >>> ', currentP1moves);
    // console.log('currentP2moves >>> ', currentP2moves);

    const coordMap ={
        '0': 'd11',
        '1': 'd12',
        '2': 'd13',
        '3': 'd21',
        '4': 'd22',
        '5': 'd23',
        '6': 'd31',
        '7': 'd32',
        '8': 'd33',
    }

    let currentTableState = {
        'd11': null,
        'd12': null,
        'd13': null,
        'd21': null,
        'd22': null,
        'd23': null,
        'd31': null,
        'd32': null,
        'd33': null,
    };

    currentP1moves.forEach(coordIdx => {
        currentTableState[coordMap[coordIdx]] = "x"
    });

    currentP2moves.forEach(coordIdx => {
        currentTableState[coordMap[coordIdx]] = "o"
    });

    // console.log('currentTableState >>> ', currentTableState);
    // console.log('checkDoubles(0, currentTableState) >>> ', checkDoubles("o", currentTableState));
    // console.log('checkDoubles(1, currentTableState) >>> ', checkDoubles("x", currentTableState));

    if( checkDoubles("o", currentTableState) === false ){
        if ( checkDoubles("x", currentTableState) === false ){
            if ( currentTableState["d22"] === null ){
                return Object.keys(coordMap).find(key => coordMap[key] === 'd22'); 
            }
            else{
                let rndPos = getRndEmptyPosition(currentTableState);
                // console.log('getRndEmptyPosition(currentTableState)', rndPos );
                return Object.keys(coordMap).find(key => coordMap[key] === rndPos); 
            }
        }
        else{
            return Object.keys(coordMap).find(key => coordMap[key] === checkDoubles("x", currentTableState));
        }
    } else{
        return Object.keys(coordMap).find(key => coordMap[key] === checkDoubles("o", currentTableState)); 
    }

    
}

function checkDoubles(symbolToCheck, matrix){
    for (let cellColumn = 1; cellColumn <= 3; cellColumn++) {

        let sumOfXbyColumn          = 0;
        let countEmptyCellColumn    = 0;
        let coordEmptyCellColumn    = '';
        let columnbreak             = false;
    
        let sumOfXbyRow             = 0;
        let countEmptyCellRow       = 0;
        let coordEmptyCellRow       = '';
        let rowbreak                = false;
        

            for (let cellRow = 1; cellRow <= 3; cellRow++) {

                let cellIdRow = 'd'+cellColumn+cellRow;
                let cellIdColumn = 'd'+cellRow+cellColumn;

                if( matrix[cellIdRow] === null && !rowbreak ){
                    if ( (++countEmptyCellRow) > 1 ) {
                        rowbreak = !rowbreak;
                    }
                    else coordEmptyCellRow = cellIdRow;
                }
                
                if( matrix[cellIdRow] === symbolToCheck && !rowbreak ){
                    
                    if ((++sumOfXbyRow) > 1){
                        coordEmptyCellRow = (coordEmptyCellRow === '') ? 'd'+cellColumn+(cellRow+1) : coordEmptyCellRow;
                        if (matrix[coordEmptyCellRow] === null){
                            return coordEmptyCellRow;
                        }
                    }
                }


                if( matrix[cellIdColumn] === null && !columnbreak ){
                    if ( (++countEmptyCellColumn) > 1 ) {
                        columnbreak = !columnbreak;
                    }
                    else coordEmptyCellColumn = cellIdColumn;
                }

                if( matrix[cellIdColumn] === symbolToCheck && !columnbreak ){
                    if ((++sumOfXbyColumn) > 1){
                        coordEmptyCellColumn = (coordEmptyCellColumn === '') ? 'd'+(cellRow+1)+cellColumn : coordEmptyCellColumn;
                        if (matrix[coordEmptyCellColumn] === null){
                            return coordEmptyCellColumn;
                        }    
                    }
                }
            }
    }

    if( (matrix["d11"] === symbolToCheck && matrix["d33"] === symbolToCheck) ||
        (matrix["d31"] === symbolToCheck && matrix["d13"] === symbolToCheck)){
            if ( matrix["d22"] === null ){
                return "d22";
            }
        }
    if( (matrix["d11"] === symbolToCheck && matrix["d22"] === symbolToCheck) ){
        if ( matrix["d33"] === null ){
            return "d33";
        }    
    }    
    if( (matrix["d22"] === symbolToCheck && matrix["d33"] === symbolToCheck) ){
        if ( matrix["d11"] === null ){
            return "d11";
        }    
    }  
    if( (matrix["d13"] === symbolToCheck && matrix["d22"] === symbolToCheck) ){
        if ( matrix["d31"] === null ){
            return "d31";
        }    
    }  
    if( (matrix["d31"] === symbolToCheck && matrix["d22"] === symbolToCheck) ){
        if ( matrix["d13"] === null ){
            return "d13";
        }    
    }  

    return false;
}

function getRndEmptyPosition(matrix) {
    let obj = Object.keys(matrix).filter(key => matrix[key] === null)
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}