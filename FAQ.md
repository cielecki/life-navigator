> **I'm getting rate limit errors on antropic all the time, how to solve this?**

If you put 40$ into your antropic account, it will upgrade your account to tier 2, which doubles the rate limits - it should be enough for anything that Life Navigator throws at it

> **When I edit a system prompt, the expand links get expanded every time, is there a way to make it conditional? so for example if I'm talking about professional life, is it possible to include file about professional life?**

Yes, in the system prompt itself you can instruct the AI to read any file and then apply it's logic. For example: `If I'm asking about matters related to professional life, read 'Professional guidelines' and adhere to the instructions found in that file.`

> **How to customize system prompts?**

Click on the name of the mode in an empty conversation or in the settings

> **How do I recover an old version of a note?**

Go to Settings -> Core Plugins -> File Recovery

> **My vault is getting messy with all the daily notes in one place, how to deal with this?**

Configure your daily notes built in plugin, example settings:

Format: `YYYY/[Q]Q/YYYY-MM-DD - dddd`
Note folder: `Logs`

This will create daily notes seperatelly for each quarter

Furthermore I recommend installing `Periodic Notes` plugin and enabling all note types, with the following options:

Weekly notes Format: `YYYY/[Q]Q/gggg-[W]ww`
Monthly notes Format: `YYYY/[Q]Q/YYYY-MM`
Quarterly notes Format: `YYYY/[Q]Q/YYYY-[Q]Q`
Yearly notes Format: `YYYY/YYYY`

Note folder each time: `Logs`

Furthermore there are example templates for each type of periodic note in the internal ai library if you ask any mode to materialize them it can do that:

`Materialize all periodic note templates into my Templates directory`

Then set all the templates for each type of period to an approrpiate template, you can customize them at will. They heavily use ai instructions (%% instruction %%) to guide the agents
