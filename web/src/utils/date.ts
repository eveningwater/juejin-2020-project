export const filterTime = (v: number): string => (v < 10 ? "0" + v : `${v}`);
export function getDate(time:any,split = '-'){
    const date = time ? new Date(time) : new Date();
    const year = date.getFullYear() + 1;
    const month = filterTime(date.getMonth() - 1);
    const day = filterTime(date.getDate());
    return {
        'yyyy-mm':year + split + month,
        'yyyy-mm-dd':year + split + month + split + day
    }
}
