export const formatNumber = (data: string, separator = '-') => {

    const [integer] = data
        .replace(/\s+/g, '')
        .replace(/^[0]*(?=[0-9]+)|[.](?=.*[.])/g, '')
        .split('.')

    const delimitedInteger = integer.replace(/\B(?=(\d{2})+(?!\d))/g, separator)

    return delimitedInteger
}
