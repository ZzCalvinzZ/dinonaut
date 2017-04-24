from fabric.api import run, cd, sudo, hosts

@hosts('calvin@calvinkcollins.com')
def update(branch=None):
	base = '/var/www/calvinkcollins/dinonaut'
	python = '%s/.env/bin/python' % base
	workon = 'source .env/bin/activate &&'

	with cd(base):

		run('git fetch')

		if branch:
			run('git checkout %s' % branch)

		run('git pull')

		run('%s pip install -r requirements.txt' % workon)
		run('find . -name "*.pyc" -delete')

		sudo('service nginx restart')
		sudo('service uwsgi restart')
