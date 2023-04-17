module.exports = class {
    constructor(bot) {
		this.bot = bot;
	}

	run() {
		const data = [];
		const commandsCategories= [];
		this.bot.commands.forEach((c) => commandsCategories.push(c.category));
		const categories = [...new Set(commandsCategories)];
		for (const category of categories) {
			const commandsCategory = [...this.bot.commands].filter(
				([_, c]) => c.category === category
			);
			for (const c of commandsCategory) {
				if (c[1].subCommands?.length) {
					const commandOptions = [];
					c[1].subCommands.forEach((sc) => {
						commandOptions.push({
							type: 'SUB_COMMAND',
							name: sc.name,
							description: sc.description,
							required: sc.required,
							choices: sc.choices,
							options: sc.options,
						});
					});
					data.push({
						type: 'SUB_COMMAND_GROUP',
						name: c[1].name,
						description: c[1].description,
						options: commandOptions,
					});
				} else if (c[1].options && c[1].options.length) {
					const commandOptions = [];
					c[1].options.forEach((a) => {
						commandOptions.push({
							type: a.type || 'STRING',
							name: a.name,
							description: a.description,
							required: a.required,
							choices: a.choices,
							options: a.options,
						});
					});
					data.push({
						name: c[1].name,
						description: c[1].description,
						options: commandOptions,
					});
				} else {
					// No commands args and no subcommands
					data.push({
						name: c[1].name,
						description: c[1].description,
					});
				}
			}
		}
		this.bot.application.commands.set(data, this.bot.config.guild_id);
		console.log(`Logged in as ${this.bot.user?.tag}!`);
	}
}