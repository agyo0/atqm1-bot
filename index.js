
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let botEnabled = true;

// ===== 反応ワード =====
const reactions = [
    { trigger: "あつみ", type: "includes", replies: ["あつみ？じゃなくて「atqm1」"] },
    { trigger: "仲直りしよ", type: "equals", replies: ["無理ブロック"] },
    { trigger: "おけけ", type: "includes", replies: ["原付無免許運転最強卍"] },
    { trigger: "親が台風", type: "includes", replies: ["は？ブロックするわ"] },
    { trigger: "ゴキブリ", type: "equals", replies: ["こーくろーち"] },
    { trigger: "じょうじ", type: "includes", replies: ["じょうじ！じょうじょうじじょうじょうじょうじょう"] },
    { trigger: "ワード8", type: "equals", replies: ["○○13"] },
    { trigger: "ワード9", type: "includes", replies: ["○○14", "○○15"] },
    { trigger: "ワード10", type: "includes", replies: ["○○16"] }
];
// ======================

// ⭐ 特定ユーザー
const specialUserId = "1392064446008004631";

// ⭐ 朝メッセージ用
const morningChannelId = "1435722035190960279";
let lastMorningSent = null;

client.once('clientReady', () => {
    console.log(`ログイン成功: ${client.user.tag}`);

    // ===== 毎日朝6時チェック =====
    setInterval(() => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const today = now.toDateString();

        if (hour === 6 && minute === 0 && lastMorningSent !== today) {
            const channel = client.channels.cache.get(morningChannelId);

            if (channel) {
                channel.send("おはよう！今日も頑張ろう！");
                lastMorningSent = today;
            }
        }
    }, 60 * 1000); // 1分ごとチェック
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    // ===== ON =====
    if (message.content === "!on") {
        botEnabled = true;
        message.reply({
            content: "監視をオンにした。",
            files: [
                "https://cdn.discordapp.com/attachments/1420440516033646687/1473660640173490207/IMG_5534.jpg?ex=699704eb&is=6995b36b&hm=df34dcaec9d049dee9dce6741ac32e7f50223f3bf82f3a5c394e4959783aed15&"
            ]
        });
        return;
    }

    // ===== OFF =====
    if (message.content === "!off") {
        botEnabled = false;
        message.reply({
            content: "監視をオフにした。",
            files: [
                "https://cdn.discordapp.com/attachments/1420440516033646687/1473663236909039648/IMG_5534.jpg?ex=69970757&is=6995b5d7&hm=95cecfdb8951f5ab35baa5f909329dca4287286f87f248ccc6b961dd1216ff19&"
            ]
        });
        return;
    }

    if (!botEnabled) return;

    // ===== 特定ユーザー =====
    if (message.author.id === specialUserId) {

        const specialReplies = [
            "にしみさんこんにちは！",
            "とらさんがそこにはいる。",
            "あなただけをみている。",
            "macepvp",
            "今日もニコニコしてる？"
        ];

        const random =
            specialReplies[Math.floor(Math.random() * specialReplies.length)];

        message.reply(random);
        return;
    }

    // ===== 通常反応 =====
    for (const reaction of reactions) {
        if (
            (reaction.type === "includes" && message.content.includes(reaction.trigger)) ||
            (reaction.type === "equals" && message.content === reaction.trigger)
        ) {
            const random =
                reaction.replies[Math.floor(Math.random() * reaction.replies.length)];

            message.reply(random);
            break;
        }
    }
});

client.login(process.env.TOKEN)

