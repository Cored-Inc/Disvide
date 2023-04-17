#!/bin/bash

# Delete all build folders
rm -rf build dist __pycache *.egg-info

# Run the setup file
python setup.py sdist bdist_wheel

# Upload to pypi
twine upload dist/*