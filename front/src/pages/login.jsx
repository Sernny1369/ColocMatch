import React from "react";
import { useState } from "react";
import "../styles/login.css"; 

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            console.log(data); 

            if (response.ok) {
            const user = data.user;
            const token = data.session.access_token;
            const role = user.customRole;
            console.log("USER:", user);
            console.log("user_metadata:", user.user_metadata);
            console.log("customRole:", user.customRole);
            console.log("user.role:", user.role);
            localStorage.setItem("user", JSON.stringify({ ...user, role }));
            localStorage.setItem("token", token);

            if (role === "Host") {
                window.location.href = "/host/dashboard";
            } else if (role === "Student") {
                window.location.href = "/student/swipe";
            } else {
                window.location.href = "/";
            }
            }
        } catch (err) {
            setMessage("Erreur serveur");
        }
    };
    return (
        
       <form className="form" onSubmit={handleSubmit}>
            <span className="input-span">
                <label htmlFor="email" className="label">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </span>
            <span className="input-span">
                <label htmlFor="password" className="label">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </span>
            <span className="span">
                <a href="#">Forgot password?</a>
            </span>
            <input className="submit" type="submit" value="Log in" />
            <span className="span">
                Don't have an account? <a href="/signup">Sign up</a>
            </span>
            {message && <p>{message}</p>}
        </form>
    );
}
