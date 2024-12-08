const { writeFileSync, mkdirSync, write } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
        maptiler_key: "${ process.env['MAPTILER_KEY'] }"
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync( targetPath, envFileContent );

