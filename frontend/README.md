# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.












































<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>STROMNET Hotspot Template - Index</title>
<script src="tailwind.js"></script>
<script src="sweetalert2js.js"></script>
<style>
    .call-icon {
        font-size: 3rem; /* Adjust the size of the icon */
        color: #25D366; /* You can change this to your preferred color */
        border-radius: 40%;
        padding: 15px;
        transition: transform 0.3s ease;
    }
    .call-icon:hover {
        transform: scale(1.1);
    }
</style>
</head>
<body class="font-sans antialiased text-gray-900">
    <!-- Sticky Header -->
    <header class="bg-indigo-900 text-white fixed w-full z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div class="flex items-center justify-between h-16">
                <!-- Logo and title area -->
                <div class="flex items-center">
                    <img src="logo.png" alt="Your Company Logo" class="h-8 w-8 mr-2">
                    <h1 class="text-xl font-bold">STROMNET</h1>
                </div>
                <!-- Navigation Links and Contact Number -->
                <div class="block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#alreadyHavePackage" class="text-indigo-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Already Paid? Click Here.</a>
                        <span class="text-indigo-200">0798701885</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Main content -->
    <main class="pt-24">
        <section class="bg-white">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <!-- Top Advert Banner -->
    <div class="flex justify-center items-center mb-6">
        <img src="advert.png" alt="Advert Banner" class="w-full max-w-2xl object-cover" style="height: auto;" />
    </div>
                <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Why roll with the small fries? Speed Matters! We provide fast, affordable and reliable Internet. Get connected today!📞0798701885</h2>
                <!-- Pricing Section -->
                <div class="mt-10">
                    <div class="text-center">
                        <h3 class="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-3xl sm:leading-9">
                            CHECK OUR PRICING
                        </h3>
                        <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
                            Choose a plan that fits your needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
<div class="mt-10 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
2HRS [20MBPS] NORMAL SPEED
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
5
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">2 Hrs Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="429" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
7HRS [20MBPS] NORMAL SPEED
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
9
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">7 Hrs Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="430" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
12hrs [20MBPS] NORMAL SPEED
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
15
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">12 Hrs Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="431" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
1 day [20MBPS] NORMAL SPEED
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
20
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">1 Days Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="432" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
2Days [7MBPS] NORMAL SPEED
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
40
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">2 Days Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="433" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
1week  [7MBPS] NORMAL SPEED {UNLIMITED}
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
120
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">7 Days Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="434" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
12hrs 100MBPS Streaming and Downloads
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
25
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">12 Hrs Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="435" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
1day 100MBPS Streaming and Downloads
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
35
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">24 Hrs Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="436" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
1mon [20MBPS] NORMAL SPEED {UNLIMITED}
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
499
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">30 Days Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="595" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
    <div class="flex flex-col rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
        <div class="px-4 py-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-center">
            <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-800 text-blue-50">
4Days 20MBPS NORMAL SPEED Unlimited
            </span>
            <div class="mt-4 text-4xl leading-none font-extrabold text-blue-800">
                <span class="text-lg font-medium text-blue-600">ksh</span>
99
            </div>
            <p class="mt-2 text-md leading-5 text-blue-700 text-center">4 Days Unlimited</p>
        </div>
        <div class="px-4 pt-4 pb-6 bg-blue-500 text-center">
            <a href="#" class="inline-block text-blue-800 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-150 ease-in-out rounded-lg font-semibold px-3 py-2 text-xs shadow-lg cursor-pointer"
               onclick="handlePhoneNumberSubmission(this.getAttribute('data-plan-id'), this.getAttribute('data-router-id')); return false;" data-plan-id="596" data-router-id="11">
                Click Here To Connect
            </a>
        </div>
    </div>
