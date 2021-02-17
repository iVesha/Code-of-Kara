const { Client, MessageAttachment, MessageEmbed } = require("discord.js")
const fs = require("fs")
const client = new Client()

function btoa(iVar) {
    return Buffer.from(iVar).toString("base64")
}

function atob(iVar) {
    return Buffer.from(iVar, "base64").toString()
}

function rand(min, max) {
    max == undefined ? Math.random() * min : Math.random() * (max - min) + min
}

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag} !`)
})

client.on("message", msg => {
    let mc = msg.content;

    // Random Number
    if (mc === ".random num") {
        let randNum = Math.round(Math.random() * 10)
        msg.reply(randNum)
    }
    // Profile Picture
    else if (mc === ".avatar") {
        msg.reply(msg.author.displayAvatarURL())
    }
    // Attachment
    else if (mc === ".yellow") {
        const buffer = fs.readFileSync("./yellow.jpeg")
        const attachment = new MessageAttachment(buffer, `${btoa("STRING_HERE")}.jpeg`);
        msg.channel.send(`${msg.author}, here is your color!`, attachment);
    }
    // Message Embed
    else if (mc === "Code") {
        const embed = new MessageEmbed()
            .setTitle("TITLE")
            .setColor(0xff0000)
            .setDescription("DESCRIPTION");
        msg.channel.send(embed);
    }
    // Emoji
    else if (mc == ".smile!") {
        msg.channel.send(":smile:") // unicode ==> \:smile:
    }
    // includes || startsWith
    else if (mc.includes("hi")) {
        msg.reply(
            "hi",
            "hello",
            "howdy !!!"
        )
    }
})

// Welcome
client.on("guildMemberAdd", member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'CHANNEL_NAME');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

// Kick User
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('!kick')) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('I was unable to kick the member');
                        console.error(err);
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    }
});

// Ban User
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('!ban')) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .ban({
                        reason: 'They were bad!',
                    })
                    .then(() => {
                        message.reply(`Successfully banned ${user.tag}`);
                    })
                    .catch(err => {
                        message.reply('I was unable to ban the member');
                        console.error(err);
                    });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    }
});

client.login("TOKEN");