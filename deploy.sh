#!/bin/bash

yarn webpack -p
(cd ./bin && zip harald.zip harald/index.js)
(cd ./bin && zip pohina.zip pohina/index.js)

aws lambda update-function-code --function-name harald-meal --zip-file fileb://./bin/harald.zip
aws lambda update-function-code --function-name pohina-conferences --zip-file fileb://./bin/pohina.zip
