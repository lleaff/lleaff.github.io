#!/bin/bash
# Stop on error
set -e
# Print executed commands
set -x

cd "$(dirname "$0")"

# http://stackoverflow.com/a/3232082/4718923
confirm() {
  # call with a prompt string or use a default
  read -r -p "${1:-Are you sure?} [y/N]" response
  case "$response" in
    [yY][eE][sS]|[yY]) true ;;
    *) false ;;
  esac
}

bin_dir="$(npm bin)"
site_files="css fonts img index.html"
files_to_delete="$site_files dist"
current_branch="$(\git branch | grep \* | sed 's/^\* //')"
deploy_branch="master"

"${bin_dir}/gulp"
if [ -d "./tmp~" ]; then rm -r "./tmp~"; fi
mv ./dist "./tmp~"
git checkout "$deploy_branch"
# Clean previous files
if confirm "Delete these files? : \"$files_to_delete\""; then
  for f in $files_to_delete; do
    if [ -f "$f" ] || [ -d "$f" ]; then
      rm -r "$f"
    fi
  done
else
  exit 1
fi
mv "./tmp~/"* .
rm -r "./tmp~"
git add $site_files -f
git commit -am "deploy $(date "+%y:%m:%d-%H:%M:%S")"

if confirm "Push ?"; then
  git push origin "$deploy_branch"
fi

# Done

git checkout "$current_branch"

