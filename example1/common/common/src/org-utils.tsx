// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {
    return Promise.resolve('hello world')
}