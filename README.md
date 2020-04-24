# covid19cubadata.github.io
Covid19 - Dashboard for Cuba


### How to run with Docker
*Use Docker First - Then Learn About It Later*

#### Requirements
* [Install Docker](https://docs.docker.com/get-docker/)
* [Install Docker Compose](https://docs.docker.com/compose/install/)


#### Compile and run

*From project root directory*

1. Build Docker images for web application and python script:
   ```
   docker-compose -f .container/docker-compose.yml build
   ```

2. Run the Docker container for the web application
   ```
   docker-compose -f .container/docker-compose.yml up -d covid19cubadata_web
   ```
   
3. Visit the website
   
   Open a browser and write: `http://localhost`   
   
   or, you can add `covid19cubadata.cu` to your hosts files
   ```       
   127.0.0.1 covid19cubadata.cu
   ```
   * on Windows system, you must edit `%SYSTEM%\drivers\etc\hosts`
   * on Linux system, you must edit `/etc/hosts`
   
   and finally visit: `http://covid19cubadata.cu`
      
4. Run the standalone Python script to update countries data
   ```
   docker-compose -f .container/docker-compose.yml up covid19cubadata_update_countries
   ```
  