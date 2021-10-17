import React from 'react';

// signature for writing monitoring tasks
export const writeM = (level, trial, duration, onTime, image, choice, addScreen, wrongAdd)=>{
    var entry = {
        Level: level,
        Action: "Monitoring",
        Trial: trial,
        "On Time": onTime,
        "Duration (ms)": duration,
        "Image Path": image,
        "Weapon Choice": choice,
        "Additional Screening": addScreen,
        "Wrong Selection": wrongAdd
    }
    return entry;
}

export const writeC = (level, trial, duration, image, choice, correct, currentCount, capacity) =>{
    var entry = {
        Level: level,
        Action: "Counting",
        Trial: trial,
        "Duration (ms)": duration,
        "Image Path": image,
        "Bin Choice": choice,
        "Correct Bin": correct,
        "Bin Count": currentCount,
        "Bin Capacity": capacity
    }
    return entry;
}
