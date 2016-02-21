#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

apt-get -y -qq update
apt-get -y -qq install apache2 php5 libapache2-mod-php5 php5-curl

rm -rf /var/www
ln -s /vagrant /var/www
