#!/bin/bash

# shellcheck disable=SC2086

set -euo pipefail

fetch() {
  git -c protocol.version=2 fetch -q \
    --no-tags \
    --no-recurse-submodules \
    "$@"
}

head_sha=$(git rev-parse HEAD)
fetch --depth=2 origin "${head_sha}"
upstream=$(git rev-parse HEAD^1)
git_commit=$(git rev-parse HEAD^2)
echo "Detected merge queue commit, using HEAD^1 (${upstream}) as upstream and HEAD^2 (${git_commit}) as github commit"

"${TRUNK_PATH}" check \
  --ci \
  --upstream "${upstream}" \
  --github-commit "${git_commit}" \
  --github-label "${INPUT_LABEL}" \
  --github-annotate \
  ${INPUT_ARGUMENTS}
