export function hasOwnProperties<T = any>(obj: T, properties: (keyof T)[], allowNullish = true) {
    if (typeof obj !== "object") return false
    return properties.every((property) => {
        if (allowNullish) return obj?.hasOwnProperty(property)
        return obj?.hasOwnProperty(property) && collapseStr(obj[property]) !== null && collapseStr(obj[property]) !== undefined
    })
}