import React from "react";
import "../styles/login.css"; 

export default function Login() {
    return (
        <form className="form">
            <span className="input-span">
                <label htmlFor="email" className="label">Email</label>
                <input type="email" name="email" id="email" />
            </span>
            <span className="input-span">
                <label htmlFor="password" className="label">Password</label>
                <input type="password" name="password" id="password" />
            </span>
            <span className="span">
                <a href="#">Forgot password?</a>
            </span>
            <input className="submit" type="submit" value="Log in" />
            <span className="span">
                Don't have an account? <a href="#">Sign up</a>
            </span>
        </form>
    );
}
