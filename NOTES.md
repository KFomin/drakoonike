Hello! 👋 I don't really know where to start. I usually don’t write any notes about my work, but test assignments are rarely interesting. I’ll try not to "ramble" in the text and will break it down into key stages and bright moments of development. 💡

Since the API documentation doesn’t provide much detail about how calculations happen "under the hood," and there is no clear information about the difficulties and what determines the success of the task, I relied on experimental results and my assumptions. This led me to the following order of difficulty:

🎉 "sure thing"
🌼 "walk in the park"
🍰 "piece of cake"
🤞 "quite likely"
🎲 "gamble"
🤔 "hmmm"
⚠️ "risky"
🚫 "rather detrimental"
🔥 "playing with fire"
💀 "suicide mission"
❌ "impossible"
In fact, I just feel this should be the order. I’m not 100% sure that it’s correct. 🤷‍♂️

I started taking tasks based on their difficulty. This allowed me to get close to a score of 1000 points. 🏆 However, I often ran out of lives before reaching the 1000-point milestone, and most of my attempts ended in failure (I scored too few points).

Okay, we get gold for completing tasks, right? 💰 What’s in the shop? Great, there’s something called a healing potion that looks like just what we need. Voila! It restores lives! ❤️

I added the purchase of healing potions to the algorithm every time I had enough gold. Now, most of the time, we are guaranteed to score more than 1000. 🎯

But in the top 5, the participants' scores are much higher, so I can improve the algorithm! 🌟

After 100+ runs of the program, I discovered the following:

🥇 Items costing 100 and 300 gold increase my level (100 for 1 level, 300 for 2 levels).

📈 Leveling up increases the chances of completing tasks.

🏴‍☠️ Completing tasks with the words "steal" and "infiltrate" damages my reputation with the state and underworld factions, which decreases the chances of completing tasks. We don’t want to do those tasks, so we add a category others and place it below impossible, resulting in the following order:

🎉 "sure thing"
🌼 "walk in the park"
🍰 "piece of cake"
🤞 "quite likely"
🎲 "gamble"
🤔 "hmmm"
⚠️ "risky"
🚫 "rather detrimental"
🔥 "playing with fire"
💀 "suicide mission"
❌ "impossible"
⚠️ "others"
📜 Some tasks are encrypted. Through experimentation, Google, and ChatGPT, I figured out that these are base64 and ROT13 encryption methods. I managed to turn them into normal tasks.

💧 There’s no point in spending a lot of money on health potions. It’s enough to maintain health at around 2-3; it's better to invest the remaining gold in my level, allowing me to complete more tasks and earn more points.

🐉 It's better to develop the character (dragon) in a well-rounded way, always buying different items since different items increase the chances of completing different tasks. (I don't have 100% information on this, but this assumption seems valid for now.)

📊 At the beginning of the game (before turn 30-40), it’s better to buy items for 100 gold, as it helps keep the gap between level and difficulty (turn) smaller. Once tasks start giving more gold, you can invest in items costing 300 gold, as they raise 2 levels and even help close the gap between turns and levels.

🚀 It makes sense to buy several items in a row if there is extra gold; this further reduces the gap between level and turn, increases the chances of completing tasks, and allows us to score more points.

⭐ The most important discovery is that with my algorithm, there is a chance to make the character's level higher than the difficulty level. In this case, we stop losing missions, the level starts to increase even faster, and we enter an endless cycle of completing tasks. (I checked, and I got up to 100,000 turns with a score of more than 30,000,000+.) This doesn't happen often, but it does happen. It seems like the rankings on the site don’t make sense, since we can get infinite points.
![image](https://github.com/user-attachments/assets/3460c1e1-deb5-4209-aba1-5e89ec143894)

🛑 To prevent an infinite loop, I added a check every 1000 turns that asks whether we want to continue. Thus, a very successful dragon, if desired, can live to retirement! 👴
