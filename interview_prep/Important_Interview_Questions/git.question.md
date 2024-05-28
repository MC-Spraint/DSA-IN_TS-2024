### [1] What is Git and why is it used?

Git is a distributed version control system used to track changes in source code during software development. It allows multiple developers to work on a project simultaneously without overwriting each other's changes.

### [2] Explain the difference between Git and GitHub.

Git is a version control system, while GitHub is a cloud-based hosting service for Git repositories, offering additional features such as collaboration tools and issue tracking.

### [3] What is a repository in Git?

A repository is a storage location for the code and history of a project, including all files, commits, branches, and tags.

### [4] How do you create a new repository in Git?

Use the `git init` command to create a new repository in the current directory or `git clone` to clone an existing repository.

### [5] What are branches in Git and why are they important?

Branches allow you to work on different versions of a project simultaneously. They enable isolated development of features, bug fixes, and experiments.

### [6] How do you create and switch to a new branch in Git?

Use `git branch <branch-name>` to create a new branch and `git checkout <branch-name>` to switch to it. Alternatively, use `git checkout -b <branch-name>` to do both in one command.

### [7] What is a commit in Git and how do you create one?

A commit is a snapshot of changes in the repository. Use `git add <files>` to stage changes and `git commit -m "message"` to create a commit.

### [8] Explain the difference between `git fetch` and `git pull`.

`git fetch` retrieves updates from a remote repository without merging them, while `git pull` retrieves and merges updates in one step.

### [9] How do you merge branches in Git?

Use `git checkout <target-branch>` to switch to the target branch and `git merge <source-branch>` to merge the source branch into it.

### [10] What is a merge conflict and how do you resolve it?

A merge conflict occurs when changes in different branches conflict. Resolve it by manually editing the conflicting files and committing the resolved changes.


### [11] What is the purpose of `git rebase`?

`git rebase` is used to apply changes from one branch onto another, creating a linear history. It can simplify the commit history.

### [12] How do you undo a commit in Git?

Use `git revert <commit>` to create a new commit that undoes the changes of a previous commit, or `git reset <commit>` to move the branch pointer to a previous commit.

### [13] What is the staging area in Git?

The staging area, or index, is where changes are prepared before committing. Use `git add` to stage changes.

### [14] Explain the difference between `git clone` and `git fork`.

`git clone` creates a local copy of a repository, while `git fork` creates a copy of a repository under your GitHub account, allowing you to make changes without affecting the original.

### [15] How do you check the status of your Git repository?

Use `git status` to see the state of the working directory and staging area, including changes staged for commit and untracked files.

### [16] What is a remote repository in Git?

A remote repository is a version of your project hosted on the internet or network, allowing collaboration. Use `git remote` to manage remote repositories.

### [17] How do you delete a branch in Git?

Use `git branch -d <branch-name>` to delete a branch that has been merged, or `git branch -D <branch-name>` to force delete an unmerged branch.

### [18] What is `git stash` and when would you use it?

`git stash` temporarily saves changes in the working directory without committing them, allowing you to switch branches or perform other tasks.

### [19] How do you apply a stashed change in Git?

Use `git stash apply` to apply the most recent stash or `git stash apply stash@{index}` to apply a specific stash.

### [20] What is the difference between `git diff` and `git status`?

`git diff` shows the changes between commits, branches, or the working directory and staging area, while `git status` shows the current state of the working directory and staging area.
