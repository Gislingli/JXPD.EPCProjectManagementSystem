import { GetProjectCount } from '@/services/workplace';

export default {
    namespace:'workplace',
    state:{
        projectCount:10
    },
    effect:{
        *fetch({payload},{call,put}){
            debugger;
            const response=yield call(GetProjectCount,payload);
            yield put({
                type:'queryProjectCount',
                payload:response
            });
        },
    },
    reducers:{
        queryProjectCount(state,action){
            return{
                ...state,
                projectCount:action.payload,
            };
        },
    },
    
};