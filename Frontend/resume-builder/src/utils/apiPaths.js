export const BASE_URL = "http://localhost:3000";

export const API_PATHS= {
    AUTH:{
        REGISTER: "/api/auth/register",
        LOGIN : "/api/auth/login",
        GET_PROFILE : "/api/auth/profile",
    },
    RESUME:{
        CREATE:"/api/resume",
        GET_ALL_RESUME:"/api/resume",
        GET_BY_ID:(id)=>`/api/resume/:${id}`,
        UPDATE : (id)=>`/api/resume/:${id}`,
        DELETE : (id)=>`/api/resume/:${id}`,
        UPLOAD_IMAGE:(id)=>`/api/resume/:${id}/uploadimg`
    },

    IMAGE : {
        UPLOAD_IMAGE : "/api/auth/uploadimg"
    }
}

