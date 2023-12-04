import React from "react";

export default function Input ({label, value, onChange, type, error}) {
    const style = {
        color: "red",
        fontSize: "16px",
        fontFamily: "\"Montserrat\"",
        border: "1px solid white",
        backgroundColor: "white"
    }

    return (
        <>
            <h4>{label}</h4>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            {error && <p style={style}>{error}</p> }
        </>
    )
}