./node_modules/.bin/webpack -p
Compress-Archive -LiteralPath "./bin/index.js" -DestinationPath "./bin/lambda.zip" -Force
aws lambda update-function-code --function-name harald-meal --zip-file fileb://./bin/lambda.zip
