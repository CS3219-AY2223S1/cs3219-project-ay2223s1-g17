# Getting Started

## Prerequisites

1. Install [Docker](https://www.docker.com/)

## Setup for Local Development

1. Clone git repository

Open your terminal and clone the frontend repository into a directory of your choice.
```
cd <path to directory of choice>
git clone https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g17.git
```

2. Build and run local docker environment

Start up your docker desktop application and ensure that docker daemon is up and running. 
Then, use this command to boot up the local development environment:
```
docker compose up --build 
```

Subsequently, you can boot up the local development environment without the build flag:
```
docker compose up
```

3. Access the application

You can now access the frontend of the application at `http://localhost:3000`
