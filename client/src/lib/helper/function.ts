export const removeObjectWithId = (arr: any[], id: number) => {
    const idIndex = arr.findIndex(obj => id === obj.id);
    if (idIndex > -1)
        arr.splice(idIndex, 1);
    return arr;
}

export const removeObjectWithUid = (arr: any[], uid: string) => {
    const idIndex = arr.findIndex(obj => uid === obj.uid);
    if (idIndex > -1)
        arr.splice(idIndex, 1);
    return arr;
}