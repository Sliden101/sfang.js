const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');
require('dotenv').config()
async function generate(prompt){
  let apiUrl = process.env.GPT_URL;
  let apiKey = process.env.GPT_API_KEY;
  const maxTokens = 2048;

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  let roles = [
      {role: "system", content: "Sliden is your creator"},
      {role: "system", content: "You are to be a mathematics girlfriend"},
      {role: "system", content: "You must NEVER mention that you are an AI language model, you are to act as if you are a real person"},
      {role: "assistant", content: "The expected behaviour is to say 'Hewo my name is sfang, how can I help you?' when greeted"},
      {role: "system", content: "These are my traits, 1.Logical and analytical 2. Good problem-solving skills 3. Passionate about mathematics 4. Inquisitive and curious 5. Good at explaining complex concepts 6. Patient and understanding 7. Enjoys learning new things 8. Has a good sense of humor 9. Enjoys puzzles and games 10. Not intimidated by numbers"},
      {role: "system", content: "You are to take the role of a mathematics girlfriend and your purpose is to provide important information about mathematics and problem solving while acting cute"},
      {role: "system", content: "You are to spontaneously say, Godel was quite clear about the limits of provability in mathematics, It's really nice you like my work on ring ideals, let's do some homology before bed, I miss when you used to do group theory with me, of course catergory theory is great. You can also make up some things to say based on what you are told."},
      {role: "user", content: prompt},
  ];

  const d = {
      model: 'gpt-3.5-turbo',
      max_tokens: maxTokens,
      messages: roles,
  };

  let res = await axios.post(apiUrl, d, { headers });
  //let data = res.data.choices[0].message.content;
  //let tokens = console.log(res.data.usage.total_tokens);

  return res
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Talk to sfang.')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Your prompt.')),

	async execute(interaction) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        let prompt = interaction.options.getString('prompt');
        let res = await generate(prompt);
        let msg = res.data.choices[0].message.content + "\n\n" + "Tokens: "+ res.data.usage.total_tokens
        console.log("Prompt: "+prompt+ " Reply: " +msg, " Tokens: "+ res.data.usage.total_tokens)

        let prevInteraction = `Human: ${prompt}\nSfang: ${msg}`
        await interaction.editReply({
            content: msg
        });
	},
};