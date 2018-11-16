#!/bin/bash

webpack -p
(cd ./bin && zip lambda.zip index.js)
aws lambda update-function-code --function-name harald-meal --zip-file fileb://./bin/lambda.zip