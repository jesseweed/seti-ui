#!/bin/bash

# shellcheck disable=SC2086

set -euo pipefail

env

"${TRUNK_PATH}" check github_annotate \
  --ci \
  --github-commit "${git_commit}" \
  --github-label "${INPUT_LABEL}" \
  /tmp/annotations.bin \
  ${INPUT_ARGUMENTS}
