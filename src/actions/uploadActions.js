//China Mobile
export function onCM(data){
    console.log("onCM:",data)
    return {
        type: 'UPLOADCM',
        CMData:data
    }
}
//China Unicom
export function onCU(data){
    return {
        type: 'UPLOADCU',
        CUData:data
    }
}
//China Telecom
export function onCT(data){
    return {
        type: 'UPLOADCT',
        CTData:data
    }
}