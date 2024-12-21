const fs = require('fs');
const path = require('path');

function convertFile(filePath) {
  const ext = path.extname(filePath);
  if (ext === '.js' || ext === '.jsx') {
    const newPath = filePath.replace(/\.(js|jsx)$/, (match) => 
      match === '.js' ? '.ts' : '.tsx'
    );
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 写入新文件
    fs.writeFileSync(newPath, content);
    
    // 删除旧文件
    fs.unlinkSync(filePath);
    
    console.log(`Converted ${filePath} to ${newPath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== 'build') {
      walkDir(filePath);
    } else if (stat.isFile()) {
      convertFile(filePath);
    }
  });
}

// 开始转换
walkDir(path.join(__dirname, '..', 'src'));
