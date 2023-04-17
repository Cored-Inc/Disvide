import os
import shutil
import questionary
from termcolor import colored


def create_command():
    questions = [
        {
            'type': 'input',
            'name': 'command_name',
            'message': 'Enter command name:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'command_description',
            'message': 'Enter command description:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'command_category',
            'message': 'Enter command category:',
            'validate': lambda val: val.strip() != ''
        }
    ]

    answers = questionary.prompt(questions)

    command_name = answers['command_name']

    # Check for commands directory
    commands_dir = os.path.abspath('commands')
    if not os.path.isdir(commands_dir):
        os.mkdir(commands_dir)
        print(colored('Created commands directory', 'green'))

    # Check for category directory
    category_dir = os.path.abspath(
        f'{commands_dir}/{answers["command_category"]}')
    if not os.path.isdir(category_dir):
        os.mkdir(category_dir)
        print(
            colored(f'Created {answers["command_category"]} directory', 'green'))

    # Check the programming language from config.json
    extension = ''
    with open('config.json', 'r') as f:
        config = f.read()
        config = eval(config)
        extension = config['extension']
        f.close()

    # Check for command file
    command_file = os.path.abspath(
        f'{category_dir}/{command_name}.{extension}')
    if os.path.isfile(command_file):
        if os.path.isfile(command_file):
            print(
                colored(f'Command file {command_file} already exists', 'red'))
            return

    # Create command file
    with open(command_file, 'w') as f:
        f.write(f'''
            
            ''')


def create_bot():
    # Define questions for user input
    questions = [
        {
            'type': 'input',
            'name': 'project_name',
            'message': 'Enter project name:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'bot_username',
            'message': 'Enter bot username:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'bot_token',
            'message': 'Enter bot token:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'client_id',
            'message': 'Enter client ID:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'client_secret',
            'message': 'Enter client secret:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'input',
            'name': 'guild_id',
            'name': 'guild_id',
            'message': 'Enter guild id:',
            'validate': lambda val: val.strip() != ''
        },
        {
            'type': 'select',
            'name': 'programming_language',
            'message': 'Which programming language do you want to use?',
            'choices': [
                'TypeScript (TS)',
                'JavaScript (JS)'
            ]
        },
        {
            'type': 'select',
            'name': 'package_manager',
            'message': 'Which package manager do you want to use?',
            'choices': [
                'yarn',
                'pnpm',
                'npm',
                'bun'
            ]
        },
        {
            'type': 'confirm',
            'name': 'git_init',
            'name': 'git_init',
            'message': 'Do you want to initialize git in the project?'
        }
    ]

    # Prompt user for input
    answers = questionary.prompt(questions)

    # Create project directory
    project_name = answers['project_name']
    project_dir = os.path.abspath(project_name)

    # Copy template files to project directory
    programming_language = answers['programming_language'].lower()
    if programming_language == 'typescript (ts)':
        # Get the templates folder for typescript for both windows and linux
        template_dir = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), 'templates/typescript')
    else:
        # Get the templates folder for javascript for both windows and linux
        template_dir = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), 'templates/javascript')

    if os.path.exists(template_dir):
        print(f"Copying files from {template_dir} to {project_dir}")
        shutil.copytree(template_dir, project_dir)
    else:
        print(
            colored(f"Error: Template directory '{template_dir}' not found!", 'red'))
        exit()

    # Extract file extension from programming_language, eg: Typescript (TS) and remove the () from it
    extension = programming_language.replace(
        '(', '').replace(')', '').lower().split(' ')[1]

    # Generate bot configuration file
    config_file = os.path.join(project_dir, 'config.json')
    with open(config_file, 'w') as f:
        f.write('{\n')
        f.write(f'    "bot_username": "{answers["bot_username"]}",\n')
        f.write(f'    "bot_token": "{answers["bot_token"]}",\n')
        f.write(f'    "client_id": "{answers["client_id"]}",\n')
        f.write(f'    "client_secret": "{answers["client_secret"]}",\n')
        f.write(f'    "extension": "{extension}",\n')
        f.write(f'    "guild_id": "{answers["guild_id"]}"\n')
        f.write('}')

    package_manager = answers['package_manager']
    if project_dir:
        print(
            colored(f"Installing dependencies using '{package_manager}'...", 'yellow'))
        result = os.system(f"cd {project_dir} && {package_manager} install")
        if result != 0:
            print(colored(f"Error: Failed to install dependencies!", 'red'))
            exit()
        else:
            print(colored(f"Dependencies installed successfully!", 'green'))

    # Check if git is required
    if answers['git_init']:
        print(colored(f"Initializing git...", 'yellow'))
        # Check if we're in the project directory
        result = os.system(f"git init")
        if result != 0:
            print(colored(f"Error: Failed to initialize git!", 'red'))
            exit()
        else:
            print(colored(f"Git initialized successfully!", 'green'))

    print(colored(f"Project '{project_name}' created successfully!", 'green'))
