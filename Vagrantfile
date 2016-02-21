# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "simbo/trusty64"
  config.vm.network :private_network, ip: "10.0.0.5"
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 443, host: 4443
  config.vm.provision "shell", path: ".provision/provision.sh"
  config.vm.synced_folder ".", "/vagrant", type: "nfs"
  config.vm.provider "virtualbox" do |v|
    v.customize [
      "modifyvm", :id,
      "--memory", 512,
      "--cpus", 1
    ]
  end
end
