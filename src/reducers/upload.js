const initialState = {
    CMData:{},
    CUData:{},
    CTData:{}
}

const upload = (state=initialState,action) => {
    console.log("action.CMData:",action.CMData)
    switch(action.type){
        case 'UPLOADCM':
            console.log(state)
            return {
                CMData:action.CMData,
                CUData:state.CUData,
                CTData:state.CTData
            };
        case 'UPLOADCU':
            return {
                CMData:state.CMData,
                CUData:action.CUData,
                CTData:state.CTData
            }
        case 'UPLOADCT':
            return {
                CMData:state.CMData,
                CUData:state.CUData,
                CTData:action.CTData
            }
        default:
            return state
    }
}

export default upload