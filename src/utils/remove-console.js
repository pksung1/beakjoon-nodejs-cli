import parser from '@babel/parser';
import _traverse from '@babel/traverse';
import _generate from '@babel/generator';
import prettier from 'prettier';


const traverse = _traverse.default;
const generate = _generate.default;

async function removeConsoleLogs(code) {
  const ast = parser.parse(code)
  
  traverse(ast, {
    CallExpression(path) {
      if (
        path.node.callee.type === 'MemberExpression' &&
        path.node.callee.object.name === 'console' &&
        path.node.callee.property.name === 'log'
      ) {
        path.remove()
      }
    }
  })
  
  const output = generate(ast, {
      retainLines: false,        // 원본 줄 번호 유지 안 함
      compact: false,            // 압축하지 않음
      concise: false,            // 간결 모드 끔
      indent: {
        style: '  ',             // 들여쓰기 스타일 (2칸 스페이스)
      }
    }).code


  const formatted = await prettier.format(output, {
    parser: 'babel',
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    useTabs: false
  })

  return formatted
}

export default removeConsoleLogs