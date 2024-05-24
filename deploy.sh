#!/bin/bash
IP_ADDRESS="3.111.157.187"
#Acer(Push)
#rsync -avu --delete --exclude 'node_modules' -e "ssh -i /home/mcspraint/.ssh/id_rsa_myec2" "/mnt/c/Users/mcspr/McSpraint/myapps/ownapps/DSA" "ubuntu@$IP_ADDRESS:/home/ubuntu"
#Acer(Pull)
# ssh -i /home/mcspraint/.ssh/id_rsa_myec2 ubuntu@$IP_ADDRESS