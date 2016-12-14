#!/bin/bash

cp ../Commit/docker-compose.yaml .
cp ../Commit/.env .

echo "Listing things up in current folder!"
ls -a
echo "------------------------------------"


# Copy files to AWS
scp -o StrictHostKeyChecking=no -i "/home/ubuntu/pem.pem" ./docker-compose.yaml ec2-user@ec2-54-229-178-217.eu-west-1.compute.amazonaws.com:~/docker-compose.yaml

scp -o StrictHostKeyChecking=no -i "/home/ubuntu/pem.pem" ./.env ec2-user@ec2-54-229-178-217.eu-west-1.compute.amazonaws.com:~/build/.env

# Connecting AWS server with public key from pem.pem file
echo Connecting to AWS server
ssh -o StrictHostKeyChecking=no -i "/home/ubuntu/pem.pem" ec2-user@ec2-54-229-178-217.eu-west-1.compute.amazonaws.com "docker-compose up -d"

echo "Done"

exit


