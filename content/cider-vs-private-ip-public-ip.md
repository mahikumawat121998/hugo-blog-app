+++
title = 'CIDR vs Private IP vs Public IP Address — Complete Guide'
date = 2026-04-30T10:00:00+01:00
draft = false
description = "Understand the differences between CIDR, Private IP, and Public IP Address with real-world examples and AWS use cases. A must-know guide for developers and cloud engineers."
imageBig = "/images/Gemini_Generated_Image_9s1w8j9s1w8j9s1w.png"
image = "images/Gemini_Generated_Image_9d2h469d2h469d2h.png"
categories = ["cloud", "aws", "networking", "devops"]
authors = ["MK Dev"]
avatar = "/images/favicon1.png"

+++

# CIDR vs Private IP vs Public IP Address — Complete Guide

When working with cloud platforms like AWS, Docker, or any distributed system, understanding networking basics is non-negotiable. Three core concepts you’ll encounter everywhere are **CIDR**, **Private IP**, and **Public IP Address**.

Let’s break them down in a simple and practical way.



## What is a Public IP Address?

A **Public IP Address** is an IP that is exposed to the internet. It is globally unique and assigned by an ISP.

### Key Points:

* Accessible from anywhere on the internet
* Required for hosting websites or APIs
* Must be unique across the globe

### Example:

```
8.8.8.8
142.250.183.206
```

### Real-world Use:

When you visit a website, your request goes to a server’s **public IP**.



## What is a Private IP Address?

A **Private IP Address** is used inside a local or internal network. These IPs are not directly reachable from the internet.

### Private IP Ranges:

```
10.0.0.0 – 10.255.255.255
172.16.0.0 – 172.31.255.255
192.168.0.0 – 192.168.255.255
```

### Key Points:

* Used for internal communication
* Can be reused in different networks
* Not accessible from the internet

### Example:

```
192.168.1.10
10.0.0.5
```

### Real-world Use:

Devices in your home Wi-Fi or AWS VPC communicate using private IPs.



## What is CIDR?

CIDR (**Classless Inter-Domain Routing**) is a method to define a range of IP addresses.

### Format:

```
IP_ADDRESS / PREFIX
```

### Example:

```
192.168.1.0/24
```

This means:

* Total IPs: 256
* Usable IPs: 254

The `/24` indicates how many bits are reserved for the network.



## CIDR Quick Table

| CIDR | Total IPs | Usable IPs |
| ---- | --------- | ---------- |
| /32  | 1         | 1          |
| /30  | 4         | 2          |
| /24  | 256       | 254        |
| /16  | 65,536    | 65,534     |



## Key Differences

| Feature       | Public IP | Private IP    | CIDR                     |
| ------------- | --------- | ------------- | ------------------------ |
| Scope         | Internet  | Local Network | Defines IP range         |
| Accessibility | Public    | Private       | Depends on configuration |
| Uniqueness    | Global    | Local reuse   | Not applicable           |
| Example       | 8.8.8.8   | 192.168.1.1   | 192.168.1.0/24           |



## How They Work Together (AWS Example)

Let’s say you create an AWS setup:

* VPC CIDR: `10.0.0.0/16`
* Subnet CIDR: `10.0.1.0/24`

### Instance:

* Private IP → `10.0.1.10`
* Public IP → `54.x.x.x`

### Flow:

1. Internal communication → Private IP
2. External access → Public IP
3. Network size → Defined by CIDR



## Easy Analogy

Think of it like an apartment:

* **Public IP** → Building address
* **Private IP** → Flat number
* **CIDR** → Total flats in building



## Interview Tips

* **Private IP + NAT → Internet access**
* **CIDR decides subnet size**
* **Public IP required for external exposure**



## Final Thoughts

* Public IP = Internet identity
* Private IP = Internal communication
* CIDR = Network structure