</div>
<div id="alreadyHavePackage" class="container mx-auto px-4">
    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div class="md:flex">
            <div class="w-full p-5">
                <div class="text-center">
                    <h3 class="text-2xl text-gray-900">Already Have an Active Package?</h3>
                </div>
                <form id="loginForm" class="form" name="login" action="http://stromnet.com/login" method="post" >
                    <input type="hidden" name="dst" value="http://beautifulclearfreshsunrise.neverssl.com/online" />
                    <input type="hidden" name="popup" value="true" />
                    <input type="hidden" name="mac" value="AC:7B:A1:AF:42:A4" />
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                        <input id="usernameInput" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" value="" placeholder="Username">
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                        <input id="passwordInput" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************">
                    </div>
                    <div class="flex items-center justify-between">
                        <button id="submitBtn" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Click Here To Connect
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Mpesa Code Section -->
<div id="mpesaCodeSection" class="container mx-auto px-4 mt-8">
    <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div class="md:flex">
            <div class="w-full p-5">
                <div class="text-center">
                    <h3 class="text-2xl text-gray-900">Enter Your Mpesa Message</h3>
                </div>
                <form id="mpesaCodeForm">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="mpesa_code">Mpesa Message</label>
                        <textarea id="mpesaCodeInput" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="mpesa_code" rows="4" placeholder="Enter your full Mpesa message"></textarea>
                    </div>
                    <div class="flex items-center justify-between">
                        <button id="mpesaCodeSubmitBtn" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Submit Mpesa Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    // Suppose we store the current router ID in localStorage when a user selects a plan
    // or if you only have a single router, we can fallback to a router ID from the database:
    var routerId = localStorage.getItem('currentRouterId') || '11';

    document.getElementById('mpesaCodeSubmitBtn').addEventListener('click', function(event) {
        event.preventDefault();

        var mpesaMessage = document.getElementById('mpesaCodeInput').value.trim();
        if (mpesaMessage === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter the Mpesa message.'
            });
            return;
        }

        Swal.fire({
            title: 'Processing Mpesa Message',
            text: 'Please wait while we verify your transaction...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // 1) Send AJAX request to mpesacode.php
        fetch('https://stromnet.ispledger.com/system/mpesacode.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mpesa_code: mpesaMessage,
                router_id: routerId  // pass the router ID
            }),
        })
        .then(response => response.json())
        .then(data => {
            Swal.close();

            if (data.status === 'success') {
                // The transaction belongs to this router => log in
                var username = data.username;
                Swal.fire({
                    icon: 'success',
                    title: 'Transaction Verified',
                    text: 'Logging you in automatically...',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    // Autofill the login form
                    document.getElementById('usernameInput').value = username;
                    document.getElementById('passwordInput').value = '1234';

                    // Optionally, show a final success before submitting
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged In',
                        text: 'You have been logged in successfully.',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        // Submit the login form
                        document.getElementById('loginForm').submit();
                    });
                });
            }
            else if (data.status === 'roaming') {
                // 2) The router mismatch was detected => call roaming.php
                Swal.fire({
                    title: 'Roaming in Progress',
                    text: 'Setting up your account on this router. Please wait...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                fetch('https://stromnet.ispledger.com/system/roaming.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        mpesa_code: mpesaMessage,
                        router_id: routerId
                    })
                })
                .then(resp => resp.json())
                .then(roamingData => {
                    Swal.close();
                    if (roamingData.status === 'success') {
                        // The roaming logic created a subscription on the new router
                        var newUsername = roamingData.username;
                        Swal.fire({
                            icon: 'success',
                            title: 'Roaming Completed',
                            text: 'Your plan is now active on this router. Logging you in...',
                            timer: 2000,
                            showConfirmButton: false
                        }).then(() => {
                            // Autofill the login form
                            document.getElementById('usernameInput').value = newUsername;
                            document.getElementById('passwordInput').value = '1234';

                            // Log them in
                            Swal.fire({
                                icon: 'success',
                                title: 'Logged In',
                                text: 'You have been logged in successfully.',
                                timer: 1500,
                                showConfirmButton: false
                            }).then(() => {
                                document.getElementById('loginForm').submit();
                            });
                        });
                    } else {
                        // Some error in roaming
                        Swal.fire({
                            icon: 'error',
                            title: 'Roaming Error',
                            text: roamingData.message || 'Could not complete roaming.'
                        });
                    }
                })
                .catch(err => {
                    Swal.close();
                    Swal.fire({
                        icon: 'error',
                        title: 'Roaming Error',
                        text: 'An error occurred while processing roaming.'
                    });
                    console.error('Roaming Error:', err);
                });
            }
            else {
                // Another error from mpesacode.php
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message
                });
            }
        })
        .catch(error => {
            // mpesacode.php fetch error
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while processing your request.'
            });
            console.error('Error:', error);
        });
    });
