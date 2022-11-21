#!/bin/bash

set -euo pipefail

trunk_path="${INPUT_TRUNK_PATH}"
if [[ -z ${trunk_path} ]]; then
  if [[ -f .trunk/bin/trunk && -x .trunk/bin/trunk ]]; then
    trunk_path=.trunk/bin/trunk
  elif [[ -f tools/trunk && -x tools/trunk ]]; then
    trunk_path=tools/trunk
  elif [[ -f trunk && -x trunk ]]; then
    trunk_path=./trunk
  else
    tmpdir="$(mktemp -d)"
    curl -fsSL https://trunk.io/releases/trunk -o "${tmpdir}/trunk"
    chmod u+x "${tmpdir}/trunk"
    trunk_path="${tmpdir}/trunk"
    echo "TRUNK_TMPDIR=${tmpdir}" >>"${GITHUB_ENV}"
  fi
fi
echo "TRUNK_PATH=${trunk_path}" >>"${GITHUB_ENV}"
