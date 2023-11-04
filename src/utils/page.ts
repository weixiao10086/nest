export interface Page {
    page: number,
    size: number
}
export const page = (params: Page) => {
    let { page = 1, size = 10 } = params;
    return { skip:((page-1)<0?0:(page-1))*size,take:size }
}