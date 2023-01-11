import * as Twig from "twig"
import * as path from "path";
import logger from "./logger";

export function render(filePath: string, data: any, callable: Function) {
    Twig.renderFile(path.join(__dirname, '../views/' + filePath), data, (err, html) => {
        if (err)
            logger.error(err)
        else
            callable(html)
    })
}

export function generateUid(length: number = 30): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        if (i % 4 === 0)
            result += "-"
        else
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result.substring(1)
}

export function slugify(str: string): string {
    str = str.trim()
    str = str.toLowerCase()

    const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaaaeeeeiiiioooouuuunc------'

    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    return str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes
        .replace(/^-+/, '') // trim - from start of text
        .replace(/-+$/, '') // trim - from end of text
        .replace(/-/g, '_')
}