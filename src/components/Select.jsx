import React from "react";

export default function Select ({label, value, onChange, options}) {
    return (
        <>
            <h3>{label}</h3>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </>
    )
}