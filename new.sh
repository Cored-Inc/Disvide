#!/bin/bash

# Delete all build folders
rm -rf build dist __pycache__ *.egg-info

# Ask if I want to publish, and if yes run the following commands or else just exit
read -p "Do you want to publish to pypi? (y/n): " -n 1 -r
echo
    # (optional) move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then

        exit 1  

    fi

# Run the setup file
python setup.py sdist bdist_wheel

# Upload to pypi
twine upload dist/*