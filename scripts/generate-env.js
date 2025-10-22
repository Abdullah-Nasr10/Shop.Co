const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '..', '.env');
const outPathDir = path.resolve(__dirname, '..', 'src', 'environments');
const outPath = path.join(outPathDir, 'environment.generated.ts');

function generate() {
    if (!fs.existsSync(envPath)) {
        console.error('.env file not found at', envPath);
        process.exit(1);
    }

    const parsed = dotenv.parse(fs.readFileSync(envPath));

    if (!fs.existsSync(outPathDir)) {
        fs.mkdirSync(outPathDir, { recursive: true });
    }

    const lines = [];
    lines.push('// This file is auto-generated from .env by scripts/generate-env.js');
    lines.push('// Do NOT commit this file if it contains secrets for production.');
    lines.push('export const environment = {');

    Object.keys(parsed).forEach((key) => {
        const val = parsed[key].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        lines.push(`  ${key}: '${val}',`);
    });

    lines.push('};\n');

    fs.writeFileSync(outPath, lines.join('\n'));
    console.log('Wrote', outPath);
}

generate();
