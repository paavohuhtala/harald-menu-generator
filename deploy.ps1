yarn webpack -p

Compress-Archive -LiteralPath "./bin/harald/index.js" -DestinationPath "./bin/harald.zip" -Force
Compress-Archive -LiteralPath "./bin/pohina/index.js" -DestinationPath "./bin/pohina.zip" -Force
Compress-Archive -LiteralPath "./bin/gamename/index.js" -DestinationPath "./bin/gamename.zip" -Force

aws lambda update-function-code --function-name harald-meal --zip-file fileb://./bin/harald.zip
aws lambda update-function-code --function-name pohina-conferences --zip-file fileb://./bin/pohina.zip
aws lambda update-function-code --function-name gamename --zip-file fileb://./bin/gamename.zip
