function name(scores) {
    let max = 0;
    let min = 0;
    let highest = scores[0];
    let lowest = scores[0];
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > highest) {
            max++
            highest = scores[i];
        } else if (scores[i] < lowest) {
            min++
            lowest = scores[i];
        }
    }
    console.log(`max:${max}, min:${min}`)
}

name([1,5,9,3])