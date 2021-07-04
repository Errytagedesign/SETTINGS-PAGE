let uploadInp = document.getElementById('uploadBtn');
let profileImage = document.getElementById('uploadprofileimage');
let removeUser = document.getElementById('removeprofileimage').style.visibility = "hidden";
let btn = document.getElementById('removeBtn')

uploadInp.addEventListener('change', function(){

    
    submit();

    
    if( this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/jpg'  
        && this.files[0].type != 'image/png' && this.files[0].type != 'image/gif' ){

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please upload a picture in this format jpg, jpeg, png or gif',
               
              })
        
        } else {
            
            
            profileImage.src = URL.createObjectURL(this.files[0]);

        }

            
       
});


const submit = async (req, res) =>{

    const query = 'https://stocka-demo.herokuapp.com/api/v1/profile/image/upload/60d3a66941cf7268fa401340';
    let formData = {};
    formData.uploadprofileimage = document.querySelector("#uploadprofileimage").value;
    
    console.log(formData)


    await axios  
    
    .put ( query, formData)
    
    .then((response)  => {       

        Swal.fire(
            'Congratulations!!!',
            'Registration succesful!',
            'success'
          )

        // console.log(response);

    })

    .catch((error) =>{


        Swal.fire('Oops...', error.message, 'error')
        // console.log(error)
    })

};


//  Create function to remove the profile when image when user clicked on the "remove button"
removeBtn.addEventListener('click', function(){

   document.getElementById('removeprofileimage').style.visibility = "visible";

    console.log(removeUser);

});


const editNameBtn = document.getElementById("nameBtn");
const editPasswordBtn = document.getElementById("passwordBtn");
const editWithdrawBtn = document.getElementById("withdrawBtn");


editNameBtn.addEventListener('click', function(){

    document.getElementById("firstname").disabled = false;
    document.getElementById("lastname").disabled = false;
    document.getElementById("phone").disabled = false;
    document.getElementById("email").disabled = false;

    editNameBtn.textContent = "save";

    if( editNameBtn.textContent === "save"){

        this.addEventListener('click', async function(){

          if(firstname.value === "" && lastname.value === "" && phone.value === "" && email.value === ""){

            Swal.fire(
                'error',
                'Field can\'t be empty',
                'error'
            )

          } 
          
          if(firstname.value === ''){

            await setErrorFor(firstname, 'Name cannot be blank');
    
            
        } else {
    
            await setSuccessFor(firstname);
    
        }
    
        if(lastname.value === ''){
    
        await setErrorFor(lastname, 'Name cannot be blank');
        } else {
    
            await setSuccessFor(lastname);
    
        }
    
        if(phone.value === ''){
    
    
         await setErrorFor(phone, 'Number cannot be blank');
        } else {
    
         await setSuccessFor(phone);
        }
    
        if(email.value === ''){
    
    
         await setErrorFor(email, 'Email cannot be blank');
        } else if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              email
            )
          ) {
              await setSuccessFor(email, "Email is not correctly formatted eg example@company.com");
    
          }  else  {

            const query = 'https://stocka-demo.herokuapp.com/api/v1/profile/edit/60d3a315ede5586232cb4dcb';

            let formData = {};
            formData.firstname = document.querySelector("#firstname").value;
            formData.lastname = document.querySelector("#lastname").value;
            formData.phone = document.querySelector("#phone").value;
            formData.email = document.querySelector("#email").value;

            await axios  
                
                .put ( query, formData)
                
                .then((response)  => {       

                    Swal.fire(
                        'Congratulations!!!',
                        'Information update is succesful!',
                        'success'
                    )

                    // console.log(response);

                })

                .catch((error) =>{


                    Swal.fire('Oops...', error.message, 'error')
                    // console.log(error)
                })

          }

            
                
            });


                } 
                // else {
                    
                //     editNameBtn.textContent = "Edit";
                //     document.getElementById("firstname").disabled = true;
                //     document.getElementById("lastname").disabled = true;
                //     document.getElementById("phone").disabled = true;
                //     document.getElementById("email").disabled = true;
                
                // }

    
});




// declaring checkinput function

// async function checkInput()  {

//     const firstnameValue = firstname.value
//     const lastNameValue = lastname.value
//     const phoneValue  = phone.value
//     const emailValue = email.value
//     // const passwordValue = password.value
//     // const conPasswordValue = confirmPassword.value

    
    

    

//     if(passwordValue === ''){


//      await setErrorFor(password, 'Password cannot be blank');

//     } 
//     else if(passwordValue.length <6 ){


//      await setErrorFor(password, 'Password is less than 8 characters')
//     } else {

//      await setSuccessFor(password);

//     }

//     if(conPasswordValue === ''){


//      await setErrorFor(confirmPassword, 'Password cannot be blank')


//     } else if(passwordValue < conPasswordValue || passwordValue !== conPasswordValue){


//      await setErrorFor(confirmPassword, 'Password does not match')
        
//     } else {

//      await setSuccessFor(confirmPassword);
//     } 

    
    
// };



// declaring input and sucess or error message function

function setErrorFor(input, message){

        const formContainer = input.parentElement;
        const small = formContainer.querySelector('small');
        
        // add error message
        formContainer.className = 'form-container error';
        small.innerText = message;  
            
      
    };


function setSuccessFor(input){
        const formContainer = input.parentElement;
        formContainer.className = 'form-container success' 
                 
    };

