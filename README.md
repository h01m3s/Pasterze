Pasterze <!-- omit in TOC -->

## Table of Contents

- [Overview](#overview)
- [Description](#description)
- [Getting Started](#getting-started)


## Overview

Pasterze is an API Layer capable of handling web-scale production traffic with scalability and high quality service.
It is the aggregation of 10+ GB of raw CSV data that is then cleaned, processed, and presented to the user utilizing the API in JSON.

## Description

Pasterze comes with the following services:

- [Product API](#product-api)
- [Questions & Answers API](#questions-&-answers-api)
- [Ratings & Reviews API](#ratings-&-reviews-API)

<!-- omit in TOC -->

### Product API

_Developed by Greg Lin_



<!-- omit in TOC -->

### Questions & Answers API

_Developed by Andrew Jyan_

The Questions & Answers API provides a data interface for the Q&A section of an e-commerce product page. The database is driven by 
Cassandra DB, a noSQL database that operates in partition keys and nodes, storing records with identical partition keys together. 
This results in expedient retrieval and write speeds given that the keyspace design is well formatted. Additionally, to increase the 
throughput for web-scale traffic, Andrew implemented an AWS Kubernetes load balancer that assisted in distributing requests dynamically
to the web server. 

A video summary of this process can be found here: https://drive.google.com/file/d/1FEwcyGkvtCDNXVAuXPHj3AXVoN3jUHvH/view

<!-- omit in TOC -->

### Ratings & Reviews

_Developed by Ryan Fulmer_

The Reviews API provides a data interface for the Reviews section of an e-commerce product page. The database is driven by 
Cassandra DB, and is clustered by product_id in partition keys for fast and stable queries. 
Although there is a fair amount of server logic to clean data from reads/for writes, the actual query time remains very fast due to the optimization done by the Cassandra database. 

## Getting Started

This project can be run by executing the following steps:

### Installation <!-- omit in the TOC -->

1. Download or clone this git repository onto your local machine
2. Navigate to the root directory and run `npm install`

### Start the Server <!-- omit in TOC -->

Within the root directory, run `npm start` and then navigate to our [webpage](http://localhost:3000)