</script>
<!-- Voucher Activation Section -->
<div class="mt-10 text-center">
    <h3 class="text-2xl font-bold text-gray-900 mb-4">Have a voucher code? Activate your voucher code here</h3>
    <!-- Activation Form -->
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-5 mb-6">
        <form id="voucherActivateForm" class="form">
            <div class="mb-4">
                <label for="voucherActivateCode" class="block text-gray-700 text-sm font-bold mb-2">Voucher Code</label>
                <input type="text" id="voucherActivateCode" name="voucher" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., v123456" required>
            </div>
            <div class="mb-6">
                <label for="voucherActivateUsername" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input type="text" id="voucherActivateUsername" name="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 254712345678" required>
            </div>
            <!-- Hidden MAC Address -->
            <input type="hidden" name="mac" value="AC:7B:A1:AF:42:A4">
            <!-- Hardcoded Router ID -->
            <input type="hidden" id="voucherRouterId" name="router_id" value="11">
            <div class="flex items-center justify-between">
                <button id="voucherActivateBtn" type="button" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Activate Voucher
                </button>
            </div>
        </form>
    </div>
    <!-- Voucher Reconnection Section -->
    <h3 class="text-2xl font-bold text-gray-900 mb-4">Lost Voucher connection? Reconnect here</h3>
    <!-- Reconnection Form -->
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-5">
        <form id="voucherReconnectForm" class="form">
            <div class="mb-6">
                <label for="voucherReconnectInput" class="block text-gray-700 text-sm font-bold mb-2">Phone Number or Voucher Code</label>
                <input type="text" id="voucherReconnectInput" name="input" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="e.g., 254712345678 or v123456" required>
            </div>
            <!-- Hardcoded Router ID -->
            <input type="hidden" name="router_id" value="11">
            <div class="flex items-center justify-between">
                <button id="voucherReconnectBtn" type="button" class="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Reconnect
                </button>
            </div>
        </form>
    </div>
</div>
<script>
    // Handle activation form button click
    document.getElementById('voucherActivateBtn').addEventListener('click', async (e) => {
        console.log('Voucher activation button clicked by user');
        const form = document.getElementById('voucherActivateForm');
        const formData = new FormData(form);
        // Validate required fields
        if (!formData.get('voucher') || !formData.get('username')) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all required fields.',
                confirmButtonColor: '#d33'
            });
            return;
        }
        // Show loading
        Swal.fire({
            title: 'Activating Voucher',
            html: 'Please wait while we activate your voucher...<br><small>This may take a few seconds</small>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            const response = await fetch('https://stromnet.ispledger.com/system/voucher.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            Swal.close();
            if (result.msg && result.msg.type === 'success') {
                await Swal.fire({
                    icon: 'success',
                    title: 'Voucher Activated!',
                    text: result.msg.text,
                    confirmButtonColor: '#4CAF50'
                });
                // Auto-login to MikroTik
                if (result.credentials) {
                    const loginForm = document.createElement('form');
                    loginForm.method = 'POST';
                    loginForm.action = 'http://stromnet.com/login';
                    loginForm.style.display = 'none';
                    const usernameInput = document.createElement('input');
                    usernameInput.type = 'text';
                    usernameInput.name = 'username';
                    usernameInput.value = result.credentials.username;
                    loginForm.appendChild(usernameInput);
                    const passwordInput = document.createElement('input');
                    passwordInput.type = 'text';
                    passwordInput.name = 'password';
                    passwordInput.value = result.credentials.password;
                    loginForm.appendChild(passwordInput);
                    document.body.appendChild(loginForm);
                    loginForm.submit();
                }
                if (result.msg.redirect) {
                    setTimeout(() => window.location.href = result.msg.redirect, 2000);
                }
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Activation Failed',
                    text: result.msg ? result.msg.text : 'Activation failed',
                    confirmButtonColor: '#d33'
                });
            }
        } catch (error) {
            Swal.close();
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again.',
                confirmButtonColor: '#d33'
            });
        }
    });
    // Handle reconnection form button click (with roaming notification)
    document.getElementById('voucherReconnectBtn').addEventListener('click', async (e) => {
        console.log('Voucher reconnection button clicked by user');
        const form = document.getElementById('voucherReconnectForm');
        const formData = new FormData(form);
        // Validate required field
        if (!formData.get('input')) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in the required field.',
                confirmButtonColor: '#d33'
            });
            return;
        }
        // Show loading
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we verify your voucher...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => { Swal.showLoading(); }
        });
        try {
            const response = await fetch('https://stromnet.ispledger.com/system/voucher_reconnection.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            Swal.close();
            if (result.msg && result.msg.type === 'success') {
                // Check if roaming happened
                if (result.roaming) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Roaming Successful! 🌐',
                        html: '<p>Your voucher was activated at: <strong>' + result.from_router + '</strong></p>' +
                              '<p>Now connected to: <strong>' + result.to_router + '</strong></p>',
                        confirmButtonColor: '#4CAF50',
                        confirmButtonText: 'Connect Now'
                    });
                } else {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Reconnected!',
                        text: result.msg.text,
                        confirmButtonColor: '#4CAF50'
                    });
                }
                // Auto-login to MikroTik
                if (result.credentials) {
                    const loginForm = document.createElement('form');
                    loginForm.method = 'POST';
                    loginForm.action = 'http://stromnet.com/login';
                    loginForm.style.display = 'none';
                    const usernameInput = document.createElement('input');
                    usernameInput.type = 'text';
                    usernameInput.name = 'username';
                    usernameInput.value = result.credentials.username;
                    loginForm.appendChild(usernameInput);
                    const passwordInput = document.createElement('input');
                    passwordInput.type = 'text';
                    passwordInput.name = 'password';
                    passwordInput.value = result.credentials.password;
                    loginForm.appendChild(passwordInput);
                    document.body.appendChild(loginForm);
                    loginForm.submit();
                }
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Reconnection Failed',
                    text: result.msg ? result.msg.text : 'Reconnection failed',
                    confirmButtonColor: '#d33'
                });
            }
        } catch (error) {
            Swal.close();
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again.',
                confirmButtonColor: '#d33'
            });
        }
    });
