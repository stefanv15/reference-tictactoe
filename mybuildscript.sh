#!/bin/bash

# Cleaning build directory
echo Cleaning...
rm -rf ./build

echo Building folders

# Creating Git tag called GIT_COMMIT i.e git tag for my latest Git commit
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)



# Running npm build
echo Building app
cd ./client
npm install
cd ..
npm run build

mkdir /build/public

cat > ./build/.env <<_EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

# Error message if npm build fails
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi


cat > ./build/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

# Creating .html file with following information
cat > ./build/public/version.html << _EOF_
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

# Copying files into build directory
cp ./Dockerfile ./build/
cp ./package.json ./build/
cp ./docker-compose.yaml ./build/
cp ./migrate.sh ./build/

# Following commands are made inside build directory
cd build

echo Building docker image
sudo docker build -t stefanv15/tictactoe:$GIT_COMMIT .

# Error message for docker build failure
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

# Pushing docker image
sudo docker push stefanv15/tictactoe:$GIT_COMMIT

# Error message for docker push failure
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "Done"
