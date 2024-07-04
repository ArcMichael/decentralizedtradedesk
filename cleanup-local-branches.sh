#!/bin/bash

# 更新本地远程分支引用，删除已在远端删除的分支引用
echo "Fetching and pruning remote branches..."
git fetch --prune

# 确认主分支名称
MAIN_BRANCH="main"

# 列出所有本地分支，过滤掉主分支
branches=$(git branch | grep -v "$MAIN_BRANCH" | grep -v "\*")

# 检查是否有其他分支
if [ -z "$branches" ]; then
  echo "No branches to delete."
  exit 0
fi

# 显示即将删除的分支
echo "The following branches will be deleted:"
echo "$branches"
echo -n "Are you sure you want to delete these branches? (Y/n) "
read -r confirm

# 判断用户输入
if [ "$confirm" != "${confirm#[Yy]}" ]; then
  echo "$branches" | xargs git branch -d
  echo "Branches deleted."
else
  echo "Operation cancelled."
fi
