#!/bin/bash

# shellcheck disable=SC2086

set -euo pipefail

fetch() {
  git -c protocol.version=2 fetch -q \
    --no-tags \
    --no-recurse-submodules \
    "$@"
}

if [[ ${GITHUB_REF_NAME} == "${GITHUB_EVENT_PULL_REQUEST_NUMBER}/merge" ]]; then
  # If we have checked out the merge commit then fetch enough history to use HEAD^1 as the upstream.
  # We use this instead of github.event.pull_request.base.sha which can be incorrect sometimes.
  head_sha=$(git rev-parse HEAD)
  fetch --depth=2 origin "${head_sha}"
  upstream=$(git rev-parse HEAD^1)
  git_commit=$(git rev-parse HEAD^2)
  echo "Detected merge commit, using HEAD^1 (${upstream}) as upstream and HEAD^2 (${git_commit}) as github commit"
fi

if [[ -z ${upstream+x} ]]; then
  # Otherwise use github.event.pull_request.base.sha as the upstream.
  upstream="${GITHUB_EVENT_PULL_REQUEST_BASE_SHA}"
  git_commit="${GITHUB_EVENT_PULL_REQUEST_HEAD_SHA}"
  fetch origin "${upstream}"
fi

"${TRUNK_PATH}" check \
  --ci \
  --upstream "${upstream}" \
  --github-commit "${git_commit}" \
  --github-label "${INPUT_LABEL}" \
  --github-annotate \
  ${INPUT_ARGUMENTS}
