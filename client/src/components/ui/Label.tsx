"use client"

function Label({ htmlFor, label }: { htmlFor?: string; label: string }) {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-700"
        >{label}</label>
    )
}

export default Label
