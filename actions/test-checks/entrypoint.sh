#!/bin/sh -l

set -e

npm install

NODE_PATH=node_modules node /run.js