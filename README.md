# jiraf

jiraf is a command-line helper for the Atlassian Jira, git, and GitHub-based workflow.  
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![CircleCI](https://circleci.com/gh/endreymarcell/jiraf.svg?style=svg)](https://circleci.com/gh/endreymarcell/jiraf)


## Setup

1. Install jiraf with `npm install -g jiraf`  
2. Create an Atlassian API token yourself as described in https://confluence.atlassian.com/display/Cloud/API+tokens  
3. Export your Atlassian username and token as environmental variables named `ATLASSIAN_USERNAME` and `ATLASSIAN_API_TOKEN`  
4. Speficy your project with `jiraf setproject <project_key>`  
5. Optional: if you want to use the `qa` shortcut, substitute `YOUR_QA_PERSON` with the username of your team's QA person in the `~/.jiraf/config.json` file.  

Jiraf maintains the key and the summary of the active card in `~/.jiraf/session.json`. You can include either of them in your shell prompt like people do with their git branches. See [prompt.sh](etc/prompt.sh) for an example.  

## Usage

### Base commands

#### Picking a card  
`jiraf setproject <project_key>` - specify the project by its key so that you can list cards on the board.  
`jiraf unsetproject` - unset the project.  
`jiraf ls` - list the cards on the board in the current sprint (key, status, summary, assignee).  
&nbsp;&nbsp;&nbsp;&nbsp;`-s|--status <status>`: filter for status (lowercase, one word, like: "todo" or "inprogress")  
&nbsp;&nbsp;&nbsp;&nbsp;`-a|--assignee [<username>]`: filter for assignee (default is yourself)  
`jiraf set <card>` - set `<card>` as the active card (you can pass the full key, eg. PROJ-123, which then also calls `setproject` with "PROJ", or only pass 123, in which case the currently active project is used)  
`jiraf current` - print all details of the active card.  
`jiraf unset` - unset the currently active card.  

#### Updating a card  
`jiraf move <status>` - update the active card to <status> (one of: blocked, todo, inprogress, review, validation, done).  
`jiraf assign [<username>]` - assign the active card to <username>, default is assigning to yourself.  
`jiraf unassign` - remove assignee from the card.  

#### git and GitHub
`jiraf branch <branchname>` - does `git checkout -b {active-cards-key}-<branchname>`.  
`jiraf pr` - opens a text editor for you to specify the PR title and contents, based on a template and pre-filled with card details; then opens a PR when the editor is closed.  
`jiraf web [<target>]` - opens Jira views in the browser, target is one of: board (default), card, backlog.  
Note: if you call `jiraf` without arguments, `jiraf web` (and consequently `jiraf web board`) is executed.  

### Compound commands (shortcuts)
The following shortcuts are defined for a smoother workflow:  
`start <card>` == `set <card>` + `assign` + `move inprogress`  
`review` == `move review` + `pr`  
`qa` == `move validation` + `assign YOUR_QA_PERSON`
`web` == `web board`  
You could get through the entire workflow of choosing, picking up, and delivering a card with only these three.

You can specify more shortcuts in your `~/.jiraconfig.json` file.  

## Have fun!
![Photo by Rajiv Bajaj on Unsplash](giraffe.jpg)
