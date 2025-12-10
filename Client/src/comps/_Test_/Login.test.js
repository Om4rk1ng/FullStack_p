import { screen,render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import configureStore from "redux-mock-store"
import { Provider } from "react-redux";




const store=configureStore([])



const thisStore=store({

TaskStore:{
    msg:'',
    usersActive:false
}

})
test("Login Test1",()=>{

const {container}=render(
    <Provider store={thisStore}>
<BrowserRouter>
<Login/>

</BrowserRouter>

    </Provider>



)



//Why imported BrowserRouter?
//inside the login.js file, we have useNavigate, since the render ONLY reads the Login.js file, it will read the useNavigate,
//But, the useNavigate ACTUALLY must look for a browserRouter. The App.js will run the login, which will enable the useNavigate
//To read the BrowserRouter


//The render will read useNavigate, but, render won't know where the BrowserRouter is, because it is running the login 
//in isolation(just the login code, NOT ANY OTHER code,).. That's why we need to provide a BrowserRouter here, so that the
// render will use useNavigate 


//SAME goes for store
expect(container).toMatchSnapshot()

})




test("CHECK TO SEE IF EMAIL BUTTON IS PRESENT FOR SUCCESSFULL ACCESS",()=>{

const {container}=render(
    <Provider store={thisStore}>
<BrowserRouter>
<Login/>

</BrowserRouter>

    </Provider>



)

screen.getByTestId('login_emailBox') //check if the email box exist
//any changes happen to login page, will fail the test
//MODIFIED



})