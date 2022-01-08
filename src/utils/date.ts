export const dateDifferenceInSeconds = (d1: Date, d2: Date): number => {
    return (d2.getTime() - d1.getTime()) / 1000
}