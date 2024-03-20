
//-------------------Redistration App.jss----------------------------------------//


// Get the registration form element
const registrationForm = document.getElementById('registrationForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordMatchError = document.getElementById('passwordMatchError');


// Add an event listener to the registration form
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    function validateName(name) {
        return name.trim() !== '';
    }

    function validateEmail(email) {
        // Add your email validation logic here
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return password.trim() !== '';
    }
    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
    
        if (password !== confirmPassword) {
            passwordMatchError.textContent = 'Passwords do not match';
            return false;
        } else {
            passwordMatchError.textContent = ''; // Clear the validation message
            return true;
        }
    }


    // Get values from form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const role = document.getElementById('role').value; // Get the role from the hidden input field

    



    
    if (!validateName(name)) {
        alert('Please Enter Your Name.');
        return;
    }
    
if (!validateEmail(email)) {
    alert('Please enter a valid E-mail Address.');
    return;
}
    if (!validatePassword(password)) {
        alert('Please Enter Your Password.');
        return;
    }
    if (!validatePassword()) {
        return;
    }


    
    try {
        const response = await fetch('http://localhost:8080/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
                password,
                role, // Include the role in the JSON data
            }),
        });

        if (response.ok) {
            alert('User registered successfully.');
            // window.location.href = 'Login.html';
        } else {
            alert('Error registering user.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while registering user.');
    }
});



//-------------------Login App.jss----------------------------------------//



function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email.trim() === '' || password.trim() === '') {
        alert('Please enter both E-mail and Password.');
        return;
    }

    const credentials = {
        email: email,
        password: password
    };

    // Sending a POST request to the Spring Boot API
    fetch('http://localhost:8080/api/v1/signing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Store the token in localStorage or sessionStorage
            localStorage.setItem('token', data.token);

            // Redirect the user to the appropriate page based on their role
            if (data.role === 'USER') {
                alert('Login successful User '+ data.name);
                window.location.href = 'user.html';
            } 
            else if (data.role === 'ADMIN'){
                alert('Login successful Admin '+ data.name);
                window.location.href = 'admin.html';
            }
            else if (data.role === 'TECHNICIAN'){
                alert('Login successful technician '+ data.name);
                window.location.href = 'technician.html';
            }
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
}


        // Add a click event listener to the anchor
        document.getElementById("logoutLink").addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default behavior of anchor (following the link)

            // Send a POST request to the backend's logout endpoint
            fetch("http://localhost:8080/api/v1/logout", {
                method: "POST",
                credentials: "same-origin", // Include credentials (cookies) in the request
            })
            .then(function (response) {
                if (response.ok) {
                    // Redirect to a login page or perform any other actions upon successful logout
                    window.location.href = "Login.html"; // Redirect to the login page
                } else {
                    console.error("Logout failed");
                }
            })
            .catch(function (error) {
                console.error("Error during logout:", error);
            });
        });






