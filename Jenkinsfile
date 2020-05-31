pipeline {
	agent any

    environment {
        DESTINATION = "root@mterczynski.pl:/var/www/html/levelEditor"
    }

	stages {
		stage('Deploy') {
			steps {
				sh '''
					scp jquery.js ${DESTINATION}
					scp main.js ${DESTINATION}
					scp style.css ${DESTINATION}
					scp index.html ${DESTINATION}
				'''
			}
		}
	}
}
