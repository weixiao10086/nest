
const path = require('path');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface isfilesParams {
    filepath: string,
    recursion?: boolean,
    isawait?: boolean
}
const isfiles = (filepath: string) => {
    return new Promise<any>((resolve, reject) => {
        fs.stat(filepath, (err, file) => {
            if (err) {
                resolve('目标路径不存在')
            } else {
                if (file.isDirectory()) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }
        });
    })
}
// 读取文件
//readfile
const readfile = async (obj: isfilesParams) => {
    let text = '';
    let filenum = 0;
    let map = new Map();
    let arr = [];
    const fun = async ({ filepath, isawait, recursion }: isfilesParams) => {
        console.log(filepath, 'filepath');
        let filetype = await isfiles(filepath)
        if (filetype instanceof String) {
            map.set(filepath, filetype)
        } else if (filetype) {
            arr.push(filepath)
            fs.readFile(filepath, 'utf8', (err, data) => {
                if (err) throw err;
                text = data
            });
        } else {
            let files = fs.readdirSync(filepath)
            files.forEach(item => {
                let itempath = path.join(filepath, item);
                arr.push(itempath)
                fun(itempath)
            })
        }
    }
    Promise.all(arr).then(res => {

    })
    await fun(obj)
    if (filenum) {
        return {
            data: text,
        }
    } else {
        return {
            data: map,
            filenum
        }
    }

}
// 读取模板
let template = fs.readdirSync(path.join(process.cwd(), 'xxx'))
const templateMap = new Map()

template.forEach(async element => {
    await readfile(path.join(process.cwd(), 'xxx', './', element))
});

const generate = (filepath) => {
    return new Promise(async (resolve, reject) => {
        //判断目标路径是否为文件夹
        console.log(path.basename(filepath));
        // statSync
        console.log(await isfiles(filepath));
        // resolve(true)
    })
}
function question() {
    readline.question(`请输入文件路径?`, async pathname => {
        let filepath = path.join(process.cwd(), pathname)
        if (pathname.length == 0) {
            question()
        } else {
            await generate(filepath)
            readline.close();
        }
    });
}
let args = process.argv.slice(2);
(async () => {
    if (args.length === 0) {
        question()
    } else {
        for (let i = 0; i < args.length; i++) {
            let filepath = path.join(process.cwd(), args[i])
            await generate(filepath)
        }
        process.exit()
    }
})()