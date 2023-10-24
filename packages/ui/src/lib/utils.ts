import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// export function capitalize(string: string) {
//     return `${string?.[0].toUpperCase()}${string.slice(1)}`
// }

export function objectToFormData(data: object, keys: string[]) {
    const newFormData = new FormData()
    Object.entries(data).forEach((pair) => {
        console.log(pair[0], pair[1])
        newFormData.append(pair[0], pair[1])
        // if (keys.includes(pair[0])) {
        //   newFormData.append(pair[0], pair[1][0]);
        // }
        // else {
        // }
    })
    // for (const pair of newFormData) {
    //     console.log(`${pair[0]}, ${pair[1]}`)
    // }
    return newFormData
}
