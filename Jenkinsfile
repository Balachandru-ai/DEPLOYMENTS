pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Balachandru-ai/DEPLOYMENTS.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                cd /var/jenkins_home/workspace/deployments-pipeline || exit 1

                docker compose down
                docker compose build
                docker compose up -d
                '''
            }
        }
    }
}
