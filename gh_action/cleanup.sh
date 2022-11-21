#!/bin/bash

set -euo pipefail

if [[ -n ${TRUNK_TMPDIR+x} ]]; then
  rm -rf "${TRUNK_TMPDIR}"
fi
