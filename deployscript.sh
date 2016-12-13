#!/bin/bash

mv ../Commit/docker-compose.yaml .
mv ../Commit/.env .
ls -a

# Copy files to AWS
scp -o StrictHostKeyChecking=no -i "pem.pem" ./docker-compose.yaml ec2-user@ec2-54-229-178-217-eu-west-1.compute.amazonaws.com:~/docker-compose.yaml

scp -o StrictHostKeyChecking=no -i "pem.pem" ./.env ec2-user@ec2-54-229-178-217-eu-west-1.compute.amazonaws.com:~/.env

# Connecting AWS server with public key from pem.pem file
echo Connecting to AWS server
ssh -i "pem.pem" ec2-user@ec2-54-229-178-217-eu-west-1.compute.amazonaws.com "docker-compose up -d"

echo "Done"

exit


