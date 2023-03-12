export const splitSum = (number) => {
    if (isNaN(Number(number))) return 0

    return Math
        .round(Number(number))
        .toLocaleString("en-US")
        .replace(/,/g, " ")
}