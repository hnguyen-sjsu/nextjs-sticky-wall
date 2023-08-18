export const joinClassNames = (...classes: Array<any>) => {
    return classes.filter(Boolean).join(' ')
}
