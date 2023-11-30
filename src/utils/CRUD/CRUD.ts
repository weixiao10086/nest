
const path = require('path');
const fs = require('fs');
const fs2 = require('fs-extra');
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
const readfile = async (obj: isfilesParams): Promise<{ data: Map<string, string>, filenum: number }> => {
    return new Promise((resolve, reject) => {
        let filenum = 0;
        let map = new Map();
        let arr = [];
        let finished = 1;
        const fun = async ({ filepath, isawait, recursion }: isfilesParams, callback?: Function) => {
            let filetype = await isfiles(filepath)
            if (filetype instanceof String) {
            } else if (filetype) {
                let files = fs.readdirSync(filepath)
                finished += files.length;
                files.forEach(async item => {
                    let itempath = path.join(filepath, item);
                    await fun({ filepath: itempath }, callback)
                })
            } else {
                arr.push(filepath)
                filenum++
            }
            finished--;
            if (finished === 0) {
                return callback(arr)
            }
        }
        fun(obj, arr => {
            Promise.all(arr.map(item => {
                return new Promise((resolve, reject) => {
                    fs.readFile(item, 'utf8', (err, data) => {
                        if (err) reject(err);
                        resolve({ data, item })
                        map.set(item.replace(process.cwd(), ''), data)
                    });
                })
            })).then(res => {
                resolve({
                    data: map,
                    filenum
                })
            })
        })
    })
}
// 读取模板
let template = fs.readdirSync(path.join(process.cwd(), 'xxx'))
let templateMap;
const generate = (filepath) => {
    return new Promise(async (resolve, reject) => {
        let obj = await readfile({ filepath: path.join(process.cwd(), 'xxx') })
        //创建文件夹
        // fs.mkdirSync(filepath, { recursive: true })
        try {
            //备份文件夹
            fs2.copySync(filepath, path.join(__dirname, '/备份', filepath))
        } catch (err) { }
        let filenamearr = filepath.split('\\')
        let filename = filenamearr.at(-1) != '' ? filenamearr.at(-1) : filenamearr.at(-2);
        for (const key of obj.data.keys()) {
            let keystr = key.replaceAll('xxx', filename)
            let value = obj.data.get(key).toString().replaceAll('\n', '\r\n');
            let valuestr = value.replaceAll(/xxx/gi, filename.at(0).toUpperCase() + filename.slice(1))
            fs.writeFile(path.join(process.cwd(), keystr), valuestr, function (err) {
                if (!err) {
                    console.log('文件生成成功，文件名为' + path.join(process.cwd(), keystr));
                }
            });
        }
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
            // let filepath = path.join(process.cwd(), args[i])
            let filepath = args[i]
            await generate(filepath)
        }
        process.exit()
    }
})()