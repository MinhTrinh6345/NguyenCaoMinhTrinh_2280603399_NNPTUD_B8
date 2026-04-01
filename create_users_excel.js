let exceljs = require('exceljs')
let path = require('path')

async function createUsersExcel() {
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet('Users');

    worksheet.columns = [
        { header: 'username', key: 'username', width: 15 },
        { header: 'email', key: 'email', width: 25 }
    ];

    for (let i = 1; i <= 99; i++) {
        let num = i.toString().padStart(2, '0')
        worksheet.addRow({
            username: `user${num}`,
            email: `user${num}@haha.com`
        })
    }

    let filePath = path.join(__dirname, 'uploads', 'users_import.xlsx')
    await workbook.xlsx.writeFile(filePath)
    console.log('File đã tạo tại:', filePath)
}

createUsersExcel()
