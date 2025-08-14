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
const forgotPasswordModal = document.getElementById
    ('forgot-password-modal');
const closeModal = document.querySelector('.close-modal');
const toast = document.getElementById('toast');
const resetPasswordForm = document.getElementById
    ('reset-password-form');
const toastMessage = document.getElementById('toast-message');

//Event listeners
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
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
        .then((userCredential) => {
            //update user profile with name
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            showToast('Account created successfully', 'success');
            signupForm.reset();
            container.classList.remove('right-panel-active');
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
});

//Sign In
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            showToast('Logged in successfully!!', 'success');
            loginForm.reset();
            //redirect to dashboard 
            window.location.href = 'dashboard.html'
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
});

function showToast(message, type) {
    toastMessage.textContent = message;
    toast.className = 'toast show'

    if (type) {
        toast.classList.add(type);
    }

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
        if (type) {
            toast.classList.remove(type);
        }
    }, 3000);
}

//reset password
resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = resetPasswordForm['reset-email'].value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            showToast('Password reset email sent!', 
                'success');
            resetPasswordForm.reset();
            forgotPasswordModal.style.display = 'none';
        })
        .catch((error) => {
            showToast(error.message, 'error');
        });
});

//atuth state obeserver
// auth.onAuthStateChanged((user) => {
//     if (user) {
//         //user is signed in
//         window.location.href = 'dashboard.html';
//     } else {
//         //user is signed out
//         window.location.href = 'index.html';
//     }
// });