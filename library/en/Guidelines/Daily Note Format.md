### Task Non-Deletion Rule
- **All tasks remain in history** - we never delete tasks from markdown files
- Changing task status only changes the marker in square brackets (`[ ]` → `[x]`, `[>]`, `[-]`)
- This rule allows for analysis of productivity and planning patterns
- All tool operations follow this rule, even deletion for safety only marks the task as deleted - so I can manually delete such marked tasks later
- This format is inspired by the paper format from the well-known 'Bullet Journal'

### Language and Form of Tasks
- **Tasks are written in English** - all task descriptions in English
- **Past tense form** - we formulate tasks as already completed actions (e.g. "wrote report" instead of "write report")
- This makes the task list sound like a journal of achievements

### Task Order in Daily Notes
- **Chronological order** - we arrange tasks according to execution time
- We start with tasks done earliest (morning)
- We end with tasks performed in the evening
- This order reflects the natural flow of the day

### Markers in Square Brackets
1. `- [ ] task` - task to do
2. `- [x] task` - completed task
3. `- [-] task` - cancelled/abandoned task
4. `- [>] task` - task moved to another day

### Status Meanings for Productivity
By keeping all tasks, analysis is possible:
- **Completion rate**: ratio of `[x]` to all tasks
- **Postponement rate**: how many tasks were `[>]` (may indicate over-planning)
- **Abandonment rate**: how many tasks were `[-]` (may indicate unrealistic goals)
- **Time patterns**: which times of day are most productive
- **Weekly/monthly trends**: how productivity changes over time

### Task Structure
```
- [status] {emoji} {time} task description {additional info in parentheses}
    indented comment (optional)
    can be multi-line
```

### Time Formats
- **Time range**: `14:00-17:00` (task lasts from 14:00 to 17:00)
- **Specific time**: `18:30` (task starts at 18:30)
- **Approximate time**: `~12:00` (task around 12:00)
- **Completion time**: `(12:14)` - automatically added when completing task at the end of task description

### Emoji and Priorities
- Emoji reflect category/type of task (hygiene 🚿, work 💻, sports 🎾, etc.)
- **🚨 - priority/urgent task** - can be added to any task

### Task Comments
- **Indentation**: each comment line must be indented with 4 spaces
- **Multi-line**: comment can consist of multiple lines
- **Content**: additional information, context, reflections about the task

Example:
```
- [x] 🎾 Paddle training at 11 with Anna, Roks and Julian (completed at 12:14)
    It was a group training, it was fun
    Next time bring more water
```

### Deleted Tasks
Tasks marked for deletion are placed in HTML comments:
```html
<!-- DELETED TASK:
- [x] 🎯 Plan for next activities (10:56)
    Maybe this time we'll play board games?
-->
```

### Moved Tasks
Tasks moved to another day contain a target date marker:
```
- [>] 🔋 Charge batteries (→ 2025-05-26 - Monday)
```

### Cornerstone Habits
**Cornerstone Habits** are complex routines consisting of multiple activities that we represent as one task. This allows for:
- Simplifying the task list
- Easier tracking of entire routine completion
- Preserving details about individual activities

**Format:**
```
- [status] {emoji} Routine name (detailed description of all activities)
    Additional notes about routine execution
```

**Example:**
```
- [ ] 🚿 Morning hygiene (took shower + deodorant + hand cream + alopexy + brushed teeth) (completed at 07:30)
    I sat under the shower for a long time, hygiene therefore took me over an hour.
```

**Creation Rules:**
- Name should be short and descriptive (e.g. "Morning hygiene", "Evening routine")
- In parentheses detailed description of all performed activities
- Use "+" sign to separate individual activities
- In comments add reflections about execution or routine modifications

### Task Evolution Example
```
Monday (morning):
- [ ] write quarterly report

Monday (afternoon):
- [>] write quarterly report (postponed to Tuesday)

Tuesday:
- [x] write quarterly report (completed)
```

### Data Format Elements Enforced by Tools
- **Marker format** - always `- [status]`
- **Marker mapping** - `[ ]`, `[x]`, `[-]`, `[>]` are fixed
- **Automatic completion time addition** - adding `(completed at HH:MM)` marker when completing/abandoning
- **Automatic move information addition** - `(→ date)` marker when moving tasks
- **Move logic** - completed/abandoned tasks go to the beginning of the list
- **Comment format** - always indented with 4 spaces
