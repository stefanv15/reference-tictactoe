#!/bin/bash

mv ./build/docker-compose.yaml .
mv ./build/.env 
ls -a

cd home/ubuntu/
# Copy files to AWS
scp -o StrictHostKeyChecking=no -i "pem.pem" ./docker-compose.yaml ec2-user@ec2-54-229-178-217-eu-west-1.compute.amazonaws.com:~/docker-compose.yaml

scp -o StrictHostKeyChecking=no -i "pem.pem" ./.env ec2-user@ec2-54-229-178-217-eu-west-1.compute.amazonaws.com:~/.env

# Connecting AWS server with public key from pem.pem file
echo Connecting to AWS server
ssh -i "pem.pem" ec2-user@ec2-54-229-178-217.eu-west-1.compute.amazonaws.com
ls

# Start docker containers
docker-compose up -d
exit


echo "Done"
