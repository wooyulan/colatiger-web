pipeline {
    agent {

          label 'k8s-node2'

    }

    environment {
        REGISTRY = '192.168.87.183:8443'
        DOCKERHUB_NAMESPACE = 'llm-poc'
        APP_NAME = 'poc/caixun-web'
        DOCKER_CREDENTIAL_ID = 'harbor'
        KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'

        NAMESPACE = 'poc'
        DEPLOYMENT = 'caixun-web'
        CONTAINER_NAME = 'caixun-web'
        PORT = '3100'


    }

    stages {
        stage ('checkout scm') {
            steps {
                checkout(scm)
            }
        }

        stage ('build & push') {
            steps {


                    withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKER_CREDENTIAL_ID" ,)]) {

                    sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'

                    sh ' docker build --build-arg "HTTP_PROXY=http://10.4.14.22:7890" --build-arg "HTTPS_PROXY=http://10.4.14.22:7890" -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER . --network=host '

                    sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'

                    sh "docker rmi $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER"
                    }  

                
            }
        }

        stage('deploy to dev') {
             steps {
                 
                      withCredentials([
                          kubeconfigFile(
                          credentialsId: env.KUBECONFIG_CREDENTIAL_ID,
                          variable: 'KUBECONFIG')
                          ]) {

                          sh 'kubectl set image deployment/$DEPLOYMENT $DEPLOYMENT=$REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER -n $NAMESPACE'
                        }
                 
             }
        }


    }
}
