function changeCamelCaseToUnderscore(tst, spltr) {
    let len = tst.length;
    let newTst = "";
    for (let i = 0; i < len; i++) {
        if (tst[i] === tst[i].toUpperCase()) {
            newTst += spltr;
            newTst += tst[i].toLowerCase();
            continue;
        }

        newTst += tst[i];
    }

    return newTst;
}

function changeUnderscoreToCamelCase(tst, spltr) {
    let len = tst.length;
    let newTst = "";
    for (let i = 0; i < len; i++) {
        if (tst[i] === spltr) {
            newTst += tst[i + 1].toUpperCase();
            i++;
            continue;
        }

        newTst += tst[i];
    }

    return newTst;
}

// console.log(changeCamelCaseToUnderscore("muthuVelNatarajan", "-"));
console.log(changeUnderscoreToCamelCase("muthu-vel_natarajan", "_"));