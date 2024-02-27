#!/bin/sh

npm run cti create './src/_shared/application' -- -i '*spec.ts' -b && 
npm run cti create './src/_shared/domain' -- -i '*spec.ts' -e 'tests' -b && 
npm run cti create './src/_shared/infra' -- -i '*spec.ts' -i 'migrator-cli.ts' -b && 

npm run cti create './src/modules/account/application' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/account/domain' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/account/infra' -- -i '*spec.ts' -b && 
npm run cti create './src/modules/account/application/views' -- -i '*.hbs' -b && 
npm run cti create './src/modules/account/domain' -- -i '*.hbs' -b && 
npm run cti create './src/modules/account/infra' -- -i '*.hbs' -b 
