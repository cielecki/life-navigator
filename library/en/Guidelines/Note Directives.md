# Note Directives - User Manual

## ⚠️ FUNDAMENTAL RULE: Templates vs Notes

**📝 NEVER execute directives in templates!**
- Templates (e.g., `Day Template.md`) are patterns
- Directives in templates are instructions for future notes
- Execute directives ONLY in specific notes created from templates
- Example: execute in `2025-06-25 - Wednesday.md`, NOT in `Day Template.md`

**Template must remain unchanged with directives!**

## What are directives?

Directives are special markers in notes surrounded by `%%` characters that contain conditional instructions for processing content. Example:

```
%% remove if this is not a Friday note %%
```

## Directive processing rules

### 1. Basic rule
**Your goal is to execute the task described in the directive and remove the `%%` marker.**

### 2. Types of directives

#### A) Directives for removing entire sections
```
# End of work week %% remove this entire section if this is not a Friday note %%
```
- Check the condition (whether the note is from Friday)
- If condition is not met → remove entire section including header
- If condition is met → remove only directives, leave content

#### B) Directives for removing individual lines
```
- [ ] 🎯 I conducted a weekly review %% remove if this is not a Sunday note %%
```
- Check the condition (whether the note is from Sunday)
- If condition is not met → remove entire line including task
- If condition is met → remove only directives, leave task

#### C) Interactive directives (requiring user consultation)
```
%% ask me about what's specific for today and add events specific to the planned day here %%
```
- **IMPORTANT:** Don't remove the directive immediately!
- Conduct a conversation with the user
- Record agreed information in the appropriate place in the note
- **Only after recording agreements** remove the directive marker

#### D) Conditional addition directives (automatic)
```
%% remove if already done this month %%
```
- Check condition automatically
- Execute action described in directive
- Remove marker after execution

### 3. Processing procedure

1. **Process directives in small groups** - don't edit the entire document at once
2. **Use editing tools** - don't use specialized tools for tasks
3. **Check condition** - determine if it applies to specific day/situation
4. **Execute action** - remove content or leave it according to condition
5. **Remove marker** - always remove `%% directive text %%` after processing

### 4. Example conditions

- **Days of week**: `if this is not a Friday note`
- **Dates**: `if it's before the 10th day of the given month`
- **Previous execution**: `if I already did this in the last 3 days`
- **Situational**: `if I spend little time on relationships`

### 5. Important rules

- **One directive = one edit operation**
- **Always remove marker after processing**
- **Check note's date/day of week before evaluating conditions**
- **Don't leave empty sections after removing content**
- **Preserve markdown formatting after editing**

### 6. Action sequence

1. Read the note and identify all `%%` directives
2. For each directive, determine type:
   - **Automatic** (removal based on conditions)
   - **Interactive** (requiring conversation with user)
3. **For automatic directives:**
   - Check condition (day, date, previous execution)
   - Decide on action (remove/leave content)
   - Execute edit using editing tool
   - Remove directive marker
4. **For interactive directives:**
   - Conduct conversation with user
   - Wait for response
   - Record obtained information in note
   - Only then remove directive marker
5. Check that no `%%` markers remain

Remember: The goal is to reach a state where the note has no `%%` markers and content is appropriately adapted to conditions.