import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';
import removeConsoleLogs from './utils/remove-console.js';
import { exit } from 'process';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = yargs(hideBin(process.argv))
  .command('$0 <question>', 'process a number', (yargs) => {
    yargs.positional('question', {
      describe: 'number to process',
      type: 'string'
    })
  })
  .option('copy', {
    alias: 'c',
    type: 'boolean',
    description: '클립보드에 정답 복사'
  })
  .argv


const q = argv.question
const isCopy = argv.copy

const copyPaths = {
  'js': path.join(process.cwd(), `${q}.js`),
  'test': path.join(process.cwd(), `${q}.test.js`)
}

const cliPaths = {
  'js': path.join(__dirname, 'copy/question.js'),
  'test': path.join(__dirname, 'copy/question.test.js'),
  'prefix': path.join(__dirname, 'copy/prefix.txt')
}


// 파일 정답 카피
if (isCopy) {

  const prefix = fs.readFileSync(cliPaths.prefix, 'utf-8')
  const result = fs.readFileSync(copyPaths.js, 'utf-8')

  const formatted = await removeConsoleLogs(result)

  clipboardy.writeSync(`\
${prefix}

${formatted}
`)

  exit(1);
}

// 파일생성
if (fs.existsSync(copyPaths.js)) {
  throw Error('파일이 이미 존재합니다')
}

fs.copyFileSync(cliPaths.js, copyPaths.js)
fs.copyFileSync(cliPaths.test, copyPaths.test)

const variables = {
  questionNumber: q,
  createdDate: new Date().toISOString()
}

mappedVariable(copyPaths.js)
mappedVariable(copyPaths.test)


function mappedVariable(path) {
  const content = fs.readFileSync(path, 'utf-8')
  
  let mappedContent = content

  for (const [key, value] of Object.entries(variables)) {
    mappedContent = mappedContent.replaceAll(`{{${key}}}`, value)
  }

  fs.writeFileSync(path, mappedContent)
}