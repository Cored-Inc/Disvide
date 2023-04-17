from setuptools import setup, find_packages

with open('README.rst', 'r') as f:
    long_description = f.read()

setup(
    name='disvide',
    version='0.4.2',
    license='MIT',
    author='Cored Developments',
    author_email='skyblockmohammed@gmail.com',
    packages=find_packages(),
    url='https://github.com/Cored-Inc/disvide',
    description='Disvide is a beginner-friendly Discord bot generator that allows you to create a bot by answering a few questions.',
    keywords='discord bot generator beginner',
    install_requires=[
        'questionary',
        'termcolor'
    ],
    entry_points={
        'console_scripts': [
            'disvide=disvide:create_bot'
        ]
    },
    long_description=long_description,
    long_description_content_type='text/markdown'
)
