# Frequently Asked Questions

---

### **I'm getting rate limit errors on Anthropic all the time, how to solve this?**

If you put $40 into your Anthropic account, it will upgrade your account to tier 2, which doubles the rate limits - it should be enough for anything that Life Navigator throws at it.

---

### **When I edit a system prompt, the expand links get expanded every time, is there a way to make it conditional? For example, if I'm talking about professional life, is it possible to include a file about professional life?**

Yes, in the system prompt itself you can instruct the AI to read any file and then apply its logic.

For example:

```
If I'm asking about matters related to professional life, read 'Professional guidelines' and adhere to the instructions found in that file.
```

---

### **How to customize system prompts?**

Click on the name of the mode in an empty conversation or in the settings to open the mode editor.

---

### **How do I recover an old version of a note?**

Go to `Settings` → `Core Plugins` → `File Recovery`

---

### **My vault is getting messy with all the daily notes in one place, how to deal with this?**

Configure your daily notes built-in plugin with example settings:

**Format:**
```
YYYY/MM/YYYY-MM-DD - dddd
```

**Note folder:**
```
Logs
```

This will create daily notes separately for each month.

Furthermore, I recommend installing the `Periodic Notes` plugin. Life Navigator supports both the built-in Daily Notes and the Periodic Notes plugin.

Try enabling all note types with the following options:

**Weekly notes Format:**
```
YYYY/MM/gggg-[W]ww
```

**Monthly notes Format:**
```
YYYY/MM/YYYY-MM
```

**Quarterly notes Format:**
```
YYYY/YYYY-[Q]Q
```

**Yearly notes Format:**
```
YYYY/YYYY
```

**Note folder (for each type):**
```
Logs
```

Furthermore, there are example templates for each type of periodic note in the internal AI library. You can ask any mode to materialize them:

```
Materialize all periodic note templates into my Templates directory
```

Then set all the templates for each type of period to an appropriate template. You can customize them at will. They heavily use AI instructions (`%% instruction %%`) to guide the agents.

---

### **What AI models does Life Navigator support?**

Life Navigator currently uses Anthropic's Claude models:
- **Claude Sonnet** - Balanced performance (recommended for most use cases)
- **Claude Opus** - Most capable, best for complex reasoning
- **Claude Haiku** - Fastest and cheapest, good for simple tasks

---

### **How do I change the AI model for a mode?**

Open the mode editor by clicking on the mode name, then change the model setting in the mode configuration.

---

### **Can I use Life Navigator offline?**

Life Navigator requires an internet connection to communicate with the AI. However, all your notes and data are stored locally and can be accessed offline through Obsidian.

---