</script>
<div class="text-center mt-6">
  <button id="forceReconnectBtn" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    🛠 Force Reconnection / Troubleshoot
  </button>
</div>
<script>
(function(){
  const btn = document.getElementById('forceReconnectBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    // 1) Gather inputs
    const macEl = document.querySelector('input[name="mac"]');
    const macAddress = macEl ? (macEl.value || '').trim() : '';
    const routerIdInput = document.querySelector('input[name="router_id"]');
    const routerId = (routerIdInput && routerIdInput.value) || (typeof window.routerId !== 'undefined' ? window.routerId : (localStorage.getItem('currentRouterId') || "11"));

    if (!macAddress) {
      Swal.fire({ icon: 'error', title: 'MAC Missing', text: 'We could not detect your device MAC address. Please reload the page while connected to WiFi.' });
      return;
    }

    Swal.fire({
      title: 'Running Troubleshooting...',
      text: 'Please wait while we check your account status...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      // 2) Send to backend
      const response = await fetch("https:\/\/stromnet.ispledger.com\/system\/force_reconnection.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mac_address: macAddress,
          router_id: routerId,
          clean_ghosts: true,
          fetch_logs: false,
          force_deep: false
        })
      });
      const data = await response.json();
      Swal.close();

      if (!data.ok) {
        var errHtml = '<p><b>Error:</b> ' + (data.message || data.error || 'Unknown issue') + '</p>';
        Swal.fire({ icon: 'error', title: 'Troubleshoot Failed', html: errHtml });
        return;
      }

      // 3) Build diagnostic summary (no JS template literals to keep PHP happy)
      const diag = data.diagnosis || {};
      const sub  = data.subscription || {};
      const mk   = data.mikrotik || {};
      const cust = data.customer || {};

      var summary = '' +
        '<b>MAC:</b> ' + ((data.anchor && data.anchor.mac_full) ? data.anchor.mac_full : 'N/A') + '<br>' +
        '<b>Username:</b> ' + ((cust && cust.username) ? cust.username : 'N/A') + '<br>' +
        '<b>Router:</b> ' + (mk.router_ip || 'N/A') + '<br>' +
        '<b>Plan:</b> ' + (sub.plan || 'N/A') + '<br>' +
        '<b>Expiration:</b> ' + (sub.expiration || 'N/A') + '<br>' +
        '<b>Status:</b> ' + (diag.summary || 'N/A') + '<br><hr>';

      if (Array.isArray(mk.active_sessions) && mk.active_sessions.length) {
        summary += '<b>Active Sessions:</b><br><ul>';
        mk.active_sessions.forEach(function(s){
          summary += '<li>' + (s.address || '(no ip)') + ' — ' + (s.mac_address || '(no mac)') + ' — ' + (s.uptime || '') + '</li>';
        });
        summary += '</ul>';
      }

      Swal.fire({
        icon: diag.can_login_now ? 'success' : 'warning',
        title: diag.can_login_now ? 'All Good ✅' : 'Attention Needed ⚠️',
        html: summary,
        showCancelButton: !!diag.can_login_now,
        confirmButtonText: diag.can_login_now ? 'Login Now' : 'Close',
        cancelButtonText: 'Close',
        confirmButtonColor: '#16a34a'
      }).then(function(res){
        if (res.isConfirmed && diag.can_login_now && cust && cust.username) {
          var u = document.getElementById('usernameInput');
          var p = document.getElementById('passwordInput');
          var f = document.getElementById('loginForm');
          if (u && p && f) {
            u.value = cust.username;
            p.value = '1234';
            f.submit();
          }
        }
      });

    } catch (err) {
      Swal.close();
      Swal.fire({ icon: 'error', title: 'Network Error', text: 'Could not contact the server. Check your connection.' });
      console.error('ForceReconnect error:', err);
    }
  });
})();
</script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    function autofillLogin() {
        var phoneNumber = '2547xxxxxxx';
        var password = '1234';
        document.querySelector('input[name="username"]').value = phoneNumber;
        document.querySelector('input[name="password"]').value = password;
        setTimeout(function() {
            document.querySelector('button[type="submit"]').click();
        }, 15000);
    }
    autofillLogin();
});
</script>
<script>
function toggleFAQ(faqId) {
    var element = document.getElementById(faqId);
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}
</script>
<!-- Add a container to display the MAC address -->
<div id="macAddressContainer" class="mt-4">
    <p>Your MAC Address: <span id="macAddressDisplay"></span></p>
