#! /usr/bin/env node

var fs = require('fs'); 

function str2Coordinates(strCoor) {
    if(!strCoor) {
        throw new Error("Invalid coordinates");
    }

    const coorArray = strCoor.split(",");
    return {
        x: parseInt(coorArray[0]),
        y: parseInt(coorArray[1])
    }
}

function calculateParcels(swCoor, neCoor) {
    const parcels = []

    let i = swCoor.x
    while(i <= neCoor.x) {
        let j = swCoor.y
        while(j <= neCoor.y) {
            parcels.push(`${i},${j}`)
            j++
        }
        i++
    }

    return parcels;
}

function getParcels(swStrCoor, neStrCoor){
    const swCoor = str2Coordinates(swStrCoor)
    const neCoor = str2Coordinates(neStrCoor)
    const parcels = calculateParcels(swCoor, neCoor)
    return parcels
}

const swStrCoor= process.argv[2]
const neStrCoor= process.argv[3]

if(!swStrCoor || !neStrCoor){
    throw new Error("missing sw and ne coordinates")
}

const sceneJson = JSON.parse(fs.readFileSync('scene.json', 'utf8'));
const parcels = getParcels(swStrCoor, neStrCoor)
sceneJson.scene.parcels = parcels
sceneJson.scene.base = parcels[0]
fs.writeFile('scene.json', JSON.stringify(sceneJson, null, 2), 'utf8', ()=> {
    console.log("sabe")
});