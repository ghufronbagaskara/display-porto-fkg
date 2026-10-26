import {mkdir,copyFile,cp} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
await mkdir(new URL('dist/',root),{recursive:true});
for(const name of ['index.html','app.bundle.js'])await copyFile(new URL(name,root),new URL('dist/'+name,root));
await cp(new URL('assets/brand/',root),new URL('dist/assets/brand/',root),{recursive:true});
console.log('Static site prepared in dist/; index.html also remains usable offline.');
