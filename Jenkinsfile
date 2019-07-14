pipeline {
    agent {
        docker {
            image 'node:10.0.0'
            args '-u root'
        }
    }
    environment { 
        CI = 'true'
    }
  stages {
          stage('chekout'){
              steps {
             git 'https://github.com/tkssharma/tkssharma-Profile-Create-React-App'
            }
          }
          stage('install') {
          steps {
              sh 'npm install'
            }
          }
          stage('build') {
          steps {
             sh 'npm run build'
           }
          }
          stage('test') {
          steps {
                echo "Testing my application"
          } 
    }
}