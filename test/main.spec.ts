import { test, expect } from 'vitest';
import { getFunctionNode } from '../src/main';

test('init', () => {
	const code = `
        function getName() {
            return 'name'
        }	
        function getNameA() {
            return 'name'
        }
    `;
	const index = 10;
	const functionNode = getFunctionNode(code, index);

	expect(functionNode).toBe({
		name: 'getName',
		start: {
			line: 2,
			column: 6,
			index: 7,
		},
		end: {
			line: 4,
			column: 7,
			index: 51,
		},
	});
});
test.only('ArrowFunctionExpression', () => {
	const code = `
        const getName=()=>'name'
        const setNameA=()=>'name'
    `;
	const index = 10;
	const functionNode = getFunctionNode(code, index);

	expect(functionNode).toEqual({
		name: 'getName',
		start: {
			column: 8,
			index: 9,
			line: 2,
		},
		end: {
			column: 32,
			index: 33,
			line: 2,
		},
	});
});
