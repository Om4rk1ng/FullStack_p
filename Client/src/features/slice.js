import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import Axios from "axios"

const RegisterDataThunk=createAsyncThunk("http://localhost:3000/register",async(userData)=>{

const requestToPost=await Axios.post("http://localhost:3000",userData)

return(requestToPost.data)



})


const LoginThunk=createAsyncThunk("http://localhost:3000/login",async(userLoginData)=>{


const requestToPost=await Axios.post("http://localhost:3000/login",userLoginData)

return(requestToPost.data)


})


const showDataThunk=createAsyncThunk("http://localhost:3000/displayData",async()=>{

const requestToGetData=await Axios.get("http://localhost:3000/displayData")

return(requestToGetData.data)

})

const initialState={
    
    msg:null,
    userData:[],
    usersActive:null,
    loading:false,
}

const TaskTrackSlice=createSlice({

name:"Slice",
initialState:initialState,
reducers:{},

extraReducers:(builder)=>{


//Register_Thunk_Builder START
builder.addCase(RegisterDataThunk.fulfilled,(state,action)=>{

state.loading=false,
state.msg=action.payload.message

})




builder.addCase(RegisterDataThunk.pending,(state,action)=>{

state.loading=true,
state.msg="Please wait, data is being inserted!!"

})




builder.addCase(RegisterDataThunk.rejected,(state,action)=>{
state.loading=false,
state.msg="Something went wrong while inserting!!"

})

//Register_Thunk_Builder END



//Login_Thunk_Builder START

builder.addCase(LoginThunk.fulfilled,(state,action)=>{

    state.loading=false
    state.usersActive=action.payload.user
    state.msg=action.payload.message

})

builder.addCase(LoginThunk.pending,(state,action)=>{

    state.loading=true
    state.msg="Logging in, please wait......"

})



builder.addCase(LoginThunk.rejected,(state,action)=>{

    state.loading=false
    state.msg=action.payload.message

})



//Login_Thunk_Builder END



//Get_Thunk_Builder START

builder.addCase(showDataThunk.fulfilled,(state,action)=>{


state.loading=false,
state.userData=action.payload


})



builder.addCase(showDataThunk.pending,(state,action)=>{


state.loading=true

})


builder.addCase(showDataThunk.rejected,(state,action)=>{


state.loading=false,
state.msg="Error occured!!!!"


})


//Get_Thunk_Builder END




}


})

export default TaskTrackSlice.reducer