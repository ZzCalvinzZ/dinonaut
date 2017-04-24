import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

WEBPACK_LOADER = {
	'DEFAULT': {
		'CACHE': False,
		'BUNDLE_DIR_NAME': 'bundles/',
		'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json'),
	}
}
