const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

let resetUrl = process.env.GPT_URL+'/reset';
let token = process.env.GPT_API_KEY

const d = {
    "token": token,
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('bind')
		.setDescription('Bind api key to proxy.'),
	async execute(interaction) {
        try {
            let res = await axios.post(resetUrl, d)
            const msg = res.data.message
            console.log(msg)
            await interaction.reply({
                content: msg
            });
        } catch(e){
            console.log(e);
            await interaction.reply({
                content: e.toString()
            });    
        }
	},
};