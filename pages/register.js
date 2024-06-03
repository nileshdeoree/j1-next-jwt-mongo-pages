import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (password === cpassword) {
            const response = await fetch("http://localhost:3000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                alert("Account Created Successfully", "success");
                router.push("/");
            } else {
                alert("Invalid Credentials", "danger");
            }
        } else {
            alert("Passwords do not match", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
             <section className="bg-gray-50 dark:bg-gray-900">
                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                     <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                         <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                         Authentication System
                     </a>
                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                 Register
                             </h1>

                             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                 <div>
                                     <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                     <input onChange={onChange} value={credentials.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                                 </div>
                                 <div>
                                     <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                     <input onChange={onChange} value={credentials.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                 </div>
                                 <div>
                                     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                     <input onChange={onChange} value={credentials.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                 </div>
                                 <div>
                                     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                     <input onChange={onChange} value={credentials.cpassword} type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                 </div>
                                
                                 <button type="submit" className="bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                     registered user <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">login</Link>
                                 </p>
                             </form>

                         </div>
                     </div>
                 </div>
             </section>
         </div>
    );
}

export default Signup;
































// import React from 'react'

// const logout = () => {
//     return (
//         <div>
//             <section className="bg-gray-50 dark:bg-gray-900">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                         <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
//                         Authentication System
//                     </a>
//                     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                                 Register to your account
//                             </h1>
//                             <form className="space-y-4 md:space-y-6" action="#">
//                                 <div>
//                                     <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                                     <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
//                                 </div>
//                                 <div>
//                                     <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                     <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                                 </div>
                                
//                                 <button type="submit" className="bg-blue-700 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
//                                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                                     registered user <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">login</a>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default logout




/*

        // <div className="container mx-auto mt-12 max-w-md">
        //     <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        //     <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        //         <div className="mb-4">
        //             <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
        //             <input 
        //                 type="text" 
        //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        //                 id="name" 
        //                 name="name" 
        //                 onChange={onChange} 
        //                 required 
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
        //             <input 
        //                 type="email" 
        //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        //                 id="email" 
        //                 name="email" 
        //                 onChange={onChange} 
        //                 required 
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        //             <input 
        //                 type="password" 
        //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        //                 id="password" 
        //                 name="password" 
        //                 onChange={onChange} 
        //                 minLength={5} 
        //                 required 
        //             />
        //         </div>
        //         <div className="mb-4">
        //             <label htmlFor="cpassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
        //             <input 
        //                 type="password" 
        //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        //                 id="cpassword" 
        //                 name="cpassword" 
        //                 onChange={onChange} 
        //                 minLength={5} 
        //                 required 
        //             />
        //         </div>
        //         <div className="flex items-center justify-between">
        //             <button 
        //                 type="submit" 
        //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        //             >
        //                 Submit
        //             </button>
        //             <a href='/login' className='text-blue-700'>login</a>
        //         </div>
        //     </form>
        // </div>

*/