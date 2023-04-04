const copy = (source: any) => {
    return JSON.parse(JSON.stringify(source));
}

export {
    copy
}