</div>

<!-- Add a script to retrieve and display the MAC address -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var macAddressInput = document.querySelector('input[name="mac"]');
        var macAddressDisplay = document.getElementById('macAddressDisplay');
        
        if (macAddressInput && macAddressDisplay) {
            var macAddress = macAddressInput.value;
            macAddressDisplay.textContent = macAddress;
        }
    });
</script>
<!-- Footer -->
<footer class="bg-indigo-900 text-white">
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <div class="lg:col-span-1">
                <h2 class="text-sm font-semibold uppercase tracking-wider">
                    Contact Us
                </h2>
                <ul class="mt-4 space-y-4">
                    <li>
                       <span class="block">Whatsapp: wa.me/0798701885</span>
                    </li>
                    <li>
                        <span class="block">Phone: 0798701885</span>
                    </li>
                </ul>
            </div>
            <div class="lg:col-span-1">
                <h2 class="text-sm font-semibold uppercase tracking-wider">
                    Quick Links
                </h2>
                <ul class="mt-4 space-y-4">
                    <li><a href="#" class="hover:underline">About Us</a></li>
                    <li><a href="#" class="hover:underline">Our Services</a></li>
                    <li><a href="#" class="hover:underline">FAQ</a></li>
                    <li><a href="#" class="hover:underline">Support</a></li>
                </ul>
            </div>
            <div class="lg:col-span-1">
                <h2 class="text-sm font-semibold uppercase tracking-wider">
                     Follow Us
                </h2>
                <div class="mt-4 space-x-4">
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="hover:text-gray-400"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div class="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div class="flex space-x-6 md:order-2">
                <a href="#" class="text-gray-400 hover:text-gray-300"><span class="sr-only">Facebook</span><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="text-gray-400 hover:text-gray-300"><span class="sr-only">Instagram</span><i class="fab fa-instagram"></i></a>
                <a href="#" class="text-gray-400 hover:text-gray-300"><span class="sr-only">Twitter</span><i class="fab fa-twitter"></i></a>
                <a href="#" class="text-gray-400 hover:text-gray-300"><span class="sr-only">LinkedIn</span><i class="fab fa-linkedin-in"></i></a>
            </div>
<p class="mt-8 text-base leading-6 text-gray-400 md:mt-0 md:order-1">
                &copy; 2026 FreeIspRadius. All rights reserved.
            </p>
        </div>
    </div>
<div class="fixed bottom-4 right-4">
    <a href="tel:0798701885" class="call-icon">
        <i class="fas fa-phone"></i>
    </a>
</div>
</footer>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber.startsWith('+')) {
            phoneNumber = phoneNumber.substring(1);
        }
        if (phoneNumber.startsWith('0')) {
            phoneNumber = '254' + phoneNumber.substring(1);
        }
        if (phoneNumber.match(/^(7|1)/)) {
            phoneNumber = '254' + phoneNumber;
        }
        return phoneNumber;
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

