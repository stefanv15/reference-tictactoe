# Author: Stefan Ragnar Viglundsson
# Last-modified: 17.12.16
# Script for migrate database
#-------------------------------------
#!/bin/bash

# Fixing docker-compose file problem given from instructors from www.github/hgop/syllabus/glossary/tipsandtricks
set -e

sleep 10
npm run migratedb
node run.js

exit 0
