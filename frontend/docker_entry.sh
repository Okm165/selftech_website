#!/bin/bash
cd frontend/public;
ln -sf ../../resources resources
cd ../
npm install && npm run dev -- --host;
