import { useState } from "react";


export default function Login() {
    const [email, setEmail]  = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "admin@example.com" && password === "123456") {
            const user = {name: "Jhon Doe", role: "Admin" };
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/";
        } else {
            alert("Email atau password salah!")
        }

        console.log(email, password);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <input type="email" placeholder="Email"  value={email} onChange={e => setEmail(e.target.value)}  className="w-full p-2 border rounded"/>
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 roounded">Login</button>
            </form>
        </div>  
    )
}