function handlePhoneNumberSubmission(planId, routerId) {
  const BASE  = "https:\/\/stromnet.ispledger.com";
  const PROXY = "https://proxybackup.ispledger.com/callback.php";
  const PATH  = "/index.php?_route=plugin/CreateHotspotuser&type=grant";

  Swal.fire({
    title: 'Enter Your Phone Number',
    input: 'text',
    inputPlaceholder: 'Your phone number here',
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: async (phoneNumber) => {
      // --- normalize ---
      const formattedPhoneNumber = (formatPhoneNumber(phoneNumber || '') || '').trim();
      if (!formattedPhoneNumber) throw new Error('Please enter a valid phone number.');

      // --- MAC + suffix (X:YY) ---
      const macHidden  = (document.querySelector('input[name="mac"]')?.value || '').trim();
      const macFromUrl = new URLSearchParams(location.search).get('mac') || '';
      const macRaw     = macHidden || macFromUrl; // raw full Mikrotik AC:7B:A1:AF:42:A4 if present

      let hex = (macRaw || '').replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
      if (!hex) {
        const shortEl = document.querySelector('input[name="mac_suffix"], input[name="mac_last"]');
        const shortVal = (shortEl?.value || '').replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
        hex = shortVal;
      }
      if (!hex) throw new Error('Could not detect any MAC value. Ensure the page provides a MAC.');
      if (hex.length < 3) hex = hex.padStart(3, '0');
      const last3 = hex.slice(-3);
      const macSuffix = last3.charAt(0) + ':' + last3.slice(1);

      // --- username preview on form (helps auto-login) ---
      const username = formattedPhoneNumber + '-' + macSuffix;
      const uEl = document.getElementById('usernameInput');
      if (uEl) uEl.value = username;

      // --- persist for your flow ---
      try {
        localStorage.setItem('phoneNumber', formattedPhoneNumber);
        localStorage.setItem('lastFourChars', macSuffix);
      } catch(e) {
        setCookie('phoneNumber', formattedPhoneNumber, 1);
        setCookie('lastFourChars', macSuffix, 1);
      }

      // --- payload ---
      const trace = Math.random().toString(16).slice(2,10);
      const PAYLOAD = {
        phone_number: formattedPhoneNumber,
        plan_id:      planId,
        router_id:    routerId,
        mac_address:  macRaw,
        mac_suffix:   macSuffix,
        _proxy_trace: trace
      };

      // helper: mark “submitted” and start your confirm loop
      function armAndStart(){
        const expirationTime = Date.now() + (90 * 1000);
        try {
          localStorage.setItem('paymentSubmittedExpiration', String(expirationTime));
          localStorage.setItem('paymentSubmitted', 'true');
        } catch(e) {
          setCookie('paymentSubmittedExpiration', String(expirationTime), 1);
          setCookie('paymentSubmitted', 'true', 1);
        }
        startConfirmingPayment(true);
      }

      // ---- 1) PRIMARY attempt (default) ----
      try {
        const res = await fetch(BASE + PATH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(PAYLOAD)
        });

        let data = null;
        try { data = await res.json(); } catch (_) { /* CORS-opaque or not JSON; ignore */ }

        if (res.ok) {
          if (data && data.status === 'error') {
            throw new Error(data.message || 'Request invalid');
          }
          armAndStart();
          return formattedPhoneNumber;
        }

        throw new Error('primary_http_' + res.status);

      } catch (primaryErr) {
        console.warn('[failover] primary failed:', primaryErr && primaryErr.message);

        // ---- 2) PROXY attempt (fire-and-forget), then immediately start confirming ----
        const tenantHint = (function(){
          try { return new URL(BASE).hostname.split('.')[0] || 'francistest'; } catch(e){ return 'francistest'; }
        })();

        const envelope = {
          primary_base: BASE,
          tenant_hint:  tenantHint,
          path:         PATH,
          method:       'POST',
          payload:      PAYLOAD,
          force_ipv4:   true,
          _via:         'frontend_failover'
        };

        try {
          await fetch(PROXY, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            body: JSON.stringify(envelope)
          });
        } catch (proxyErr) {
          console.error('[failover] proxy send error:', proxyErr && proxyErr.message);
          throw new Error('Both primary and proxy unreachable from this connection.');
        }

        armAndStart();
        return formattedPhoneNumber;
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  });
}
    function startConfirmingPayment(showInitialMessage) {
        var expirationTime;
        try {
            expirationTime = parseInt(localStorage.getItem('paymentSubmittedExpiration'));
        } catch (e) {
            expirationTime = parseInt(getCookie('paymentSubmittedExpiration'));
        }
        if (!expirationTime || isNaN(expirationTime)) {
            expirationTime = Date.now() + 90000;
        }

        if (showInitialMessage) {
            Swal.fire({
                icon: 'info',
                title: 'Payment Request Sent!',
                html: '<p>A payment prompt has been sent to your phone.</p>' +
                      '<p style="margin-top:8px;font-weight:600;">Please check your phone and enter your M-Pesa PIN to complete the payment.</p>' +
                      '<p style="margin-top:12px;font-size:0.85rem;color:#6b7280;">Payment confirmation will begin shortly...</p>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true
            }).then(function() {
                beginConfirmationLoop(expirationTime);
            });
        } else {
            beginConfirmationLoop(expirationTime);
        }
    }

    function beginConfirmationLoop(expirationTime) {
        var now = Date.now();
        var totalDuration = 90000;
        var secsLeft = Math.max(0, Math.ceil((expirationTime - now) / 1000));
        var initialPct = Math.max(0, ((expirationTime - now) / totalDuration) * 100);
        var paymentStatus = 'pending';

        Swal.fire({
            title: 'Confirming Payment',
            html: '<p>Please wait while we confirm your payment and log you in...</p>' +
                  '<p style="margin-top:8px;font-size:0.85rem;color:#6b7280;" id="paymentStatus">Payment: Checking...</p>' +
                  '<p style="margin-top:12px;font-size:1.5rem;font-weight:700;" id="paymentCountdown">' + secsLeft + 's remaining</p>' +
                  '<div style="width:100%;background:#e5e7eb;border-radius:9999px;height:12px;margin-top:12px;">' +
                  '<div id="paymentProgressBar" style="background:#14b8a6;height:12px;border-radius:9999px;width:' + initialPct + '%;transition:width 1s linear;"></div>' +
                  '</div>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            didOpen: function() {
                Swal.showLoading();
            }
        });

        var refreshInterval = setInterval(function() {
            var usernameInput = document.getElementById('usernameInput');
            if (!usernameInput || !usernameInput.value) return;
            var phoneNumber = usernameInput.value.split('-')[0];
            $.ajax({
                url: appUrl + '/index.php?_route=plugin/CreateHotspotuser&type=verify',
                method: 'POST',
                data: { phone_number: phoneNumber },
                dataType: 'json',
                success: function(data) {
                    var statusEl = document.getElementById('paymentStatus');
                    if (data.Resultcode === '3') {
                        paymentStatus = 'confirmed';
                        if (statusEl) statusEl.innerHTML = '<span style="color:#16a34a;font-weight:600;">Payment Confirmed! Connecting...</span>';
                        var bar = document.getElementById('paymentProgressBar');
                        if (bar) bar.style.background = '#16a34a';
                    } else if (data.Resultcode === '2') {
                        paymentStatus = 'failed';
                        clearInterval(countdownInterval);
                        clearInterval(loginInterval);
                        clearInterval(refreshInterval);
                        try { localStorage.removeItem('paymentSubmitted'); localStorage.removeItem('paymentSubmittedExpiration'); }
                        catch (e) { setCookie('paymentSubmitted', '', -1); setCookie('paymentSubmittedExpiration', '', -1); }
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Failed',
                            html: '<p>Your M-Pesa payment was <b>cancelled or failed</b>.</p>' +
                                  '<p style="margin-top:8px;font-size:0.875rem;color:#4b5563;">' + (data.Message || 'Please try again.') + '</p>',
                            confirmButtonText: 'Try Again',
                            confirmButtonColor: '#0d9488',
                            allowOutsideClick: false
                        }).then(function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
                    } else if (data.Resultcode === '1') {
                        if (statusEl) statusEl.innerHTML = '<span style="color:#d97706;">Payment: Pending...</span>';
                    }
                },
                error: function() {}
            });
        }, 5000);

        var countdownInterval = setInterval(function() {
            var msLeft = expirationTime - Date.now();
            var sLeft = Math.max(0, Math.ceil(msLeft / 1000));
            var pct = Math.max(0, (msLeft / totalDuration) * 100);

            var countdownEl = document.getElementById('paymentCountdown');
            var progressBar = document.getElementById('paymentProgressBar');

            if (countdownEl) countdownEl.textContent = sLeft + 's remaining';
            if (progressBar) progressBar.style.width = pct + '%';

            if (msLeft <= 0) {
                clearInterval(countdownInterval);
                clearInterval(loginInterval);
                clearInterval(refreshInterval);
                try {
                    localStorage.removeItem('paymentSubmitted');
                    localStorage.removeItem('paymentSubmittedExpiration');
                } catch (e) {
                    setCookie('paymentSubmitted', '', -1);
                    setCookie('paymentSubmittedExpiration', '', -1);
                }
                if (paymentStatus === 'confirmed') {
                    showPaymentConfirmedRetry();
                } else {
                    showPaymentTimeoutOptions();
                }
            }
        }, 1000);

        var loginInterval = setInterval(function() {
            document.getElementById('submitBtn').click();
        }, 3000);
    }

    function showPaymentTimeoutOptions() {
        Swal.fire({
            icon: 'warning',
            title: 'Confirmation Time Expired',
            html: '<p>We could not confirm your payment within the expected time.</p>' +
                  '<p style="margin-top:12px;font-size:0.875rem;color:#4b5563;"><b>Already paid?</b> Click "Force Reconnect" to try connecting.</p>' +
                  '<p style="margin-top:4px;font-size:0.875rem;color:#4b5563;"><b>Not paid yet?</b> Click "Retry / Buy New Package" to start over.</p>',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: 'Force Reconnect (Already Paid)',
            denyButtonText: 'Retry / Buy New Package',
            confirmButtonColor: '#16a34a',
            denyButtonColor: '#0d9488',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(function(result) {
            if (result.isConfirmed) {
                document.getElementById('forceReconnectBtn').click();
            } else if (result.isDenied) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    function showPaymentConfirmedRetry() {
        Swal.fire({
            icon: 'info',
            title: 'Payment Was Confirmed',
            html: '<p>Your payment was confirmed but we could not log you in automatically.</p>' +
                  '<p style="margin-top:8px;font-size:0.875rem;color:#4b5563;">Click <b>"Force Reconnect"</b> to connect now.</p>',
            showConfirmButton: true,
            confirmButtonText: 'Force Reconnect',
            confirmButtonColor: '#16a34a',
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then(function(result) {
            if (result.isConfirmed) {
                document.getElementById('forceReconnectBtn').click();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        var phoneNumber, lastFourChars;
        try {
            phoneNumber = localStorage.getItem('phoneNumber');
            lastFourChars = localStorage.getItem('lastFourChars');
        } catch (e) {
            phoneNumber = getCookie('phoneNumber');
            lastFourChars = getCookie('lastFourChars');
        }
        if (phoneNumber && lastFourChars) {
            var username = phoneNumber + '-' + lastFourChars;
            document.getElementById('usernameInput').value = username;
        }

        var submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(event) {
                event.preventDefault();
                document.getElementById('loginForm').submit();
            });
        }
        
        // Check if payment has been submitted and if the expiration time has not passed
        var paymentSubmitted, paymentSubmittedExpiration, currentTime;
        try {
            paymentSubmitted = localStorage.getItem('paymentSubmitted');
            paymentSubmittedExpiration = localStorage.getItem('paymentSubmittedExpiration');
            currentTime = new Date().getTime();
        } catch (e) {
            paymentSubmitted = getCookie('paymentSubmitted');
            paymentSubmittedExpiration = getCookie('paymentSubmittedExpiration');
            currentTime = new Date().getTime();
        }
        
        if (paymentSubmitted === 'true' && paymentSubmittedExpiration && currentTime < parseInt(paymentSubmittedExpiration)) {
            // Resume confirming payment (no initial message since this is a page reload)
            startConfirmingPayment(false);
        } else {
            // Remove the paymentSubmitted and paymentSubmittedExpiration flags from localStorage
            try {
                localStorage.removeItem('paymentSubmitted');
                localStorage.removeItem('paymentSubmittedExpiration');
            } catch (e) {
                setCookie('paymentSubmitted', '', -1);
                setCookie('paymentSubmittedExpiration', '', -1);
            }
        }
    });
</script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Check if the form should attempt to login based on the last submission time
    var lastLoginAttempt = localStorage.getItem('lastLoginAttempt');
    var currentTime = new Date().getTime();

    // Only submit the form if the last attempt was more than 2 minutes ago (120,000 milliseconds)
    if (!lastLoginAttempt || currentTime - lastLoginAttempt > 120000) {
        var loginForm = document.getElementById('loginForm');
        if (loginForm) {
            // Update the timestamp of the last login attempt
            localStorage.setItem('lastLoginAttempt', currentTime);
            // Submit the login form
            loginForm.submit();
        }
    }
});
</script>
</body>
</html>