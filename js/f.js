
let signupForm =document.getElementById('signupForm');
let signupName=document.getElementById('signupName');
let signupNameAlertError=document.getElementById('signupNameError');
let signupEmail=document.getElementById('signupEmail');
let  signupEmailAlertError=document.getElementById("signupEmailError");
let signupPassword=document.getElementById('signupPassword');
let  signupPasswordAlertError=document.getElementById("signupPasswordError");
let selectedInput=document.querySelectorAll('.selectedInput');
let description=document.getElementById('description');

let useserData;
// console.log(signupForm);
// console.log(login);
// console.log(signinPassword);
// console.log(signinEmail);
// console.log(signupName)
// console.log(signupEmail);
// console.log(signupPassword);
// console.log(description);

if(localStorage.getItem('data')==""){
    useserData=[] 
}
else{
    useserData =JSON.parse(localStorage.getItem('data'));

}

let regex={
  
    signupName:/^[a-z]{3,15}/,
    signupEmail:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    signupPassword:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    resetPass:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


}
for(let i=0;i<selectedInput.length;i++){
    selectedInput[i].addEventListener('input',function(){
        validation(this);
        description.classList.replace('d-block','d-none');
    });
 }
// signupName.addEventListener('input',function(){
//     validation(this);
//     description.classList.replace('d-block','d-none');
// });
// signupEmail.addEventListener('input',function(){
//     validation(this);
//     description.classList.replace('d-block','d-none');
// });
// signupPassword.addEventListener('input',function(){
//     validation(this);
//     description.classList.replace('d-block','d-none');
// })
function isUserExist(user){
    for(let i=0;i<useserData.length;i++){
        if(signupEmail.value!==useserData[i].userEmail&&signupPassword.value!==useserData[i].userPassword){
            return true;
        }
        else{
            return false;
        }


    }


}
signupForm?.addEventListener("submit",function (e){       //optional chaining or saftery
    e.preventDefault();//to prevent form from refresh default when submit

    console.log('hello');
    let user={
        userName:signupName.value,
        userEmail:signupEmail.value,
        userPassword:signupPassword.value,
    }
    if(validation(signupEmail) && validation(signupName) && validation(signupPassword)){
        if(isUserExist(user)){useserData.push(user); 
            saveToLocalStorage(useserData);
            console.log(user);
        console.log(useserData);
        console.log(JSON.parse(localStorage.getItem('data')));
        clearAll();
        description.classList.replace('d-none','d-block');
    }
    else{
        console.log('alert')
        description.innerText="E-mail already Exist"
        description.classList.replace('text-success','text-danger');
        description.classList.replace('d-none','d-block');
        removeIsValid(selectedInput);
    }
        
    }
   
    
});
function clearAll(){
    // signupName.value="";
    //   signupEmail.value='';
    //    signupPassword.value="";
    //    signupName.classList.remove('is-valid')
       for(let i=0;i<selectedInput.length;i++){
        selectedInput[i].value='';
        removeIsValid(selectedInput)
       }
    
}
function removeIsValid(selectedInput){
  
       for(let i=0;i<selectedInput.length;i++){
       
        selectedInput[i].classList.remove('is-valid');
       }
    
}
function saveToLocalStorage(arr){
    localStorage.setItem('data',JSON.stringify(arr));
    console.log('hello from local storage')
}
function validation(element){
   
if(regex[element.id].test(element.value)){
   element.classList.add("is-valid");
   element.classList.remove('is-invalid')  ;
   element.nextElementSibling.classList.replace("d-block","d-none")  ; 
   return true
}
else{

    element.classList.add("is-invalid");
    element.classList.remove('is-valid')  ; 
    element.nextElementSibling.classList.replace("d-none","d-block")  ;

}
}

/****************************************************************************************** */

/***********************login form ****************************************/
let signinEmail=document.getElementById('signinEmail');
let signinPassword=document.getElementById('signinPassword');
let login=document.getElementById('login');
let excptioninvalid=document.getElementById('excptioninvalid');
let logininput=document.querySelectorAll('.logininput');
var usernamex;
// console.log(signinEmail);
// console.log(login);
// console.log(signinPassword);
// console.log(logininput);
for(let i=0;i<logininput.length;i++){
    logininput[i].addEventListener('input',function(){
        
        excptioninvalid.classList.replace("d-block",'d-none')
    })

}
function isaAcountSignedUp()
{
    for(let i=0;i<useserData.length;i++)
        {
        if(signinEmail.value=="" ||  signinPassword.value==""){
           
            excptioninvalid.innerText="All inputs is required";
            excptioninvalid.classList.replace('d-none',"d-block");
            }
        else if(useserData[i].userEmail=== signinEmail.value &&
            useserData[i].userPassword===signinPassword.value)
            {
                // i=;
                usernamex=useserData[i].userName;
             console.log(`welcome ${useserData[i].userName}`);
             
                return true;
            }
            
        else if(useserData[i].userEmail!== signinEmail.value &&
        useserData[i].userPassword!==signinPassword.value){
            excptioninvalid.innerText="incorrect email or password!!!!!!!!!!!!";
            excptioninvalid.classList.replace('d-none',"d-block") ;
           
        }
        
    }
      

}

login?.addEventListener('submit',function(e){    //optional chainig(?.)tohandle multiple html files with one js file.
  e.preventDefault();
  console.log('hello logib')
    if(isaAcountSignedUp()){
       
        setTimeout(function(){
            
            window.location.href='../welcomepage.html';
        },1000)
       
    }
});

/***************************************welcome page************************* */
var usernameinwelcomepage=document.getElementById('username');

let logOutbtn=document.getElementById('logOut');
if( usernamex !==null) {
    usernameinwelcomepage.innerText=`Welcome ${usernamex }`;
    console.log(usernameinwelcomepage.innerText);
}
logOutbtn?.addEventListener('click',function(){
    localStorage.removeItem('userName');
    window.location.href='./signin.html'
})

