//firebase configurations
const firebaseConfig = {
    apiKey: "AIzaSyATW6g-2Aeb-VBnzhTzRwW8QEixaOY2gvQ",
    authDomain: "auth-app-f3244.firebaseapp.com",
    projectId: "auth-app-f3244",
    storageBucket: "auth-app-f3244.firebasestorage.app",
    messagingSenderId: "747303959324",
    appId: "1:747303959324:web:cb8bddccfb54ca48c298d9"
};

//initialize firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//DOM elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const forgotPasswordLink = document.getElementById('forget-password');

//Event listeners
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault() //stop form submitting
    
    //sign up process
    const name = signupForm['signup-name'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const confirmPassword = signupForm['signup-confirm-password'].value;

    //validate password match
    if (password !== confirmPassword) {
        console.log('Password do not match');
        return;
    }

    //create user with firebase auth
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential)=>{
        //update user profile with name
        return userCredential.user.updateProfile({
            displayName: name
        });
    })
    .then(()=>{
        console.log('Account created successfully');
        signupForm.reset();
        container.classList.remove('right-panel-active');
    })
    .catch((error)=>{
        console.log(`Error: ${error.message}`);
    });
});